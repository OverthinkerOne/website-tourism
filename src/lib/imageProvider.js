import { createClient } from 'pexels'

const apiKey = import.meta.env.VITE_PEXELS_API_KEY
let client = null
if (apiKey) {
  try {
    client = createClient(apiKey)
  } catch (e) {
    client = null
  }
}

// Simple cache to avoid repeated queries
const cache = new Map()

export async function findImage({ query, orientation = 'landscape' }) {
  const key = `${query}:${orientation}`
  if (cache.has(key)) return cache.get(key)
  // Fallback Picsum if no API key
  if (!client) {
    const url = `https://picsum.photos/seed/${encodeURIComponent(query)}/800/600`
    cache.set(key, url)
    return url
  }
  try {
    const res = await client.photos.search({ query, per_page: 1, orientation })
    const photo = res?.photos?.[0]
    const url = photo?.src?.large || photo?.src?.medium
    if (url) {
      cache.set(key, url)
      return url
    }
  } catch (e) {
    // ignore
  }
  const fallback = `https://picsum.photos/seed/${encodeURIComponent(query)}/800/600`
  cache.set(key, fallback)
  return fallback
}
