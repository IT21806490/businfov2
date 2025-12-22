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
  ssr: false,
  nitro: {
    preset: "github_pages",
    prerender: {
      crawlLinks: true,
      routes: [
        '/',               
        '/sitemap.xml',    
        '/robots.txt'      
      ],
      failOnError: false,
    }
  },
  app: {
    baseURL: "/", 
    buildAssetsDir: "_nuxt/",
    head: {
      title: "Businfo.click",
      link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
      script: [
        {
          src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5769619247124269",
          async: true,
          crossorigin: "anonymous"
        }
      ]
    },
  },
  sitemap: {
    xsl: false,
    urls: [
      '/',
      '/contact',
      '/findroutes',
      '/normalfare',
      '/normalwaytimes',
      '/highwayfare',
      '/privacy',
      '/terms'
    ],
    defaults: {
      changefreq: 'weekly',
      priority: 0.8
    }
  },
  router: {
    options: {
      // hashMode removed for clean URLs
    }
  }
});
