import React from 'react'
import { Box, Avatar, Chip, Rating, Button } from '@mui/material'
import Typography from '@mui/material/Typography'
import { fonts, colors } from '../theme/tokens.js'
import VerifiedIcon from '@mui/icons-material/Verified'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import { useTranslation } from 'react-i18next'
import { getAllTestimonials } from '../lib/content.js'

const TESTIMONIALS_META = [
  { id: 't1', nameKey: 'items.t1.name', country: 'BR' },
  { id: 't2', nameKey: 'items.t2.name', country: 'US' },
  { id: 't3', nameKey: 'items.t3.name', country: 'AR' },
  { id: 't4', nameKey: 'items.t4.name', country: 'FR' },
  { id: 't5', nameKey: 'items.t5.name', country: 'DE' },
  { id: 't6', nameKey: 'items.t6.name', country: 'IT' },
]

function countryFlagEmoji(code) {
  if (!code) return '🌍'
  const cc = code.toUpperCase()
  const A = 127397
  return cc
    .replace(/[^A-Z]/g, '')
    .slice(0, 2)
    .split('')
    .map(c => String.fromCodePoint(c.charCodeAt(0) + A))
    .join('')
}

function AvatarFromName({ name, size = 40 }) {
  const initials = (name || '?')
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  // Simple deterministic color from name
  let hash = 0
  for (let i = 0; i < (name || '').length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0
  const hue = hash % 360
  const bg = `linear-gradient(135deg, hsl(${hue} 85% 60%), hsl(${(hue + 40) % 360} 85% 50%))`
  return (
    <Avatar sx={{ width: size, height: size, bgcolor: 'transparent', backgroundImage: bg, color: '#fff', fontWeight: 800 }}>
      {initials}
    </Avatar>
  )
}

function TestimonialCard({ name, country, title, text, tags, rating, date, verifiedLabel }) {
  return (
    <Box
      sx={{
        flex: '0 0 auto',
        width: { xs: 300, sm: 360, md: 420 },
        borderRadius: 3,
        bgcolor: '#fff',
        border: '1px solid #EAEAEA',
        overflow: 'hidden',
        boxShadow: '0 6px 18px rgba(0,0,0,0.07)',
        transition: 'transform 220ms ease, box-shadow 220ms ease',
        '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 16px 40px rgba(0,0,0,0.16)' },
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 2 }}>
        <AvatarFromName name={name} />
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontFamily: 'Kumbh Sans, system-ui, sans-serif', fontWeight: 800, fontSize: 16, color: '#111', lineHeight: 1.2 }} noWrap>
            {name}
          </Typography>
          <Typography sx={{ fontFamily: 'Kumbh Sans, system-ui, sans-serif', fontWeight: 600, fontSize: 12.5, color: 'rgba(0,0,0,0.65)' }}>
            {countryFlagEmoji(country)}
          </Typography>
        </Box>
        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <VerifiedIcon sx={{ fontSize: 18, color: colors.accent }} />
          <Typography sx={{ fontFamily: 'Kumbh Sans, system-ui, sans-serif', fontWeight: 700, fontSize: 12, color: colors.accent }}>
            {verifiedLabel}
          </Typography>
        </Box>
      </Box>

      {/* Rating */}
      <Box sx={{ px: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Rating value={rating} precision={0.5} readOnly size="small" />
        <Typography sx={{ fontFamily: 'Kumbh Sans, system-ui, sans-serif', fontWeight: 700, fontSize: 12, color: 'rgba(0,0,0,0.6)' }}>{rating.toFixed(1)}</Typography>
        <Typography sx={{ ml: 'auto', fontFamily: 'Kumbh Sans, system-ui, sans-serif', fontWeight: 600, fontSize: 12, color: 'rgba(0,0,0,0.5)' }}>{date}</Typography>
      </Box>

      {/* Quote */}
      <Box sx={{ px: 2, pt: 1.5, position: 'relative' }}>
        <FormatQuoteIcon sx={{ position: 'absolute', top: -6, left: 8, fontSize: 28, color: 'rgba(0,0,0,0.08)' }} />
        <Typography sx={{ fontFamily: 'Kumbh Sans, system-ui, sans-serif', fontWeight: 800, fontSize: 18, lineHeight: 1.3, color: '#111' }}>
          {title}
        </Typography>
      </Box>
      <Box sx={{ px: 2, pt: 1 }}>
        <Typography sx={{ fontFamily: 'Kumbh Sans, system-ui, sans-serif', fontWeight: 500, fontSize: 15, lineHeight: 1.55, color: '#333', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {text}
        </Typography>
      </Box>

      {/* Tags */}
      <Box sx={{ px: 2, pt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {tags?.map((tag) => (
          <Chip key={tag} size="small" label={tag} sx={{ bgcolor: 'rgba(255,115,0,0.08)', color: colors.accent, fontWeight: 700 }} />
        ))}
      </Box>

      {/* Bottom spacing removed as read-more button is no longer needed */}
    </Box>
  )
}

export default function Session9() {
  const { t } = useTranslation()
  const [dyn, setDyn] = React.useState(() => getAllTestimonials())
  // Merge dynamic with static; dynamic overrides static by id
  const merged = React.useMemo(() => {
    const ids = new Set((dyn || []).map((x) => x.id))
    const statics = TESTIMONIALS_META.filter((m) => !ids.has(m.id))
    return [...(dyn || []), ...statics]
  }, [dyn])
  const items = React.useMemo(() => [...merged, ...merged, ...merged], [merged])
  const viewportRef = React.useRef(null)
  const [isDragging] = React.useState(false)

  // recenter when mounted and when resized
  const recenter = React.useCallback(() => {
    const vp = viewportRef.current
    if (!vp) return
    const unitWidth = vp.scrollWidth / 3
    if (unitWidth > 0) vp.scrollLeft = unitWidth
  }, [])

  React.useEffect(() => {
    const id = requestAnimationFrame(recenter)
    return () => cancelAnimationFrame(id)
  }, [recenter])

  React.useEffect(() => {
    const onResize = () => recenter()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [recenter])

  React.useEffect(() => {
    let rafId
    const step = () => {
      const vp = viewportRef.current
      if (!vp) return
      if (!isDragging) vp.scrollLeft += 0.6
      const unitWidth = vp.scrollWidth / 3
      if (vp.scrollLeft >= unitWidth * 2) vp.scrollLeft -= unitWidth
      if (vp.scrollLeft <= 0) vp.scrollLeft += unitWidth
      rafId = requestAnimationFrame(step)
    }
    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [isDragging])

  // Update testimonials when Admin modifies localStorage
  React.useEffect(() => {
    const onStorage = () => setDyn(getAllTestimonials())
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  // Drag disabled

  return (
    <Box component="section" sx={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', bgcolor: '#fff' }}>
      <Box sx={{ position: 'relative', zIndex: 1, width: 'min(1300px, 96vw)', mx: 'auto', py: { xs: 4, md: 6 }, color: '#000', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ textAlign: 'center', maxWidth: 1000, mx: 'auto', px: 2 }}>
          <Typography component="h2" sx={{ m: 0, fontFamily: fonts.headings, fontWeight: 400, fontSize: { xs: 30, md: 44 }, lineHeight: 1.08, textTransform: 'uppercase', color: '#000' }}>
            {t('session9.title', 'Real and Independent Traveller Feedback')}
          </Typography>
          <Typography sx={{ mt: 1, fontFamily: 'Kumbh Sans, system-ui, sans-serif', fontWeight: 500, fontSize: { xs: 14.5, md: 16 }, color: 'rgba(0,0,0,0.75)', lineHeight: 1.55 }}>
            {t('session9.subtitle', 'Unfiltered, verified reviews from travellers who explored the Triple Frontier with us.')}
          </Typography>
        </Box>

        {/* Carousel */}
        <Box sx={{ mt: { xs: 2, md: 3 }, position: 'relative', flexGrow: 1, minHeight: 0, display: 'flex' }}>
          {/* Edge fade */}
          <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2, background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 4%, rgba(255,255,255,0) 96%, rgba(255,255,255,1) 100%)' }} />

          {/* Viewport */}
          <Box ref={viewportRef} sx={{ overflowX: 'hidden', overflowY: 'visible', cursor: 'default', touchAction: 'pan-y', height: '100%', width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'stretch', gap: { xs: 2.5, md: 3 }, px: { xs: 1.5, md: 2 }, height: '100%' }}>
              {items.map((meta, idx) => {
                const verifiedLabel = t('session9.verified', 'Verified')
                const isDyn = meta && Object.prototype.hasOwnProperty.call(meta, 'name') // dynamic entries have concrete fields
                const name = isDyn ? (meta.name || 'Traveller') : t(`session9.${meta.nameKey}`, 'Traveller')
                const country = isDyn ? (meta.country || 'US') : meta.country
                const title = isDyn ? (meta.title || '') : t(`session9.items.${meta.id}.title`)
                const text = isDyn ? (meta.text || '') : t(`session9.items.${meta.id}.text`)
                const tags = isDyn ? (Array.isArray(meta.tags) ? meta.tags : []) : t(`session9.items.${meta.id}.tags`, { returnObjects: true })
                const rating = isDyn ? (Number(meta.rating) || 5) : Number(t(`session9.items.${meta.id}.rating`, '5'))
                const date = isDyn ? (meta.date || '') : t(`session9.items.${meta.id}.date`, '')
                return (
                  <Box key={(meta.id || 't') + '-' + idx} sx={{ height: '100%' }}>
                    <TestimonialCard
                      name={name}
                      country={country}
                      title={title}
                      text={text}
                      tags={Array.isArray(tags) ? tags : []}
                      rating={isNaN(rating) ? 5 : rating}
                      date={date}
                      verifiedLabel={verifiedLabel}
                    />
                  </Box>
                )
              })}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
