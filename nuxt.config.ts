import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: '2025-11-30',

  modules: [
    "@nuxtjs/tailwindcss",
  ],

  css: ["~/assets/tailwind.css"],

  postcss: {
    plugins: { tailwindcss: {}, autoprefixer: {} },
  },

  ssr: false, // SPA mode

  nitro: { 
    preset: "github_pages",
    prerender: {
      crawlLinks: true,
      routes: ['/'],      
      failOnError: false,
    }
  },

  app: {
    baseURL: "/", 
    buildAssetsDir: "_nuxt/",
    head: {
      title: "Businfo.click",
      link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
    },
  },

  router: {
    options: {}
  }
});
