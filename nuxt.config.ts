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
    baseURL: "/businfo/",
    buildAssetsDir: "assets",

    head: {
      title: "Businfo.click",
      link: [
        // Main favicon
        { rel: "icon", type: "image/png", href: "/businfo/favicon.png" },

      ]
    }
  }
});
