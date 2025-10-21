// Simple downloader for Neumann blog page 2 images
// Saves to public/images/blog
import fs from 'node:fs'
import path from 'node:path'
import https from 'node:https'

const root = path.resolve(process.cwd())
const outDir = path.join(root, 'public', 'images', 'blog')
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

const files = [
  {
    url: 'https://neumanntour.com.br/wp-content/gallery/secret-falls/1.jpeg',
    file: 'iguassu-secret-falls.jpg',
  },
  {
    url: 'https://neumanntour.com.br/wp-content/gallery/flavio-fusco/1.JPG',
    file: 'flaviofusco.jpg',
  },
  {
    url: 'https://neumanntour.com.br/wp-content/gallery/piquenique-cataratas/D0A4986.jpg',
    file: 'experienciasbelmond.jpg',
  },
  {
    url: 'https://neumanntour.com.br/wp-content/gallery/ytepopo/1.jpg',
    file: 'trilha-ytepopo.jpg',
  },
  {
    url: 'https://neumanntour.com.br/wp-content/gallery/lumina-park/1.jpeg',
    file: 'lumina-park.jpg',
  },
  // Page 3 additions
  {
    url: 'https://neumanntour.com.br/wp-content/gallery/show-das-aguas/1.jpg',
    file: 'showdasaguas.jpg',
  },
  {
    url: 'https://neumanntour.com.br/wp-content/gallery/patanegra/1.jpg',
    file: 'patanegra.jpg',
  },
  {
    url: 'https://neumanntour.com.br/wp-content/gallery/aventuras-em-foz/1.jpg',
    file: 'aventurasemfoz.jpg',
  },
  {
    url: 'https://neumanntour.com.br/wp-content/gallery/la-aripuca_2024/1.JPG',
    file: 'la-aripuca.jpg',
  },
]

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest)
    https
      .get(url, (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          // handle redirect
          res.destroy()
          return resolve(download(res.headers.location, dest))
        }
        if (res.statusCode !== 200) {
          file.close(() => fs.unlink(dest, () => {}))
          return reject(new Error(`HTTP ${res.statusCode} for ${url}`))
        }
        res.pipe(file)
        file.on('finish', () => file.close(resolve))
      })
      .on('error', (err) => {
        file.close(() => fs.unlink(dest, () => {}))
        reject(err)
      })
  })
}

;(async () => {
  for (const { url, file } of files) {
    const dest = path.join(outDir, file)
    process.stdout.write(`Downloading ${url} -> ${path.relative(root, dest)}... `)
    try {
      await download(url, dest)
      console.log('done')
    } catch (e) {
      console.log(`failed: ${e.message}`)
    }
  }
  console.log('All done.')
})()
