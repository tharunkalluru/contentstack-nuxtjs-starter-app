module.exports = {
  root: false,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  // add your custom rules here
  rules: {
    'no-console': 0,
    'vue/html-indent': 0,
    "vue/require-prop-types":0,
    "vue/max-attributes-per-line":0,
    "prettier/prettier":0,
    "no-useless-computed-key":0,
    "vue/no-v-html":0,
    "no-unneeded-ternary":0,
    "vue/v-on-style":0,
    "vue/html-self-closing":0,
  },
}
