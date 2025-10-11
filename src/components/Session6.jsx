import React from 'react'
import { Box, Button } from '@mui/material'
import Typography from '@mui/material/Typography'
import { fonts, colors } from '../theme/tokens.js'
import { useTranslation } from 'react-i18next'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import { useNavigate } from 'react-router-dom'
import LandscapeIcon from '@mui/icons-material/Landscape'
import NightlifeIcon from '@mui/icons-material/Nightlife'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import WavesIcon from '@mui/icons-material/Waves'
import BoltIcon from '@mui/icons-material/Bolt'
import { findImage } from '../lib/imageProvider.js'

const tours = [
  {
    id: 'br-iguacu-br',
    country: 'Brasil',
    title: 'Iguaçu National Park (Brazilian Side)',
    Icon: WavesIcon,
    query: 'Iguazu Falls Brazil waterfall tropical',
  },
  {
    id: 'br-itaipu-night',
    country: 'Brasil',
    title: 'Itaipu Dam Night Lights',
    Icon: NightlifeIcon,
    query: 'Itaipu Dam night lights Brazil',
  },
  {
    id: 'ar-iguacu-ar',
    country: 'Argentina',
    title: 'Iguazú National Park (Argentine Side)',
    Icon: LandscapeIcon,
    query: 'Iguazu Falls Argentina waterfall jungle',
  },
  {
    id: 'ar-gran-aventura',
    country: 'Argentina',
    title: 'Gran Aventura Boat Ride',
    Icon: DirectionsCarIcon,
    query: 'boat ride waterfall adventure Iguazu',
  },
  {
    id: 'py-shopping-cde',
    country: 'Paraguai',
    title: 'Shopping Ciudad del Este Experience',
    Icon: LocalMallIcon,
    query: 'Ciudad del Este Paraguay skyline shopping',
  },
  {
    id: 'py-saltos-monday',
    country: 'Paraguai',
    title: 'Saltos del Monday Falls',
    Icon: BoltIcon,
    query: 'Saltos del Monday Paraguay waterfall forest',
  },
]


