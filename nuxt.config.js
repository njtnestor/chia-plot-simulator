export default {

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'chia-plot-simulator',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/global.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/dhtmlx-gantt', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    '@nuxtjs/google-analytics'
  ],
  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID // Use as fallback if no runtime config is provided
  },
  publicRuntimeConfig: {
    googleAnalytics: {
      id: process.env.GOOGLE_ANALYTICS_ID
    }
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    'nuxt-i18n',
    ['nuxt-cookie-control', {
      colors: {
        barTextColor: '#fff',
        modalOverlay: '#000',
        barBackground: '#35a75a',
        barButtonColor: '#35a75a',
        modalTextColor: '#35a75a',
        modalBackground: '#fff',
        modalOverlayOpacity: 0.8,
        modalButtonColor: '#fff',
        modalUnsavedColor: '#fff',
        barButtonHoverColor: '#fff',
        barButtonBackground: '#fff',
        modalButtonHoverColor: '#fff',
        modalButtonBackground: '#35a75a',
        controlButtonIconColor: '#35a75a',
        controlButtonBackground: '#fff',
        barButtonHoverBackground: '#333',
        checkboxActiveBackground: '#35a75a',
        checkboxInactiveBackground: '#35a75a',
        modalButtonHoverBackground: '#333',
        checkboxDisabledBackground: '#ddd',
        controlButtonIconHoverColor: '#fff',
        controlButtonHoverBackground: '#35a75a',
        checkboxActiveCircleBackground: '#fff',
        checkboxInactiveCircleBackground: '#fff',
        checkboxDisabledCircleBackground: '#fff'
      }
    }],
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/sitemap'

  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  axios: {
    proxy: true
  },
  proxy: {
    // '/api/shorturls/': { target: 'http://www.shorturls.co.uk/includes/reveal-parse.php', pathRewrite: { '^/api/': '' }, changeOrigin: true },
    '/api/expandurl/': { target: 'http://expandurl.com', pathRewrite: { '^/api/expandurl/': '/api/v1/' }, changeOrigin: true }
  },
  i18n: {
    locales: [
      {
        code: 'es',
        iso: 'es-ES',
        name: 'Español',
        file: 'es-es.js'
      },
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en-us.js'
      }
    ],
    detectBrowserLanguage: false,
    noPrefixDefaultLocale: true,
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'en',
    baseUrl: 'https://chiaplotsimulator.com',
    seo: false
  },
  sitemap: {
    hostname: 'https://www.chiaplotsimulator.com',
    i18n: true
  },
  cookies: {
    necessary: [
      {
        // if multilanguage
        /* name: {
          en: 'Default Cookies'
        }, */
        // else
        name: 'Default Cookies',
        // if multilanguage
        /* description: {
          en: 'Used for cookie control.'
        }, */
        // else
        description: 'Used for cookie control.',
        cookies: ['cookie_control_consent', 'cookie_control_enabled_cookies']
      }
    ],
    optional: [
      {
        name: 'Google Analitycs',
        // if you don't set identifier, slugified name will be used
        identifier: 'ga',
        // if multilanguage
        /* description: {
          en: 'Google GTM is ...'
        }, */
        // else
        description: 'Google Analytics is a web analytics service offered by Google that tracks and reports website traffic.',

        initialState: true,
        src: `https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`,
        async: true,
        cookies: ['_ga', '_gat', '_gid'],
        accepted: () => {
          window.dataLayer = window.dataLayer || []
          window.dataLayer.push({
            'gtm.start': new Date().getTime(),
            event: 'gtm.js'
          })
        },
        declined: () => {
        }
      }
    ]
  },
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  }
}
