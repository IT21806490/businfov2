import { SitemapStream, streamToPromise } from 'sitemap'
import { Readable } from 'stream'
import allRoutesData from '../../data/allroutes.json'

export default defineEventHandler(async (event) => {
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

  // Dynamic routes from bus JSON
  const dynamicUrls = allRoutesData.map(route => ({
    url: `/routes/${route.Route_No}`,
    changefreq: 'weekly',
    priority: 0.7
  }))

  const allUrls = [...staticUrls, ...dynamicUrls]

  // Generate sitemap XML
  const stream = new SitemapStream({ hostname: baseUrl })
  const xml = await streamToPromise(Readable.from(allUrls).pipe(stream)).then(data =>
    data.toString()
  )

  setHeader(event, 'Content-Type', 'application/xml')
  return xml
})
