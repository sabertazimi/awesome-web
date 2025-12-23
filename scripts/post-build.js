#!/usr/bin/env node

/**
 * Post-build script for awesome-web monorepo
 *
 * This script handles moving build outputs from individual packages
 * to the root dist/ directory with proper path normalization.
 *
 * Usage:
 *   node scripts/post-build.js [package-name]
 *
 * If no package name is provided, it will process all packages.
 *
 * Environment:
 *   - GitHub Actions: base path is '/awesome-web/'
 *   - Vercel: base path is '/' (detected via process.env.VERCEL)
 */

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const RootDir = path.resolve(__dirname, '..')
const PackagesDir = path.join(RootDir, 'packages')
const DistDir = path.join(RootDir, 'dist')

/**
 * Check if running in Vercel environment
 * @returns {boolean} True if running in Vercel, false otherwise
 */
const isVercel = () => Boolean(process.env.VERCEL)

/**
 * Package configuration for post-build processing
 *
 * @typedef {object} PackageConfig
 * @property {string} name - Package name
 * @property {'react-router' | 'vite'} type - Build type
 * @property {string} buildDir - Build output directory relative to package
 * @property {string} [destDir] - Destination directory name (defaults to package name)
 * @property {boolean} [isRoot] - Whether this is the root index.html package
 * @property {string} [normalizeSubDir] - Subdirectory containing index.html for React Router projects
 * @property {string[]} [extraCopy] - Additional files/folders to copy
 */

/**
 * Get package configurations based on environment
 * @returns {PackageConfig[]} Array of package configurations
 */
function getPackageConfigs() {
  const vercel = isVercel()

  return [
    {
      name: 'awesome-web',
      type: 'react-router',
      buildDir: 'build/client',
      isRoot: true,
      // Vercel: index.html is directly in build/client
      // GitHub Actions: index.html is in build/client/awesome-web
      normalizeSubDir: vercel ? undefined : 'awesome-web',
    },
    {
      name: 'm-league-reviewer',
      type: 'react-router',
      buildDir: 'build/client',
      // Vercel: index.html is in build/client/m-league-reviewer
      // GitHub Actions: index.html is in build/client/awesome-web/m-league-reviewer
      normalizeSubDir: vercel ? 'm-league-reviewer' : 'awesome-web/m-league-reviewer',
    },
    {
      name: 'react-renderer',
      type: 'vite',
      buildDir: 'dist',
    },
    {
      name: 'vue-design',
      type: 'vite',
      buildDir: 'dist',
    },
    {
      name: 'echarts-dashboard',
      type: 'vite',
      buildDir: 'dist',
    },
    {
      name: 'mortal-ui',
      type: 'vite',
      buildDir: 'dist',
      extraCopy: ['e2e'],
    },
    {
      name: 'vue-trello',
      type: 'vite',
      buildDir: 'dist',
    },
  ]
}

/**
 * Recursively copy directory with optional exclusion
 * @param {string} src - Source directory
 * @param {string} dest - Destination directory
 * @param {Set<string>} [excludePaths] - Set of absolute paths to exclude
 */
function copyDirSync(src, dest, excludePaths = new Set()) {
  if (!fs.existsSync(src)) {
    console.warn(`  ⚠️  Source does not exist: ${src}`)
    return
  }

  fs.mkdirSync(dest, { recursive: true })

  const entries = fs.readdirSync(src, { withFileTypes: true })

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    // Skip excluded paths
    if (excludePaths.has(srcPath)) {
      continue
    }

    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath, excludePaths)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

/**
 * Get the first segment of a path (top-level directory name)
 * @param {string} relativePath - Relative path like 'awesome-web' or 'awesome-web/m-league-reviewer'
 * @returns {string} First segment of the path
 */
function getFirstPathSegment(relativePath) {
  return relativePath.split('/')[0]
}

/**
 * Find the directory containing index.html in React Router build output
 * @param {string} clientDir - The client build directory
 * @returns {string | null} - Path to directory containing index.html
 */
function findIndexHtmlDir(clientDir) {
  if (!fs.existsSync(clientDir)) {
    return null
  }

  // Check if index.html exists directly in clientDir
  if (fs.existsSync(path.join(clientDir, 'index.html'))) {
    return clientDir
  }

  // Search recursively for index.html
  const searchDir = (dir) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const subDir = path.join(dir, entry.name)
        if (fs.existsSync(path.join(subDir, 'index.html'))) {
          return subDir
        }
        const found = searchDir(subDir)
        if (found)
          return found
      }
    }
    return null
  }

  return searchDir(clientDir)
}

/**
 * Process a single package
 * @param {PackageConfig} config - Package configuration
 */
