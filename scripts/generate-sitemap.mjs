import fs from 'node:fs'
import path from 'node:path'
import TOURS from '../src/data/tours.js'
import BLOG_POSTS from '../src/data/blogPosts.js'

const SITE = (process.env.VITE_SITE_URL || 'https://example.com').replace(/\/$/, '')

const staticRoutes = ['/', '/about', '/gallery', '/tours', '/blog']
const tourRoutes = TOURS.map((t) => `/tours/${t.id}`)
const blogRoutes = BLOG_POSTS.map((b) => `/blog/${b.id}`)

const urls = [...staticRoutes, ...tourRoutes, ...blogRoutes]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${SITE}${u}</loc>
  </url>`
  )
  .join('\n')}
</urlset>`

const outDir = path.resolve(process.cwd(), 'public')
fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(path.join(outDir, 'sitemap.xml'), xml)
console.log('Sitemap written to public/sitemap.xml with', urls.length, 'URLs')
