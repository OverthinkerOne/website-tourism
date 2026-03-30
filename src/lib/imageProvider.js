const apiKey = import.meta.env.VITE_PEXELS_API_KEY
let client = null
let pexelsModule = null

// Lazy load pexels only when needed
async function getPexelsClient() {
  if (pexelsModule === null && apiKey) {
    try {
      pexelsModule = await import('pexels')
      client = pexelsModule.createClient(apiKey)
    } catch (e) {
      pexelsModule = false // Mark as failed
      client = null
    }
  }
  return client
}

// Simple cache to avoid repeated queries
const cache = new Map()

export async function findImage({ query, orientation = 'landscape' }) {
  const key = `${query}:${orientation}`
  if (cache.has(key)) return cache.get(key)
  
  // Try Pexels first if available
  const pexelsClient = await getPexelsClient()
  if (pexelsClient) {
    try {
      const res = await pexelsClient.photos.search({ query, per_page: 1, orientation })
      const photo = res?.photos?.[0]
      const url = photo?.src?.large || photo?.src?.medium
      if (url) {
        cache.set(key, url)
        return url
      }
    } catch (e) {
      // Fallback on error
    }
  }
  
  // Fallback to Picsum
  const fallback = `https://picsum.photos/seed/${encodeURIComponent(query)}/800/600`
  cache.set(key, fallback)
  return fallback
}