function processPackage(config) {
  const packageDir = path.join(PackagesDir, config.name)
  const buildDir = path.join(packageDir, config.buildDir)
  const destDir = config.isRoot
    ? DistDir
    : path.join(DistDir, config.destDir || config.name)

  console.log(`\n📦 Processing: ${config.name}`)

  // Check if build directory exists
  if (!fs.existsSync(buildDir)) {
    console.log(
      `  ⏭️  Skipping - build directory not found: ${config.buildDir}`,
    )
    return
  }

  // Create destination directory
  fs.mkdirSync(destDir, { recursive: true })

  if (config.type === 'react-router') {
    // Handle React Router v7 projects with nested build structure
    const normalizedDir = config.normalizeSubDir
      ? path.join(buildDir, config.normalizeSubDir)
      : findIndexHtmlDir(buildDir)

    if (config.isRoot) {
      // For root package (awesome-web), copy index.html to dist root
      if (
        normalizedDir
        && fs.existsSync(path.join(normalizedDir, 'index.html'))
      ) {
        fs.copyFileSync(
          path.join(normalizedDir, 'index.html'),
          path.join(DistDir, 'index.html'),
        )
        console.log(`  ✅ Copied index.html to dist/`)

        // Copy remaining client files to dist root, excluding the normalizeSubDir
        const excludePaths = config.normalizeSubDir
          ? new Set([path.join(buildDir, getFirstPathSegment(config.normalizeSubDir))])
          : new Set()
        copyDirSync(buildDir, DistDir, excludePaths)
        console.log(`  ✅ Copied remaining client files to dist/`)
      } else {
        // Fallback: just copy everything
        copyDirSync(buildDir, DistDir)
        console.log(`  ✅ Copied all files to dist/`)
      }
    } else {
      // For sub-packages like m-league-reviewer
      if (normalizedDir && fs.existsSync(normalizedDir)) {
        // Copy the normalized directory to destination
        copyDirSync(normalizedDir, destDir)
        console.log(`  ✅ Copied ${config.normalizeSubDir} to ${config.name}/`)

        // Copy remaining client files (assets, etc.), excluding the normalizeSubDir parent
        const excludePaths = new Set([
          path.join(buildDir, getFirstPathSegment(config.normalizeSubDir)),
        ])
        copyDirSync(buildDir, destDir, excludePaths)
        console.log(`  ✅ Copied remaining client files`)
      } else {
        // Fallback: copy everything
        copyDirSync(buildDir, destDir)
        console.log(`  ✅ Copied all files to ${config.name}/`)
      }
    }
  } else {
    // Handle Vite and React Scripts projects (simple copy)
    copyDirSync(buildDir, destDir)
    console.log(
      `  ✅ Copied ${config.buildDir}/ to ${config.destDir || config.name}/`,
    )
  }

  // Handle extra copy items
  if (config.extraCopy) {
    for (const item of config.extraCopy) {
      const srcPath = path.join(packageDir, item)
      const destPath = path.join(destDir, item)

      if (fs.existsSync(srcPath)) {
        if (fs.statSync(srcPath).isDirectory()) {
          copyDirSync(srcPath, destPath)
        } else {
          fs.copyFileSync(srcPath, destPath)
        }
        console.log(`  ✅ Copied extra: ${item}`)
      } else {
        console.warn(`  ⚠️  Extra item not found: ${item}`)
      }
    }
  }
}

/**
 * Main entry point
 */
function main() {
  const args = process.argv.slice(2)
  const targetPackage = args[0]
  const vercel = isVercel()
  const packageConfigs = getPackageConfigs()

  console.log('🚀 Post-build script for awesome-web monorepo')
  console.log(`   Root: ${RootDir}`)
  console.log(`   Dist: ${DistDir}`)
  console.log(`   Environment: ${vercel ? 'Vercel' : 'GitHub Actions'}`)
  console.log(`   Base path: ${vercel ? '/' : '/awesome-web/'}`)

  // Ensure clean dist directory
  fs.rmSync(DistDir, { recursive: true, force: true })
  fs.mkdirSync(DistDir, { recursive: true })

  if (targetPackage) {
    // Process single package
    const config = packageConfigs.find(c => c.name === targetPackage)
    if (!config) {
      console.error(`\n❌ Unknown package: ${targetPackage}`)
      console.log(
        `   Available packages: ${packageConfigs.map(c => c.name).join(', ')}`,
      )
      process.exit(1)
    }
    processPackage(config)
  } else {
    // Process all packages
    for (const config of packageConfigs) {
      processPackage(config)
    }
  }

  console.log('\n✨ Post-build complete!')
}

main()
