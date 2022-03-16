module.exports = {
  root: true,
  env: {
    browser: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  plugins: [
  ],
  rules: {
  },
  ignorePatterns: [
    '/src/'
  ]
}
