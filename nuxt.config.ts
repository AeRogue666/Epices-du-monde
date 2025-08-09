// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: false },
  modules: [
    "@nuxt/ui",
    "@nuxt/image",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@vueuse/motion/nuxt",
    "@nuxtjs/mdc",
  ],
  css: ["~/assets/css/main.css"],
  mdc: {
    components: {
      prose: true,
    },
  },
  runtimeConfig: {
    public: {
      apiBase: "localhost:8055",
      motion: {
        directives: {},
      },
    },
  },
  routeRules: {
    "/directus/**": { proxy: `${import.meta.env.API_URL}/**` },
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
  },
});
