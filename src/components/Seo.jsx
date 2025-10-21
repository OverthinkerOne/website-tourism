import React from 'react'

// Lightweight SEO head manager: updates document head on mount/update
export default function Seo({
  title,
  description,
  canonical,
  image,
  locale = 'pt_BR',
  type = 'website',
  jsonLd = null,
}) {
  React.useEffect(() => {
    if (title) document.title = title

    const setMeta = (attr, name, content) => {
      if (!content) return
      let el = document.head.querySelector(`${attr}[name='${name}']`) || document.head.querySelector(`${attr}[property='${name}']`)
      if (!el) {
        el = document.createElement('meta')
        if (name.startsWith('og:')) {
          el.setAttribute('property', name)
        } else {
          el.setAttribute('name', name)
        }
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    const setLink = (rel, href) => {
      if (!href) return
      let el = document.head.querySelector(`link[rel='${rel}']`)
      if (!el) {
        el = document.createElement('link')
        el.setAttribute('rel', rel)
        document.head.appendChild(el)
      }
      el.setAttribute('href', href)
    }

    if (description) setMeta('meta', 'description', description)
    if (canonical) setLink('canonical', canonical)

  // Open Graph
    if (title) setMeta('meta', 'og:title', title)
    if (description) setMeta('meta', 'og:description', description)
    if (image) setMeta('meta', 'og:image', image)
    setMeta('meta', 'og:type', type)
    setMeta('meta', 'og:locale', locale)
  setMeta('meta', 'og:site_name', 'GuaraTravel')

  // Twitter (use name="twitter:*" per spec)
  setMeta('meta', 'twitter:card', image ? 'summary_large_image' : 'summary')
  if (title) setMeta('meta', 'twitter:title', title)
  if (description) setMeta('meta', 'twitter:description', description)
  if (image) setMeta('meta', 'twitter:image', image)

    // JSON-LD
    let ldScript
    if (jsonLd) {
      ldScript = document.createElement('script')
      ldScript.type = 'application/ld+json'
      ldScript.text = JSON.stringify(jsonLd)
      document.head.appendChild(ldScript)
    }

    return () => {
      if (ldScript && document.head.contains(ldScript)) document.head.removeChild(ldScript)
    }
  }, [title, description, canonical, image, locale, type, jsonLd])

  return null
}
