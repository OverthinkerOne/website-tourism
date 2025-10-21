// Simple content layer to support dynamic overrides (stored in localStorage)
// Structure in localStorage (key: gt_admin_overrides_v1):
// {
//   tours: { byId: { [id]: { title, short, intro, highlights[], includes[], tips[], image, countryCode, duration, level, season, family, published } }, list: [ {id, ...same fields} ] },
//   blog: { byId: { [id]: { title, category, excerpt, body[], date, tags[], image, published } }, list: [ {id, ...} ] },
//   restaurants: { byId: { [id]: { name, city, cuisine[], priceRange, short, intro, highlights[], services[], tips[], address, phone, website, instagram, openingHours, rating, image, published } }, list: [ { id, ... } ] },
//   testimonials: { list: [ { id, name, country, title, text, tags[], rating, date, published } ] },
//   faqs: { list: [ { id, question, answer, published } ] }
// }

import TOURS from '../data/tours.js'
import BLOG_POSTS from '../data/blogPosts.js'
import RESTAURANTS from '../data/restaurants.js'

const LS_KEY = 'gt_admin_overrides_v1'

export function loadOverrides() {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) return { tours: { byId: {}, list: [] }, blog: { byId: {}, list: [] }, restaurants: { byId: {}, list: [] }, testimonials: { list: [] }, faqs: { list: [] } }
    const parsed = JSON.parse(raw)
    return {
      tours: { byId: parsed?.tours?.byId || {}, list: parsed?.tours?.list || [] },
      blog: { byId: parsed?.blog?.byId || {}, list: parsed?.blog?.list || [] },
      restaurants: { byId: parsed?.restaurants?.byId || {}, list: parsed?.restaurants?.list || [] },
      testimonials: { list: parsed?.testimonials?.list || [] },
      faqs: { list: parsed?.faqs?.list || [] },
    }
  } catch {
    return { tours: { byId: {}, list: [] }, blog: { byId: {}, list: [] }, restaurants: { byId: {}, list: [] }, testimonials: { list: [] }, faqs: { list: [] } }
  }
}

export function saveOverrides(next) {
  localStorage.setItem(LS_KEY, JSON.stringify(next))
}

export function getAllTours() {
  const o = loadOverrides()
  const dyn = (o.tours.list || []).filter((t) => t && t.id && (t.published ?? true))
  // Merge static and dynamic; avoid id collisions (dynamic overrides static if same id)
  const map = new Map()
  for (const t of TOURS) map.set(t.id, { ...t })
  for (const t of dyn) map.set(t.id, { id: t.id, countryCode: t.countryCode || 'br', query: t.query || (t.title || ''), _override: t })
  return Array.from(map.values())
}

export function getTourOverride(id) {
  const o = loadOverrides()
  return o.tours.byId?.[id] || null
}

export function upsertTour(edited) {
  const o = loadOverrides()
  if (TOURS.some((t) => t.id === edited.id)) {
    o.tours.byId = { ...(o.tours.byId || {}), [edited.id]: edited }
  } else {
    const list = o.tours.list || []
    const idx = list.findIndex((x) => x.id === edited.id)
    if (idx >= 0) list[idx] = edited
    else list.push(edited)
    o.tours.list = list
  }
  saveOverrides(o)
}

export function removeTour(id) {
  const o = loadOverrides()
  // only dynamic can be removed from list
  o.tours.list = (o.tours.list || []).filter((x) => x.id !== id)
  // and clear overrides if any
  if (o.tours.byId?.[id]) delete o.tours.byId[id]
  saveOverrides(o)
}

export function getAllBlogPosts() {
  const o = loadOverrides()
  // Remove deprecated legacy posts from overrides/local list
  const DEPRECATED_BLOG_IDS = new Set(['inspiration-1','inspiration-2','inspiration-3','inspiration-4'])
  let changed = false
  if (o.blog?.list) {
    const before = o.blog.list.length
    o.blog.list = o.blog.list.filter((p) => p && p.id && !DEPRECATED_BLOG_IDS.has(p.id))
    if (o.blog.list.length !== before) changed = true
  }
  if (o.blog?.byId) {
    for (const k of Object.keys(o.blog.byId)) {
      if (DEPRECATED_BLOG_IDS.has(k)) { delete o.blog.byId[k]; changed = true }
    }
  }
  if (changed) saveOverrides(o)
  const dyn = (o.blog.list || []).filter((p) => p && p.id && (p.published ?? true))
  const map = new Map()
  for (const p of BLOG_POSTS) map.set(p.id, { ...p, ...(p.override ? { _override: p.override } : {}) })
  for (const p of dyn) map.set(p.id, { id: p.id, query: p.query || (p.title || ''), _override: p })
  return Array.from(map.values())
}

