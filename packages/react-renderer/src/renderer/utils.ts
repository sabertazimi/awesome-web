import type { HostContext, Type } from './types'

/**
 * Checks if the given property name is 'className'.
 * @param {string} propName The property name to check.
 * @returns {boolean} `true` if the property name is 'className', `false` otherwise.
 */
function isClass(propName: string) {
  return propName === 'className'
}

/**
 * Checks if the given property name is 'children'.
 * @param {string} propName The property name to check.
 * @returns {boolean} A boolean indicating whether the property name is 'children'.
 */
function isChildren(propName: string) {
  return propName === 'children'
}

/**
 * Checks if a given property name is an event listener.
 * @param {string} propName The name of the property to check.
 * @returns {boolean} A boolean indicating whether the property is an event listener.
 */
function isListener(propName: string) {
  return propName.startsWith('on')
}

/**
 * Checks if the given property name is an attribute.
 * @param {string} propName The name of the property to check.
 * @returns {boolean} `true` if the property is an attribute, `false` otherwise.
 */
function isAttribute(propName: string) {
  return !isClass(propName) && !isChildren(propName) && !isListener(propName)
}

/**
 * Checks if the given type is an SVG type.
 * @param {Type} type The type to check.
 * @returns {boolean} `true` if the type is an SVG type, `false` otherwise.
 */
function isSVGType(type: Type) {
  return type.toLowerCase() === 'svg'
}

/**
 * Checks if the given context is an SVG context.
 * @param {HostContext} context The host context to check.
 * @returns {boolean} `true` if the context is an SVG context, `false` otherwise.
 */
function isSVGContext(context: HostContext) {
  return context
}

export { isAttribute, isChildren, isClass, isListener, isSVGContext, isSVGType }
