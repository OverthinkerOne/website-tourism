import React from 'react'
import { Box, Button } from '@mui/material'
import Typography from '@mui/material/Typography'
import { fonts, colors } from '../theme/tokens.js'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import LandscapeIcon from '@mui/icons-material/Landscape'
import NightlifeIcon from '@mui/icons-material/Nightlife'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import WavesIcon from '@mui/icons-material/Waves'
import { findImage } from '../lib/imageProvider.js'
import TOUR_IMAGES from '../data/tourImages.js'
import { getAllTours, getTourOverride } from '../lib/content.js'

function iconForTour(id = '') {
  const s = String(id).toLowerCase()
  if (s.includes('macuco') || s.includes('gran-aventura') || s.includes('boat')) return WavesIcon
  if (s.includes('night')) return NightlifeIcon
  if (s.includes('shopping') || s.includes('cde') || s.includes('shop')) return LocalMallIcon
  if (s.includes('saltos') || s.includes('park') || s.includes('refugio') || s.includes('panoramico')) return LandscapeIcon
  return LandscapeIcon
}

function TourCard({ tour }) {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { id, country, title, Icon, image } = tour
  return (
    <Box
      sx={{
        flex: '0 0 auto',
        width: { xs: 260, sm: 300, md: 340, lg: 380 },
        borderRadius: 2,
        bgcolor: '#fff',
        border: '1px solid #E5E5E5',
        overflow: 'hidden',
        boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
        transition: 'transform 220ms ease, box-shadow 220ms ease',
        '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 16px 40px rgba(0,0,0,0.18)' },
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 1) Image with icon overlay */}
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'relative', width: '100%', pt: '56.25%' }} />
        {image ? (
          <Box
            component="img"
            src={image}
            alt={title}
            sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${encodeURIComponent(title)}/800/600` }}
          />
        ) : (
          <Box sx={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: 'linear-gradient(135deg, #06b6d4, #22d3ee)' }}>
            {Icon ? <Icon sx={{ fontSize: 44, color: '#fff', opacity: 0.95 }} /> : <LandscapeIcon sx={{ fontSize: 44, color: '#fff', opacity: 0.95 }} />}
          </Box>
        )}
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0))' }} />
        <Box sx={{ position: 'absolute', top: 8, left: 8, bgcolor: 'rgba(255,255,255,0.92)', borderRadius: 1.5, px: 1, py: 0.5, display: 'inline-flex', alignItems: 'center', gap: 0.75 }}>
          {Icon ? <Icon sx={{ fontSize: 18, color: colors.accent }} /> : <LandscapeIcon sx={{ fontSize: 18, color: colors.accent }} />}
          <Typography sx={{ fontFamily: 'Kumbh Sans, system-ui, sans-serif', fontWeight: 700, fontSize: 12, color: '#111' }}>Tour</Typography>
        </Box>
      </Box>

      {/* 2) Country chip */}
      <Box sx={{ px: 2, pt: 1.25 }}>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            px: 1.25,
            py: 0.5,
            borderRadius: 999,
            bgcolor: 'rgba(255, 115, 0, 0.12)',
            color: colors.accent,
            fontFamily: 'Kumbh Sans, system-ui, sans-serif',
            fontWeight: 700,
            fontSize: 12,
            textTransform: 'uppercase',
            letterSpacing: 0.6,
          }}
        >
          {country}
        </Box>
      </Box>

      {/* 3) Title */}
      <Box sx={{ px: 2, pt: { xs: 1.5, md: 1.75 }, pb: { xs: 1.5, md: 1.75 } }}>
        <Typography sx={{ fontFamily: 'Kumbh Sans, system-ui, sans-serif', fontWeight: 700, fontSize: 18, lineHeight: 1.25, color: '#111' }}>
          {title}
        </Typography>
      </Box>

      {/* 4) Button */}
      <Box sx={{ px: 2, pb: 2 }}>
        <Button
          variant="contained"
          disableElevation
          onClick={(e) => { e.preventDefault(); navigate(`/tours/${id}`) }}
          sx={{
            width: '100%',
            bgcolor: colors.accent,
            color: '#fff',
            fontFamily: 'Kumbh Sans, system-ui, sans-serif',
            fontWeight: 700,
            textTransform: 'none',
            '&:hover': { bgcolor: '#ff7f14' },
          }}
        >
          {t('session6.viewDetails')}
        </Button>
      </Box>
    </Box>
  )
}

export default function Session6() {
  const { t } = useTranslation()
  const [tours, setTours] = React.useState(() => getAllTours())
  const items = React.useMemo(() => [...tours, ...tours, ...tours], [tours])
  const viewportRef = React.useRef(null)
  const [images, setImages] = React.useState({})
  const [isDragging] = React.useState(false)

  // Load tours and resolve images
  React.useEffect(() => {
    let alive = true
    ;(async () => {
      const list = getAllTours()
      setTours(list)
      const entries = await Promise.all(
        list.map(async (t) => {
          const override = getTourOverride(t.id) || t._override
          const staticUrl = override?.image || TOUR_IMAGES[t.id]
          if (staticUrl) return [t.id, staticUrl]
          const url = await findImage({ query: override?.title || t.query || t.id, orientation: 'landscape' })
          return [t.id, url]
        })
      )
      if (alive) setImages(Object.fromEntries(entries))
    })()
    return () => { alive = false }
  }, [])

  // Update tours when localStorage changes via Admin
  React.useEffect(() => {
    const onStorage = () => setTours(getAllTours())
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  // Recenter after images load
  React.useEffect(() => {
    const vp = viewportRef.current
    if (!vp) return
    const unitWidth = vp.scrollWidth / 3
    if (unitWidth > 0) vp.scrollLeft = unitWidth
  }, [images])

  // Also recenter after first paint
  React.useEffect(() => {
    const id = requestAnimationFrame(() => {
      const vp = viewportRef.current
      if (!vp) return
      const unitWidth = vp.scrollWidth / 3
      if (unitWidth > 0) vp.scrollLeft = unitWidth
    })
    return () => cancelAnimationFrame(id)
  }, [])

  // Auto-scroll when not dragging
  React.useEffect(() => {
    let rafId
    const step = () => {
      const vp = viewportRef.current
      if (!vp) return
      if (!isDragging) vp.scrollLeft += 0.8
      const unitWidth = vp.scrollWidth / 3
      if (vp.scrollLeft >= unitWidth * 2) vp.scrollLeft -= unitWidth
      if (vp.scrollLeft <= 0) vp.scrollLeft += unitWidth
      rafId = requestAnimationFrame(step)
    }
    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [isDragging])

  return (
    <Box component="section" sx={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', bgcolor: '#fff' }}>
      {/* Decorative papers (top/bottom) */}
      <Box component="img" src="/images/paper.png" alt="" aria-hidden sx={{ position: 'absolute', top: -1, left: 0, right: 0, width: '100%', height: 'auto', zIndex: 2, pointerEvents: 'none', userSelect: 'none', transform: 'scaleY(-1)' }} />
      <Box component="img" src="/images/paper.png" alt="" aria-hidden sx={{ position: 'absolute', bottom: -1, left: 0, right: 0, width: '100%', height: 'auto', zIndex: 2, pointerEvents: 'none', userSelect: 'none' }} />

      <Box sx={{ position: 'relative', zIndex: 3, width: 'min(1300px, 96vw)', mx: 'auto', height: '100%', display: 'flex', flexDirection: 'column', pt: { xs: 6, md: 8 }, pb: { xs: 6, md: 8 } }}>
        <Typography
          component="h2"
          sx={{
            m: 0,
            mb: { xs: 5, md: 8 },
            textAlign: 'center',
            fontFamily: fonts.headings,
            fontWeight: 400,
            fontSize: { xs: 38, md: 48 },
            lineHeight: 1.05,
            textTransform: 'uppercase',
            color: '#000',
          }}
        >
          {t('session6.title')}
        </Typography>

        <Box sx={{ position: 'relative', flexGrow: 1 }}>
          {/* Edge fade masks for elegance */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 2,
              background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 8%, rgba(255,255,255,0) 92%, rgba(255,255,255,1) 100%)',
            }}
          />

          {/* Carousel viewport */}
          <Box ref={viewportRef} sx={{ overflow: 'hidden', cursor: 'default' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2.5, md: 3 }, px: { xs: 1.5, md: 2 }, height: '100%' }}>
              {items.map((tour, idx) => {
                const override = getTourOverride(tour.id) || tour._override
                const countryCode = (override?.countryCode || tour.countryCode || (tour.id || '').split('-')[0] || 'br')
                const countryLabel = t(`session6.countries.${countryCode}`, countryCode.toUpperCase())
                const titleLabel = override?.title || t(`session6.titles.${tour.id}`, override?.title || tour.title || tour.id)
                const Icon = iconForTour(tour.id)
                const image = images[tour.id] || tour.image
                return (
                  <TourCard key={tour.id + '-' + idx} tour={{ ...tour, country: countryLabel, title: titleLabel, image, Icon, id: tour.id }} />
                )
              })}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
