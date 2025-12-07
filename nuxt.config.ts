import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: '2025-11-30',

  modules: ["@nuxtjs/tailwindcss"],

  css: ["~/assets/tailwind.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  ssr: false,

  nitro: {
    preset: "github_pages",
  },

  app: {

    baseURL: "/businfov2/",

    buildAssetsDir: "/_nuxt/",

    head: {
      title: "Businfo.click",
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/businfov2/favicon.png",  
        },
      ],
    },
  },
});
