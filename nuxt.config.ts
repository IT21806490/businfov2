import fs from 'fs'
import path from 'path'
import { SitemapStream, streamToPromise } from 'sitemap'
import { Readable } from 'stream'
import allRoutesData from './data/allroutes.json'

export default defineNuxtConfig({
  ssr: false,
  nitro: { preset: 'github_pages' },

  hooks: {
    'nitro:build:before': async () => {
      const baseUrl = 'https://businfo.click'

      // Static pages
      const staticUrls = [
        { url: '/', changefreq: 'weekly', priority: 1 },
        { url: '/contact', changefreq: 'weekly', priority: 0.8 },
        { url: '/findroutes', changefreq: 'weekly', priority: 0.8 },
      ]

      // Dynamic bus routes
      const dynamicUrls = allRoutesData.map(r => ({
        url: `/routes/${r.Route_No}`,
        changefreq: 'weekly',
        priority: 0.7,
      }))

      const allUrls = [...staticUrls, ...dynamicUrls]

      // Generate sitemap XML
      const stream = new SitemapStream({ hostname: baseUrl })
      const xml = await streamToPromise(Readable.from(allUrls).pipe(stream)).then(d => d.toString())

      // Ensure dist folder exists
      const distPath = path.resolve('./dist')
      if (!fs.existsSync(distPath)) {
        fs.mkdirSync(distPath, { recursive: true })
      }

      // Write sitemap.xml
      fs.writeFileSync(path.join(distPath, 'sitemap.xml'), xml)
      console.log('✅ sitemap.xml generated successfully')
    }
  }
})
