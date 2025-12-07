import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: '2025-11-30',

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/sitemap", 
  ],

  site: {
    url: 'https://businfo.click', 
    name: 'Businfo.click',
  },

  css: ["~/assets/tailwind.css"],

  postcss: {
    plugins: { tailwindcss: {}, autoprefixer: {} },
  },

  ssr: false, // SPA mode

  nitro: { 
    preset: "github_pages",
    prerender: {
      crawlLinks: true,
      routes: ['/'],       // Pre-render home page
      failOnError: false,
    }
  },

  app: {
    baseURL: "/businfov2/",
    buildAssetsDir: "_nuxt/",
    head: {
      title: "Businfo.click",
      link: [{ rel: "icon", type: "image/png", href: "/businfov2/favicon.png" }],
    },
  },

  router: {
    options: {
      // Remove hashMode for clean URLs
      // hashMode: true
    }
  }
});
