/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['./node_modules/c4i-eslint-react/eslint-config-react.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['.eslintrc.cjs', '*.d.ts'],
};
