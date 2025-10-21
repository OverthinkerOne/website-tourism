// Lightweight Calendly widget integration without bundling their script upfront
// Usage: await openCalendly({ url, prefill, locale })

const CALENDLY_WIDGET_SRC = 'https://assets.calendly.com/assets/external/widget.js'
const CALENDLY_WIDGET_CSS = 'https://assets.calendly.com/assets/external/widget.css'

export function loadCalendlyScript() {
  return new Promise((resolve, reject) => {
    if (window.Calendly?.initPopupWidget) return resolve(window.Calendly)
    const existing = document.querySelector(`script[src="${CALENDLY_WIDGET_SRC}"]`)
    if (existing) {
      existing.addEventListener('load', () => resolve(window.Calendly))
      existing.addEventListener('error', reject)
      return
    }
    const s = document.createElement('script')
    s.src = CALENDLY_WIDGET_SRC
    s.async = true
    s.onload = () => resolve(window.Calendly)
    s.onerror = reject
    document.head.appendChild(s)
  })
}

export function ensureCalendlyStyles() {
  return new Promise((resolve) => {
    const existing = document.querySelector(`link[href="${CALENDLY_WIDGET_CSS}"]`)
    if (existing) return resolve()
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = CALENDLY_WIDGET_CSS
    link.onload = () => resolve()
    link.onerror = () => resolve() // non-blocking
    document.head.appendChild(link)
  })
}

export async function openCalendly({ url, prefill, locale } = {}) {
  try {
    // Make sure CSS is present so the popup is visible and doesn't lock the page
    await ensureCalendlyStyles()
    const calendly = await loadCalendlyScript()
    if (!calendly?.initPopupWidget) {
      window.open(url, '_blank', 'noopener,noreferrer')
      return
    }
    const query = new URLSearchParams()
    if (locale) query.set('locale', locale)
    // Pre-fill parameters (Calendly supports name, email, guests, customAnswers)
    // https://help.calendly.com/hc/en-us/articles/360020192293-Pre-populate-invitee-information-on-your-Booking-Page
    if (prefill?.name) query.set('name', prefill.name)
    if (prefill?.email) query.set('email', prefill.email)
    if (Array.isArray(prefill?.guests) && prefill.guests.length) query.set('guests', prefill.guests.join(','))
    if (prefill?.customAnswers && typeof prefill.customAnswers === 'object') {
      for (const [key, value] of Object.entries(prefill.customAnswers)) {
        query.set(`answers[${key}]`, String(value))
      }
    }
    const sep = url.includes('?') ? '&' : '?'
    calendly.initPopupWidget({ url: query.toString() ? `${url}${sep}${query}` : url })

    // Safety timeout: if popup fails to display, fallback to new tab to avoid "frozen" feel
    setTimeout(() => {
      const modal = document.querySelector('.calendly-overlay, .calendly-popup')
      const openIframes = document.querySelectorAll('iframe[src*="calendly.com"]')
      const visible = modal || (openIframes && openIframes.length > 0)
      if (!visible) {
        window.open(url, '_blank', 'noopener,noreferrer')
      }
    }, 2000)
  } catch (e) {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}
