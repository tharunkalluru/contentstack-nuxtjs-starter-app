export default {
  env: {
    CONTENTSTACK_API_KEY: process.env.CONTENTSTACK_API_KEY,
    CONTENTSTACK_DELIVERY_TOKEN: process.env.CONTENTSTACK_DELIVERY_TOKEN,
    CONTENTSTACK_ENVIRONMENT: process.env.CONTENTSTACK_ENVIRONMENT,
    CONTENTSTACK_BRANCH: process.env.CONTENTSTACK_BRANCH || 'main',
    CONTENTSTACK_REGION: process.env.CONTENTSTACK_REGION || 'us',
    CONTENTSTACK_MANAGEMENT_TOKEN: process.env.CONTENTSTACK_MANAGEMENT_TOKEN,
    CONTENTSTACK_API_HOST: process.env.CONTENTSTACK_API_HOST,
    CONTENTSTACK_APP_HOST: process.env.CONTENTSTACK_APP_HOST,
    CONTENTSTACK_LIVE_PREVIEW: process.env.CONTENTSTACK_LIVE_PREVIEW,
  },
  head: {
    title: 'contentstack-nuxtjs-starter-app',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#317EFB' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/css/tooltip.css' },
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css',
        integrity:
          'sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA==',
        crossOrigin: 'anonymous',
        referrerpolicy: 'no-referrer',
      },
      {
        href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
        rel: 'stylesheet',
        integrity:
          'sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC',
        crossOrigin: 'anonymous',
      },

      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      {
        rel: 'stylesheet',
        href: '/css/third-party.css',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Inter&amp;display=swap',
      },

      { rel: 'stylesheet', href: '/css/style.css' },
    ],
    script: [
      {
        src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js',
        integrity:
          'sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM',
        crossOrigin: 'anonymous',
      },
    ],
  },

  css: [],
  
  plugins: [],

  components: true,

  buildModules: ['@nuxt/typescript-build', '@nuxtjs/eslint-module'],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxt/content',
    '@nuxtjs/robots',
    '@nuxtjs/router',
  ],

  robots: {
    UserAgent: '*',
  },
  pwa: {
    icon: {
      purpose: ['any', 'maskable'],
      source: 'static/nuxt-icon.png',
    },
    manifest: {
      name: 'contentstack nuxtjs starter app',
      lang: 'en-us',
      useWebmanifestExtension: true,
      theme_color: '#317EFB',
    },
  },

  axios: {},

  content: {},
  build: { html: { minify: { collapseWhitespace: true } } },
}
