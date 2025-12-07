import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  // Ensure compatibility with your Nuxt version
  compatibilityDate: '2025-11-30',

  // Modules
  modules: ["@nuxtjs/tailwindcss"],

  // Global CSS
  css: ["~/assets/tailwind.css"],

  // PostCSS configuration
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // Disable SSR (client-side only)
  ssr: false,

  // GitHub Pages Nitro preset
  nitro: {
    preset: "github_pages",
  },

  app: {
    // Base URL for GitHub Pages repository
    baseURL: "/businfov2/",

    // Build assets directory relative to baseURL
    buildAssetsDir: "_nuxt/",

    head: {
      title: "Businfo.click",
      link: [
        // Favicon
        {
          rel: "icon",
          type: "image/png",
          href: "/businfov2/favicon.png",
        },
      ],
    },
  },
});