export function getBlogOverride(id) {
  const o = loadOverrides()
  return o.blog.byId?.[id] || null
}

export function upsertBlog(edited) {
  const o = loadOverrides()
  if (BLOG_POSTS.some((b) => b.id === edited.id)) {
    o.blog.byId = { ...(o.blog.byId || {}), [edited.id]: edited }
  } else {
    const list = o.blog.list || []
    const idx = list.findIndex((x) => x.id === edited.id)
    if (idx >= 0) list[idx] = edited
    else list.push(edited)
    o.blog.list = list
  }
  saveOverrides(o)
}

export function removeBlog(id) {
  const o = loadOverrides()
  o.blog.list = (o.blog.list || []).filter((x) => x.id !== id)
  if (o.blog.byId?.[id]) delete o.blog.byId[id]
  saveOverrides(o)
}

export function getSiteUrl() {
  // Prefer env var at build, else current origin
  const env = import.meta?.env?.VITE_SITE_URL
  if (env) return env.replace(/\/$/, '')
  if (typeof window !== 'undefined' && window.location?.origin) return window.location.origin
  return 'http://localhost'
}

// Restaurants
export function getAllRestaurants() {
  const o = loadOverrides()
  const dyn = (o.restaurants.list || []).filter((r) => r && r.id && (r.published ?? true))
  const map = new Map()
  for (const r of RESTAURANTS) map.set(r.id, { ...r })
  for (const r of dyn) map.set(r.id, { id: r.id, query: r.query || (r.name || ''), _override: r })
  return Array.from(map.values())
}

export function getRestaurantOverride(id) {
  const o = loadOverrides()
  return o.restaurants.byId?.[id] || null
}

export function upsertRestaurant(edited) {
  const o = loadOverrides()
  if (RESTAURANTS.some((r) => r.id === edited.id)) {
    o.restaurants.byId = { ...(o.restaurants.byId || {}), [edited.id]: edited }
  } else {
    const list = o.restaurants.list || []
    const idx = list.findIndex((x) => x.id === edited.id)
    if (idx >= 0) list[idx] = edited
    else list.push(edited)
    o.restaurants.list = list
  }
  saveOverrides(o)
}

export function removeRestaurant(id) {
  const o = loadOverrides()
  o.restaurants.list = (o.restaurants.list || []).filter((x) => x.id !== id)
  if (o.restaurants.byId?.[id]) delete o.restaurants.byId[id]
  saveOverrides(o)
}

// Testimonials
export function getAllTestimonials() {
  const o = loadOverrides()
  return (o.testimonials?.list || []).filter((x) => x && x.id && (x.published ?? true))
}

export function upsertTestimonial(edited) {
  const o = loadOverrides()
  const list = o.testimonials?.list || []
  const idx = list.findIndex((x) => x.id === edited.id)
  if (idx >= 0) list[idx] = edited
  else list.push(edited)
  o.testimonials = { list }
  saveOverrides(o)
}

export function removeTestimonial(id) {
  const o = loadOverrides()
  o.testimonials = { list: (o.testimonials?.list || []).filter((x) => x.id !== id) }
  saveOverrides(o)
}

// FAQs
export function getAllFaqs() {
  const o = loadOverrides()
  return (o.faqs?.list || []).filter((x) => x && x.id && (x.published ?? true))
}

export function upsertFaq(edited) {
  const o = loadOverrides()
  const list = o.faqs?.list || []
  const idx = list.findIndex((x) => x.id === edited.id)
  if (idx >= 0) list[idx] = edited
  else list.push(edited)
  o.faqs = { list }
  saveOverrides(o)
}

export function removeFaq(id) {
  const o = loadOverrides()
  o.faqs = { list: (o.faqs?.list || []).filter((x) => x.id !== id) }
  saveOverrides(o)
}
