import eslintConfig from '@dg-scripts/eslint-config'

export default eslintConfig.append({
  rules: {
    'react/no-nested-component-definitions': 'off',
    'react-hooks/set-state-in-effect': 'off',
    'react-hooks-extra/no-direct-set-state-in-use-effect': 'off',
    'react-refresh/only-export-components': 'off',
    'security/detect-non-literal-fs-filename': 'off',
    'security/detect-object-injection': 'off',
    'style/multiline-ternary': ['error', 'never'],
    'ts/strict-boolean-expressions': 'off',
  },
})
