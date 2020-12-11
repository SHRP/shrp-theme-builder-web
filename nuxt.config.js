import colors from 'vuetify/es5/util/colors'

export default {
  ssr: false,
  target: 'static',
  loadingIndicator: {
    name: 'folding-cube',
    color: '#21CEF5',
    background: '#121212'
  },
  loading: {
    color: '#21CEF5'
  },
  head: {
    titleTemplate: 'SHRP Theme Builder',
    title: 'SHRP Theme Builder',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'An online SHRP theme creator' },
      { name: 'theme-color', content: '#21CEF5' },
      { name: 'og:description', content: 'An online SHRP theme creator' },
      { name: 'og:title', content: 'SHRP Theme Builder' },
      { name: 'og:type', content: 'website' },
      { name: 'og:url', content: 'https://shrp.geopjr.xyz/' },
      { name: 'og:image:type', content: 'image/png' },
      { name: 'og:image', content: 'https://shrp.geopjr.xyz/shrp-logo.png' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/shrp-logo.png' }
    ]
  },
  // Reduces vuetify size apparently
  build: {
    extractCSS: true
  },
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module',
    ['@nuxtjs/vuetify', {treeShake: true}]
  ],
  generate: { fallback: '404.html' },
  vuetify: {
    icons: {
      iconfont: 'mdi'
    },
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: '#21CEF5',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  }
}
