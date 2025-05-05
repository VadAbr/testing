import fsdPlugin from '@conarti/eslint-plugin-feature-sliced'
import { fixupPluginRules } from '@eslint/compat'
import eslint from '@eslint/js'
import importPlugin from 'eslint-plugin-import'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import tsEslint from 'typescript-eslint'

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigFile} */
export default [
  ...tsEslint.configs.strictTypeChecked,
  ...tsEslint.configs.stylistic,
  eslint.configs.recommended,
  importPlugin.flatConfigs.recommended,
  eslintPluginPrettierRecommended,
  {
    plugins: {
      react,
      'simple-import-sort': simpleImportSort,
      'react-hooks': reactHooks,
      '@conarti/feature-sliced': fixupPluginRules(fsdPlugin),
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      parser: tsEslint.parser,
      ecmaVersion: 12,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },

        project: ['./tsconfig.eslint.json'],
      },
    },

    settings: {
      react: {
        version: 'detect',
      },

      'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],

      'import/resolver': {
        node: true,
        typescript: true,
      },
    },

    rules: {
      'array-callback-return': [
        'error',
        {
          checkForEach: true,
        },
      ],

      eqeqeq: [
        'error',
        'always',
        {
          null: 'ignore',
        },
      ],

      'id-length': [
        'error',
        {
          min: 2,
          properties: 'never',
          exceptionPatterns: ['_|e|i|j|x|y|z'],
        },
      ],

      'linebreak-style': 'off',
      'no-else-return': 'error',
      'no-loop-func': 'error',
      'no-multi-assign': 'error',
      'no-nested-ternary': 'error',
      'no-new-func': 'error',
      'no-new-object': 'error',
      'no-new-wrappers': 'error',
      'no-param-reassign': 'error',
      'no-restricted-globals': 'error',
      'no-return-await': 'error',
      'no-underscore-dangle': 'error',
      'no-unneeded-ternary': 'error',
      'nonblock-statement-body-position': 'error',
      'object-shorthand': 'error',
      'one-var': ['error', 'never'],

      'prefer-arrow-callback': [
        'error',
        {
          allowNamedFunctions: true,
        },
      ],

      'prefer-object-spread': 'error',
      'prefer-template': 'error',
      'prettier/prettier': 'error',
      'quote-props': ['error', 'as-needed'],
      quotes: ['error', 'single'],
      'template-curly-spacing': 'error',
      radix: 'error',
      'wrap-iife': 'error',
      'react/prop-types': 'off',
      'react/button-has-type': 'warn',
      'react/jsx-boolean-value': ['error', 'always'],
      'react/jsx-curly-brace-presence': ['error', 'never'],
      'react/jsx-fragments': 'error',
      'react/jsx-no-constructed-context-values': 'warn',
      'react/jsx-no-useless-fragment': 'error',
      'react/jsx-key': ['error', { checkFragmentShorthand: true }],

      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true,
          reservedFirst: true,
          noSortAlphabetically: true,
        },
      ],

      'react/self-closing-comp': 'error',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',

      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Packages `react` related packages come first.
            ['^react', '^@?\\w'],
            ['^(@|@app|@pages|@features|@widgets|@shared|@entities)(/.*|$)'],
            // Internal packages.
            ['^(@|components)(/.*|$)'],
            // Side effect imports.
            ['^\\u0000'],
            // Parent imports. Put `..` last.
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // Other relative imports. Put same-folder imports and `.` last.
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // Style imports.
            ['^.+\\.?(css)$'],
          ],
        },
      ],

      'simple-import-sort/exports': 'error',

      '@typescript-eslint/consistent-type-assertions': [
        'error',
        {
          assertionStyle: 'as',
          objectLiteralTypeAssertions: 'never',
        },
      ],

      'no-unused-vars': 'off',
      'no-undef': 'off',
      'no-redeclare': 'warn',

      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/prefer-regexp-exec': 'warn',
      '@typescript-eslint/require-array-sort-compare': 'warn',
      '@typescript-eslint/switch-exhaustiveness-check': 'warn',

      'react-hooks/exhaustive-deps': ['warn'],

      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      'import/extensions': 'error',
      'import/no-mutable-exports': 'error',
      'import/no-webpack-loader-syntax': 'error',

      'import/no-internal-modules': [
        'error',
        {
          allow: [
            '@(app|widgets|features|entities|shared|pages)/*',
            '@consta/uikit/[a-zA-Z]*',
            '@consta/icons/[a-zA-Z]*',
            'react-dom/*',
            '@reduxjs/toolkit/*',
            '@reduxjs/toolkit/query/react',
            '*/styles/*.css',
          ],
        },
      ],

      '@conarti/feature-sliced/layers-slices': [
        'error',
        {
          ignorePatterns: ['@consta/widgets/[a-zA-Z]*'],
        },
      ],

      '@typescript-eslint/restrict-template-expressions': 'warn',
      '@typescript-eslint/no-invalid-void-type': 'warn',

      '@typescript-eslint/no-restricted-types': [
        'error',
        {
          types: {
            'React.FC': {
              message:
                '\nНе используем типизацию через React.FC.\nИспользуйте: `const Component = ({}: ComponentType) => {}`',
            },

            FC: {
              message:
                '\nНе используем типизацию через FC.\nИспользуйте: `const Component = ({}: ComponentType) => {}`',
            },

            'React.FunctionComponent': {
              message:
                '\nНе используем типизацию через React.FunctionComponent.\nИспользуйте: `const Component = ({}: ComponentType) => {}`',
            },
          },
        },
      ],

      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/consistent-generic-constructors': 'off',
      '@typescript-eslint/no-base-to-string': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/ban-tslint-comment': 'off',
      '@typescript-eslint/no-misused-spread': 'warn',
      '@typescript-eslint/prefer-for-of': 'warn',
    },
  },
  {
    files: ['__webpack__/*.js', '**/*.d.ts', 'eslint.config.mjs'],

    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      '@conarti/feature-sliced/absolute-relative': 'off',
      '@conarti/feature-sliced/layers-slices': 'off',
      '@conarti/feature-sliced/public-api': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      'import/no-internal-modules': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-require-imports': 'warn',
    },
  },
]
