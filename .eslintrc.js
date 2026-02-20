// .eslintrc.js
module.exports = {
  root: true,
  extends: [
    'plugin:@nx/react',
    'plugin:@nx/javascript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@next/next/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: [
      'apps/*/tsconfig.json',
      'apps/**/**/tsconfig.json',
      'apps/*/tsconfig.app.json',
      'apps/*/tsconfig.spec.json',
      
    ],
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@nx'],
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@nx/enforce-module-boundaries': [
      'error',
      {
        enforceBuildableLibDependency: true,
        allow: ["@blog-admin","@tarech-studio", "@realestate"],
        depConstraints: [
          {
            sourceTag: '*',
            onlyDependOnLibsWithTags: ['*'],
          },
        ],
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off' // ✅ allows `any` globally
  },
};