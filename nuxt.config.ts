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
    "@vueuse/motion/nuxt",
    "@nuxtjs/mdc",
    "@nuxtjs/i18n",
    "@nuxtjs/device",
    "@tailwindcss/vite",
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
  },
  plugins: [],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_API_ENDPOINT || "http://localhost:3000/directus",
      motion: {
        directives: {},
      },
    },
  },
  routeRules: {
    "/directus/**": {
      proxy: `${import.meta.env.NUXT_DIRECTUS_API}/**`,
      prerender: true,
    },
  },
  app: {
    head: {
      title: "Epices du monde", //default fallback title
      htmlAttrs: {
        lang: "fr",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "./favicon.ico" }],
      charset: "utf-16",
      viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    },
    baseURL: "/",
  },
  image: {
    domains: ['localhost:3000/directus/assets'],
    alias: {
      directus: 'http://localhost:3000/directus/assets'
    }
  }
});
