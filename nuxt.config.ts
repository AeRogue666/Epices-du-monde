// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: false },
  modules: ["@nuxt/ui", "@nuxt/image", "@nuxt/fonts", "@nuxt/icon", "@nuxtjs/tailwindcss", "@pinia/nuxt", "@vueuse/motion/nuxt"],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      apiBase: "https://dummyjson.com",
      motion: {
        directives: {}
      },
    },
  },
  app: {
    head: {
      title: "Epices du monde", //default fallback title
      htmlAttrs: {
        lang: "fr",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "./favicon.ico" }],
      charset: 'utf-16',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    },
  },
});
