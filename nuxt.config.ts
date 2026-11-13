// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: false },
  modules: [
    "@nuxt/ui",
    "@nuxt/image",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
  ],
  css: ["~/assets/css/main.css"],
  mdc: {
    components: {
      prose: true,
    },
  },
  i18n: {
    locales: [
      { code: "en", language: "en-US", name: "English", file: "en.json" },
      { code: "fr", language: "fr-FR", name: "Français", file: "fr.json" },
    ],
    defaultLocale: "fr",
    strategy: "no_prefix",
    detectBrowserLanguage: false,
  },
  app: {
    head: {
      title: "Epices du monde - Epicerie Asiatique & Exotique", //default fallback title
      htmlAttrs: {
        lang: "fr",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "./favicon.ico" }],
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
    baseURL: "/",
  },
  icon: {
    mode: 'css',
    cssLayer: 'base'
  }
});
