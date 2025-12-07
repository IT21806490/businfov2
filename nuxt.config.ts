import { defineNuxtConfig } from "nuxt/config"
import fs from 'fs'
import { SitemapStream, streamToPromise } from 'sitemap'
import { Readable } from 'stream'
import allRoutesData from './data/allroutes.json'

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
  },

  hooks: {
    // Generate static sitemap.xml during build
    'nitro:build:before': async () => {
      const baseUrl = 'https://businfo.click'

      // Static pages
      const staticUrls = [
        { url: '/', changefreq: 'weekly', priority: 1 },
        { url: '/contact', changefreq: 'weekly', priority: 0.8 },
        { url: '/findroutes', changefreq: 'weekly', priority: 0.8 },
        { url: '/normalfare', changefreq: 'weekly', priority: 0.8 },
        { url: '/normalwaytimes', changefreq: 'weekly', priority: 0.8 },
        { url: '/highwayfare', changefreq: 'weekly', priority: 0.8 },
        { url: '/privacy', changefreq: 'monthly', priority: 0.5 },
        { url: '/terms', changefreq: 'monthly', priority: 0.5 },
      ]

      // Dynamic bus routes from JSON
      const dynamicUrls = allRoutesData.map(route => ({
        url: `/routes/${route.Route_No}`,
        changefreq: 'weekly',
        priority: 0.7
      }))

      const allUrls = [...staticUrls, ...dynamicUrls]

      // Generate sitemap XML
      const stream = new SitemapStream({ hostname: baseUrl })
      const xml = await streamToPromise(Readable.from(allUrls).pipe(stream)).then(d =>
        d.toString()
      )

      // Write sitemap.xml to dist folder
      fs.writeFileSync('./dist/sitemap.xml', xml)
      console.log('✅ sitemap.xml generated with static + dynamic routes')
    }
  }
})
