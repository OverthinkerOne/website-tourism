// Centralized Calendly configuration
// Set VITE_CALENDLY_URL in your .env (e.g., https://calendly.com/your-handle/intro-call)
function ensureHttp(url) {
  if (!url) return url
  const trimmed = String(url).trim()
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}

const rawCalendly = import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/YOUR-CALENDLY-HANDLE'
export const CALENDLY_URL = ensureHttp(rawCalendly)

export const IS_CALENDLY_CONFIGURED = Boolean(import.meta.env.VITE_CALENDLY_URL && !/YOUR-CALENDLY-HANDLE/i.test(rawCalendly))

if (!import.meta.env.VITE_CALENDLY_URL || /YOUR-CALENDLY-HANDLE/i.test(rawCalendly)) {
  // Non-blocking heads-up for developers to configure Calendly
  // eslint-disable-next-line no-console
  console.warn('[Calendly] Using placeholder CALENDLY_URL. Set VITE_CALENDLY_URL in your .env to a valid event or booking link (e.g., https://calendly.com/paulo/atendimento).')
}