function TourCard({ tour }) {
  const { t } = useTranslation()
  const { country, title, Icon, image, id } = tour
  const navigate = useNavigate()
  const hasImage = Boolean(image)
  return (
    <Box
      sx={{
        flex: '0 0 auto',
        width: { xs: 280, sm: 320, md: 360 },
        borderRadius: 2,
        bgcolor: '#fff',
        border: '1px solid #E5E5E5',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        transition: 'transform 220ms ease, box-shadow 220ms ease',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: `0 14px 36px rgba(0,0,0,0.18), 0 4px 10px rgba(0,0,0,0.07)`,
        },
      }}
    >
      {/* 1) Image area */}
      <Box sx={{ position: 'relative', height: { xs: 160, md: 180 }, overflow: 'hidden' }}>
        {hasImage ? (
          <Box
            component="img"
            src={image}
            alt={`${title} image`}
            onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${encodeURIComponent(title)}/800/600` }}
            sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <Box sx={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center', background: 'linear-gradient(135deg, #0ea5e9, #22d3ee)' }}>
            <Icon sx={{ fontSize: 40, color: '#fff', opacity: 0.9 }} />
          </Box>
        )}
        {/* Subtle top gradient for depth */}
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0))' }} />
        {/* Optional corner icon badge for identity */}
        <Box sx={{ position: 'absolute', top: 8, right: 8, width: 32, height: 32, borderRadius: '50%', bgcolor: 'rgba(0,0,0,0.55)', display: 'grid', placeItems: 'center', color: '#fff' }}>
          <Icon sx={{ fontSize: 18 }} />
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
  // Triplicate items for seamless infinite loop in both directions
  const items = React.useMemo(() => [...tours, ...tours, ...tours], [])
  const viewportRef = React.useRef(null)
  const [images, setImages] = React.useState({})
  React.useEffect(() => {
    let alive = true
    ;(async () => {
      const entries = await Promise.all(
        tours.map(async (t) => {
          const url = await findImage({ query: t.query || t.title, orientation: 'landscape' })
          return [t.id, url]
        })
      )
      if (alive) setImages(Object.fromEntries(entries))
    })()
    return () => { alive = false }
  }, [])
  const [isDragging, setIsDragging] = React.useState(false)
  const dragState = React.useRef({ startX: 0, startScroll: 0, pointerId: null })

  // Initialize scroll position to the middle copy
  React.useEffect(() => {
    const vp = viewportRef.current
    if (!vp) return
    const init = () => {
      const unitWidth = vp.scrollWidth / 3
      vp.scrollLeft = unitWidth
    }
    // init after first paint
    const id = requestAnimationFrame(init)
    return () => cancelAnimationFrame(id)
  }, [])

  // Auto-scroll when not dragging
  React.useEffect(() => {
    let rafId
    const step = () => {
      const vp = viewportRef.current
      if (!vp) return
      if (!isDragging) {
        vp.scrollLeft += 0.8 // speed px/frame (slightly faster)
      }
      // Looping logic
      const unitWidth = vp.scrollWidth / 3
      if (vp.scrollLeft >= unitWidth * 2) vp.scrollLeft -= unitWidth
      if (vp.scrollLeft <= 0) vp.scrollLeft += unitWidth
      rafId = requestAnimationFrame(step)
    }
    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [isDragging])

  // Recenter after images load to ensure proper starting position
  React.useEffect(() => {
    const vp = viewportRef.current
    if (!vp) return
    const unitWidth = vp.scrollWidth / 3
    if (unitWidth > 0) vp.scrollLeft = unitWidth
  }, [images])

  const onPointerDown = (e) => {
    const vp = viewportRef.current
    if (!vp) return
    vp.setPointerCapture?.(e.pointerId)
    dragState.current = { startX: e.clientX, startScroll: vp.scrollLeft, pointerId: e.pointerId }
    setIsDragging(true)
    e.preventDefault()
  }
  const onPointerMove = (e) => {
    if (!isDragging) return
    const vp = viewportRef.current
    if (!vp) return
    const dx = e.clientX - dragState.current.startX
    vp.scrollLeft = dragState.current.startScroll - dx
    // Wrap during drag to preserve the infinite loop feel
    const unitWidth = vp.scrollWidth / 3
    if (vp.scrollLeft >= unitWidth * 2) vp.scrollLeft -= unitWidth
    if (vp.scrollLeft <= 0) vp.scrollLeft += unitWidth
  }
  const endDrag = (e) => {
    const vp = viewportRef.current
    if (!vp) return
    if (dragState.current.pointerId) {
      try { vp.releasePointerCapture?.(dragState.current.pointerId) } catch {}
    }
    setIsDragging(false)
  }

  return (
    <Box component="section" sx={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', bgcolor: '#fff' }}>
      {/* Papers exactly like Session 4 */}
      <Box component="img" src="/images/paper.png" alt="" aria-hidden sx={{ position: 'absolute', top: -1, left: 0, right: 0, width: '100%', height: 'auto', zIndex: 2, pointerEvents: 'none', userSelect: 'none', transform: 'scaleY(-1)' }} />
      <Box component="img" src="/images/paper.png" alt="" aria-hidden sx={{ position: 'absolute', bottom: -1, left: 0, right: 0, width: '100%', height: 'auto', zIndex: 2, pointerEvents: 'none', userSelect: 'none' }} />

      <Box sx={{ position: 'relative', zIndex: 3, width: 'min(1300px, 96vw)', mx: 'auto', height: '100%', display: 'flex', flexDirection: 'column', pt: { xs: 6, md: 8 }, pb: { xs: 6, md: 8 } }}>
        {/* Optional section label */}
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

        {/* Edge fade masks for elegance */}
  <Box sx={{ position: 'relative', flexGrow: 1 }}>
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 2,
              background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 8%, rgba(255,255,255,0) 92%, rgba(255,255,255,1) 100%)',
            }}
          />

          {/* Carousel viewport with drag-to-scroll */}
          <Box
            ref={viewportRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            sx={{ overflow: 'hidden', cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2.5, md: 3 }, px: { xs: 1.5, md: 2 }, height: '100%' }}>
              {items.map((tour, idx) => {
                const countryCode = (tour.id || '').split('-')[0] || 'br'
                const countryLabel = t(`session6.countries.${countryCode}`, tour.country)
                const titleLabel = t(`session6.titles.${tour.id}`, tour.title)
                return (
                  <TourCard key={tour.id + '-' + idx} tour={{ ...tour, country: countryLabel, title: titleLabel, image: images[tour.id] || tour.image }} />
                )
              })}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
