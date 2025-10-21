import React from 'react'
import { useParams, Link as RouterLink } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '../theme.js'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { alpha } from '@mui/material/styles'
import { fonts, colors } from '../theme/tokens.js'
import { useTranslation } from 'react-i18next'
import TOURS from '../data/tours.js'
import { findImage } from '../lib/imageProvider.js'
import TOUR_IMAGES from '../data/tourImages.js'
import CalendlyDialog from '../components/CalendlyDialog.jsx'
import { CALENDLY_URL } from '../config/calendly.js'
// Icons
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import HikingIcon from '@mui/icons-material/Hiking'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom'
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus'
import HailIcon from '@mui/icons-material/Hail'
import BorderAllIcon from '@mui/icons-material/BorderAll'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat'
import NightlifeIcon from '@mui/icons-material/Nightlife'
import ParkIcon from '@mui/icons-material/Park'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import Seo from '../components/Seo.jsx'
import { getSiteUrl, getTourOverride, getAllTours } from '../lib/content.js'

export default function TourDetailPage() {
  const { id } = useParams()
  const { t, i18n } = useTranslation()
  // Prefer dynamic tours merged with static; fallback to static if not found
  const tour = React.useMemo(() => {
    const merged = getAllTours()
    return merged.find((x) => x.id === id) || TOURS.find((x) => x.id === id) || { id }
  }, [id])
  const site = getSiteUrl()
  const [hero, setHero] = React.useState('')
  const [calOpen, setCalOpen] = React.useState(false)
  // Override: either explicit override for static tours or the dynamic record attached by getAllTours
  const override = getTourOverride(id) || tour._override
  // Helper to robustly coerce list-like data into arrays
  const toArray = React.useCallback((val) => {
    if (!val) return []
    if (Array.isArray(val)) return val
    if (typeof val === 'string') {
      return val
        .split(/\r?\n|,|;|\u2022|\u25CF|\u25E6/g) // split on newlines, commas, semicolons, common bullet chars
        .map((s) => s.trim())
        .filter(Boolean)
    }
    return []
  }, [])
  React.useEffect(() => {
    let alive = true
    ;(async () => {
      if (!tour) return
      const url = override?.image || TOUR_IMAGES[tour.id] || await findImage({ query: override?.title || tour.query || id, orientation: 'landscape' })
      if (alive) setHero(url)
    })()
    return () => { alive = false }
  }, [tour, id, override?.image, override?.title])

  if (!tour) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Box sx={{ px: { xs: 2, sm: 3, md: 6 }, py: 8 }}>
          <Typography variant="h5">{t('tours.notFound')}</Typography>
          <Button component={RouterLink} to="/tours" sx={{ mt: 2 }}>{t('tours.cta.backToList')}</Button>
        </Box>
        <Footer />
      </ThemeProvider>
    )
  }

  const title = override?.title || t(`session6.titles.${tour.id}`, override?.title || tour.title || tour.id)
  const cc = override?.countryCode || tour.countryCode || 'br'
  const country = t(`session6.countries.${cc}`, (cc || 'br').toUpperCase())
  const intro = override?.intro || t(`tours.details.${tour.id}.intro`, '')
  const highlights = toArray(override?.highlights ?? t(`tours.details.${tour.id}.highlights`, { returnObjects: true, defaultValue: [] }))
  const includes = toArray(override?.includes ?? t(`tours.details.${tour.id}.includes`, { returnObjects: true, defaultValue: [] }))
  const tips = toArray(override?.tips ?? t(`tours.details.${tour.id}.tips`, { returnObjects: true, defaultValue: [] }))

  // Enriched UI meta per tour (local map to avoid changing datasets)
  const TOUR_META = {
    'br-iguacu-br': {
      duration: 'Half-day',
      level: 'Easy',
      season: 'All year',
      family: 'Yes',
      features: [
        { icon: CameraAltIcon, label: 'Panoramic viewpoints' },
        { icon: ParkIcon, label: 'National Park access' },
        { icon: DirectionsBusIcon, label: 'Private transport' },
        { icon: HailIcon, label: 'Hotel pickup' },
        { icon: RestaurantIcon, label: 'Cafe stops available' },
        { icon: CameraAltIcon, label: 'Golden hour friendly' },
      ],
    },
    'br-itaipu-night': {
      duration: 'Evening',
      level: 'Easy',
      season: 'All year',
      family: 'Yes',
      features: [
        { icon: NightlifeIcon, label: 'Night light show' },
        { icon: DirectionsBusIcon, label: 'Private transport' },
        { icon: CameraAltIcon, label: 'Photo stops' },
        { icon: HailIcon, label: 'Guide assistance' },
        { icon: RestaurantIcon, label: 'Optional dinner' },
        { icon: AccessTimeIcon, label: 'Flexible timing' },
      ],
    },
    'ar-iguacu-ar': {
      duration: 'Full-day',
      level: 'Moderate',
      season: 'All year',
      family: 'Yes',
      features: [
        { icon: HikingIcon, label: 'Upper & lower circuits' },
        { icon: BorderAllIcon, label: 'Border crossing' },
        { icon: ParkIcon, label: 'Devil’s Throat walkway' },
        { icon: DirectionsBusIcon, label: 'Private transport' },
        { icon: CameraAltIcon, label: 'Iconic photo angles' },
        { icon: RestaurantIcon, label: 'Food court available' },
      ],
    },
    'ar-gran-aventura': {
      duration: 'Half-day',
      level: 'Active',
      season: 'All year',
      family: 'Teens+',
      features: [
        { icon: DirectionsBoatIcon, label: 'Speedboat near falls' },
        { icon: BorderAllIcon, label: 'Border crossing' },
        { icon: HikingIcon, label: 'Jungle 4x4 ride' },
        { icon: CameraAltIcon, label: 'Splash-proof photos' },
        { icon: DirectionsBusIcon, label: 'Private transport' },
        { icon: RestaurantIcon, label: 'Snack options' },
      ],
    },
    'py-shopping-cde': {
      duration: 'Half-day',
      level: 'Easy',
      season: 'All year',
      family: 'Yes',
      features: [
        { icon: ShoppingBagIcon, label: 'Curated shopping' },
        { icon: BorderAllIcon, label: 'Border crossing' },
        { icon: DirectionsBusIcon, label: 'Private transport' },
        { icon: HailIcon, label: 'Trusted stores guidance' },
        { icon: CameraAltIcon, label: 'City viewpoints' },
        { icon: RestaurantIcon, label: 'Coffee breaks' },
      ],
    },
    'py-saltos-monday': {
      duration: 'Half-day',
      level: 'Easy',
      season: 'All year',
      family: 'Yes',
      features: [
        { icon: ParkIcon, label: 'Scenic viewpoints' },
        { icon: BorderAllIcon, label: 'Border crossing' },
        { icon: DirectionsBusIcon, label: 'Private transport' },
        { icon: CameraAltIcon, label: 'Photo spots' },
        { icon: RestaurantIcon, label: 'Local snacks' },
        { icon: HailIcon, label: 'Flexible schedule' },
      ],
    },
  }

  const baseMeta = TOUR_META[tour.id] || { duration: 'Half-day', level: 'Easy', season: 'All year', family: 'Yes', features: [] }
  const meta = {
    ...baseMeta,
    duration: override?.duration || baseMeta.duration,
    level: override?.level || baseMeta.level,
    season: override?.season || baseMeta.season,
    family: override?.family || baseMeta.family,
  }

  // Build a suggested itinerary with animated reveal
  const hasBorder = /^(ar|py)-/.test(tour.id)
  const isNight = tour.id === 'br-itaipu-night'
  const isBoat = tour.id === 'ar-gran-aventura'
  const itinerary = [
    { icon: HailIcon, title: 'Hotel pickup', desc: 'Private pickup at your accommodation with our local guide.' },
    hasBorder ? { icon: BorderAllIcon, title: 'Border crossing', desc: 'Assistance with documents and smooth crossing to the destination country.' } : null,
    isNight ? { icon: NightlifeIcon, title: 'Itaipu by night', desc: 'Enjoy the illuminated dam with narrated highlights and photo stops.' } : null,
    isBoat ? { icon: DirectionsBoatIcon, title: 'Gran Aventura boat', desc: 'Jungle 4x4 + speedboat approaching the falls for a thrilling splash.' } : null,
    !isNight && !isBoat && tour.id.includes('iguacu') ? { icon: ParkIcon, title: 'National Park trails', desc: 'Walk boardwalks and platforms to the best viewpoints, including Devil’s Throat (when available).' } : null,
    { icon: CameraAltIcon, title: 'Photo moments', desc: 'Guided stops at iconic angles and hidden vantage points.' },
    { icon: RestaurantIcon, title: 'Breaks & snacks', desc: 'Time for restroom, coffee, and local bites as desired.' },
    { icon: DirectionsBusIcon, title: 'Return transfer', desc: 'Drop-off at your hotel or preferred address.' },
  ].filter(Boolean)

  // IntersectionObserver to reveal items smoothly
  const useReveal = () => {
    const [shown, setShown] = React.useState(false)
    const ref = React.useRef(null)
    React.useEffect(() => {
      const el = ref.current
      if (!el) return
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setShown(true)
        })
      }, { threshold: 0.15 })
      io.observe(el)
      return () => io.disconnect()
    }, [])
    return { ref, shown }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Seo
        title={`${title} — Guará Travel`}
        description={intro}
        canonical={`${site}/tours/${id}`}
        image={override?.image || hero}
        type="website"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'TouristTrip',
          name: title,
          description: intro,
          image: override?.image || hero || undefined,
          touristType: country,
        }}
      />
      <Header />

      {/* Hero */}
      <Box sx={{ position: 'relative', height: { xs: 260, md: 420 }, overflow: 'hidden', bgcolor: '#000' }}>
        <Box component="img" src={hero} alt="" sx={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} />
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.55), rgba(0,0,0,.15))' }} />
        <Box sx={{ position: 'absolute', bottom: 24, left: { xs: 16, md: 48 }, right: 16 }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', px: 1.25, py: 0.5, borderRadius: 999, bgcolor: 'rgba(255,115,0,.12)', color: colors.accent, fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: .6 }}>{country}</Box>
          <Typography component="h1" sx={{ mt: 1, fontFamily: fonts.headings, color: '#fff', fontSize: { xs: 32, md: 48 }, letterSpacing: 1.2 }}>{title}</Typography>
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ px: { xs: 2.5, md: 6 }, py: { xs: 4.5, md: 7 } }}>
        <Grid container spacing={{ xs: 4, md: 6 }}>
          <Grid size={{ xs: 12, md: 8 }}>
            {/* Intro paragraph */}
            <Typography sx={{ color: 'text.secondary', mb: 2.5 }}>{intro}</Typography>

            {/* Quick stats chips */}
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 3 }}>
              <Chip icon={<AccessTimeIcon />} label={`Duration: ${meta.duration}`} sx={{ bgcolor: alpha('#FF7300', 0.08), borderColor: alpha('#FF7300', 0.2), border: '1px solid', fontWeight: 600 }} />
              <Chip icon={<HikingIcon />} label={`Level: ${meta.level}`} sx={{ bgcolor: alpha('#111', 0.04), borderColor: alpha('#111', 0.12), border: '1px solid' }} />
              <Chip icon={<EventAvailableIcon />} label={`Best season: ${meta.season}`} sx={{ bgcolor: alpha('#0ea5e9', 0.08), borderColor: alpha('#0ea5e9', 0.2), border: '1px solid' }} />
              <Chip icon={<FamilyRestroomIcon />} label={`Family: ${meta.family}`} sx={{ bgcolor: alpha('#22c55e', 0.08), borderColor: alpha('#22c55e', 0.2), border: '1px solid' }} />
            </Stack>

            {/* Features grid */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(3, 1fr)' }, gap: 2, mb: 4 }}>
              {meta.features.map((f, i) => (
                <Box key={i} sx={{ p: 2, borderRadius: 2, border: '1px solid', borderColor: '#eee', bgcolor: '#fff', transition: 'transform .2s ease, box-shadow .2s ease', boxShadow: '0 4px 12px rgba(0,0,0,0.04)', '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 10px 24px rgba(0,0,0,0.10)' } }}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    {f.icon ? React.createElement(f.icon, { sx: { color: colors.accent } }) : null}
                    <Typography sx={{ fontWeight: 600 }}>{f.label}</Typography>
                  </Stack>
                </Box>
              ))}
            </Box>

            {/* Border requirements banner for cross-border tours */}
            {hasBorder && (
              <Box sx={{ mb: 3, p: 2, borderRadius: 2, bgcolor: alpha('#0ea5e9', 0.06), border: `1px dashed ${alpha('#0ea5e9', 0.3)}` }}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <WarningAmberIcon sx={{ color: '#0ea5e9' }} />
                  <Typography sx={{ color: 'text.secondary' }}>{t('tours.borderNotice', 'Border crossing: bring passport/ID as required. We help with documents and timing.')}</Typography>
                </Stack>
              </Box>
            )}

            {/* Itinerary timeline */}
            <Typography sx={{ fontFamily: fonts.headings, letterSpacing: 1, textTransform: 'uppercase', fontSize: 14, color: colors.accent, mb: 1.5 }}>{t('tours.sections.itinerary', 'Itinerary')}</Typography>
            <Box sx={{ position: 'relative', pl: { xs: 1, md: 2 }, borderLeft: { xs: '2px solid #eee', md: '2px solid #eee' }, mb: 4 }}>
              {itinerary.map((step, idx) => {
                const { ref, shown } = useReveal()
                return (
                  <Box key={idx} ref={ref} sx={{ position: 'relative', ml: { xs: 1, md: 2 }, py: 2, opacity: shown ? 1 : 0, transform: shown ? 'none' : 'translateY(12px)', transition: 'all .45s ease', transitionDelay: `${idx * 60}ms` }}>
                    <Box sx={{ position: 'absolute', left: { xs: -22, md: -28 }, top: 14, width: 28, height: 28, borderRadius: '50%', background: alpha(colors.accent, 0.12), border: `2px solid ${alpha(colors.accent, 0.4)}`, display: 'grid', placeItems: 'center' }}>
                      {step.icon ? React.createElement(step.icon, { sx: { fontSize: 16, color: colors.accent } }) : null}
                    </Box>
                    <Typography sx={{ fontWeight: 700 }}>{step.title}</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{step.desc}</Typography>
                  </Box>
                )
              })}
            </Box>

            {/* Highlights and tips */}
            <Typography sx={{ fontFamily: fonts.headings, letterSpacing: 1, textTransform: 'uppercase', fontSize: 14, color: colors.accent, mb: 1.25 }}>{t('tours.sections.highlights')}</Typography>
            <Stack component="ul" spacing={1} sx={{ mt: 0, pl: 0, listStyle: 'none', mb: 3 }}>
              {highlights.map((h, i) => (
                <Stack key={i} component="li" direction="row" spacing={1.25} alignItems="flex-start">
                  <CheckCircleIcon sx={{ color: colors.accent, mt: '2px' }} />
                  <Typography sx={{ color: 'text.primary' }}>{h}</Typography>
                </Stack>
              ))}
            </Stack>
            <Divider sx={{ my: 3 }} />
            <Typography sx={{ fontFamily: fonts.headings, letterSpacing: 1, textTransform: 'uppercase', fontSize: 14, color: colors.accent, mb: 1.25 }}>{t('tours.sections.tips')}</Typography>
            <Stack component="ul" spacing={1} sx={{ mt: 0, pl: 0, listStyle: 'none' }}>
              {tips.map((h, i) => (
                <Stack key={i} component="li" direction="row" spacing={1.25} alignItems="flex-start">
                  <CameraAltIcon sx={{ color: alpha('#111', 0.5), mt: '2px' }} />
                  <Typography sx={{ color: 'text.secondary' }}>{h}</Typography>
                </Stack>
              ))}
            </Stack>

            {/* Optional add-ons */}
            <Box sx={{ mt: 4 }}>
              <Typography sx={{ fontFamily: fonts.headings, letterSpacing: 1, textTransform: 'uppercase', fontSize: 14, color: colors.accent, mb: 1.25 }}>{t('tours.sections.addons', 'Optional add-ons')}</Typography>
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                {(() => {
                  const common = [
                    { label: 'Professional photo session', icon: CameraAltIcon },
                    { label: 'Flexible start time', icon: AccessTimeIcon },
                  ]
                  const extras =
                    tour.id === 'br-iguacu-br' ? [ { label: 'Parque das Aves', icon: ParkIcon }, { label: 'Helicopter flight', icon: CameraAltIcon } ] :
                    tour.id === 'ar-iguacu-ar' ? [ { label: 'Train to Devil’s Throat', icon: ParkIcon }, { label: 'Rain poncho kit', icon: HikingIcon } ] :
                    tour.id === 'ar-gran-aventura' ? [ { label: 'Dry bag rental', icon: DirectionsBoatIcon }, { label: 'Photo/video pack', icon: CameraAltIcon } ] :
                    tour.id === 'py-shopping-cde' ? [ { label: 'Personal shopper', icon: ShoppingBagIcon }, { label: 'Currency exchange stop', icon: ShoppingBagIcon } ] :
                    tour.id === 'py-saltos-monday' ? [ { label: 'Zipline park nearby', icon: ParkIcon }, { label: 'Drone footage (where allowed)', icon: CameraAltIcon } ] : []
                  return [...extras, ...common].map((a, i) => (
                    <Chip key={i} icon={a.icon ? React.createElement(a.icon) : <AddCircleOutlineIcon />} label={a.label} variant="outlined" sx={{ borderColor: alpha('#111', 0.18) }} />
                  ))
                })()}
              </Stack>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ position: { md: 'sticky' }, top: { md: 24 }, p: 2.5, borderRadius: 2, border: '1px solid #eee', bgcolor: '#fff', boxShadow: '0 6px 18px rgba(0,0,0,0.06)' }}>
              <Typography sx={{ fontWeight: 700, mb: 1.25 }}>{t('tours.sections.includes')}</Typography>
              <Stack component="ul" spacing={1} sx={{ mt: 0, pl: 0, listStyle: 'none' }}>
                {includes.map((it, i) => (
                  <Stack key={i} component="li" direction="row" spacing={1.25} alignItems="flex-start">
                    <CheckCircleIcon sx={{ color: colors.accent, mt: '2px' }} />
                    <Typography sx={{ color: 'text.primary' }}>{it}</Typography>
                  </Stack>
                ))}
              </Stack>
              {/* Not included - generic info to set expectations */}
              <Typography sx={{ fontWeight: 700, mt: 2 }}>{t('tours.sections.notIncluded', 'Not included')}</Typography>
              <Stack component="ul" spacing={1} sx={{ mt: 0.5, pl: 0, listStyle: 'none' }}>
                <Stack component="li" direction="row" spacing={1.25} alignItems="flex-start">
                  <CancelIcon sx={{ color: alpha('#111', 0.5), mt: '2px' }} />
                  <Typography sx={{ color: 'text.secondary' }}>{t('tours.notIncluded.ticketsMeals', 'Park tickets and meals unless noted')}</Typography>
                </Stack>
                {hasBorder && (
                  <Stack component="li" direction="row" spacing={1.25} alignItems="flex-start">
                    <CancelIcon sx={{ color: alpha('#111', 0.5), mt: '2px' }} />
                    <Typography sx={{ color: 'text.secondary' }}>{t('tours.notIncluded.borderFees', 'Border fees, if applicable')}</Typography>
                  </Stack>
                )}
              </Stack>
              <Button variant="contained" fullWidth onClick={() => setCalOpen(true)} sx={{ mt: 2, bgcolor: colors.accent, '&:hover': { bgcolor: '#ff7f14' } }}>{t('tours.cta.plan')}</Button>
              <Button component={RouterLink} to="/tours" fullWidth sx={{ mt: 1 }}>{t('tours.cta.backToList')}</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Footer />
      {/* Calendly modal */}
      <CalendlyDialog open={calOpen} onClose={() => setCalOpen(false)} url={CALENDLY_URL} locale={i18n.language} />
      {/* Sticky CTA on mobile for better conversion */}
      <Box sx={{ display: { xs: 'block', md: 'none' }, position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 10, p: 1.25, background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.9) 40%, #fff 100%)', borderTop: '1px solid #eee' }}>
        <Button fullWidth variant="contained" onClick={() => setCalOpen(true)} sx={{ bgcolor: colors.accent, '&:hover': { bgcolor: '#ff7f14' } }}>{t('tours.cta.plan')}</Button>
      </Box>
    </ThemeProvider>
  )
}
