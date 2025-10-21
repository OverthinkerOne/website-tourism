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
import { findImage } from '../lib/imageProvider.js'
import Seo from '../components/Seo.jsx'
import { getSiteUrl, getAllRestaurants, getRestaurantOverride } from '../lib/content.js'
import CalendlyDialog from '../components/CalendlyDialog.jsx'
import { CALENDLY_URL } from '../config/calendly.js'

import RoomIcon from '@mui/icons-material/Room'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import PublicIcon from '@mui/icons-material/Public'
import InstagramIcon from '@mui/icons-material/Instagram'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import StarIcon from '@mui/icons-material/Star'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'

export default function RestaurantDetailPage() {
  const { id } = useParams()
  const { t, i18n } = useTranslation()

  const restaurant = React.useMemo(() => {
    const merged = getAllRestaurants()
    return merged.find((x) => x.id === id) || { id, name: id }
  }, [id])

  const site = getSiteUrl()
  const [hero, setHero] = React.useState('/images/restaurants/placeholder.svg')
  const [calOpen, setCalOpen] = React.useState(false)
  const override = getRestaurantOverride(id) || restaurant._override

  const toArray = React.useCallback((val) => {
    if (!val) return []
    if (Array.isArray(val)) return val
    if (typeof val === 'string') {
      return val.split(/\r?\n|,|;|\u2022|\u25CF|\u25E6/g).map((s) => s.trim()).filter(Boolean)
    }
    return []
  }, [])

  React.useEffect(() => {
    let alive = true
    ;(async () => {
      const query = `${override?.name || restaurant.name || id} ${override?.city || restaurant.city || ''}`.trim()
      const url = override?.image || restaurant.image || await findImage({ query, orientation: 'landscape' })
      if (alive) setHero(url)
    })()
    return () => { alive = false }
  }, [restaurant, id, override?.image, override?.name])

  const name = override?.name || restaurant.name || id
  const city = override?.city || restaurant.city || 'Guaratuba'
  const cuisine = toArray(override?.cuisine ?? restaurant.cuisine)
  const priceRange = override?.priceRange || restaurant.priceRange || '$$'
  const price = override?.price || restaurant.price || ''
  const intro = override?.intro || restaurant.intro || ''
  const highlights = toArray(override?.highlights ?? restaurant.highlights)
  const services = toArray(override?.services ?? restaurant.services)
  const tips = toArray(override?.tips ?? restaurant.tips)
  const address = override?.address || restaurant.address || ''
  const phone = override?.phone || restaurant.phone || ''
  const website = override?.website || restaurant.website || ''
  const instagram = override?.instagram || restaurant.instagram || ''
  const openingHours = override?.openingHours || restaurant.openingHours || ''
  const rating = override?.rating ?? restaurant.rating

  // Build a precise map query: prefer specific address if provided; else use "<name>, <city>"
  const isGenericAddress = !address || /^(foz do iguaçu|puerto iguazú|parque nacional do iguaçu)/i.test(address)
  const mapQuery = (isGenericAddress ? `${name}, ${city}` : `${name}, ${address}`).trim()
  const hasMapUrl = mapQuery ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}` : undefined
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name,
    servesCuisine: cuisine,
    image: override?.image || (hero && !String(hero).includes('/images/restaurants/placeholder.svg') ? hero : undefined),
    address,
    telephone: phone,
    priceRange,
    openingHours,
    ...(hasMapUrl ? { hasMap: hasMapUrl } : {}),
    ...(rating ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: rating, reviewCount: 0 } } : {}),
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Seo
        title={`${name} — Gastronomy`}
        description={intro}
        canonical={`${site}/gastronomy/${id}`}
        image={override?.image || (hero && !String(hero).includes('/images/restaurants/placeholder.svg') ? hero : undefined)}
        type="website"
        jsonLd={jsonLd}
      />
      <Header />

      {/* Hero */}
      <Box sx={{ position: 'relative', height: { xs: 260, md: 420 }, overflow: 'hidden', bgcolor: '#000' }}>
        <Box component="img" src={hero || '/images/restaurants/placeholder.svg'} alt="" onError={(e) => { e.currentTarget.src = '/images/restaurants/placeholder.svg' }} sx={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} />
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.55), rgba(0,0,0,.15))' }} />
        <Box sx={{ position: 'absolute', bottom: 24, left: { xs: 16, md: 48 }, right: 16 }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', px: 1.25, py: 0.5, borderRadius: 999, bgcolor: 'rgba(255,115,0,.12)', color: colors.accent, fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: .6 }}>{city}</Box>
          <Typography component="h1" sx={{ mt: 1, fontFamily: fonts.headings, color: '#fff', fontSize: { xs: 32, md: 48 }, letterSpacing: 1.2 }}>{name}</Typography>
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ px: { xs: 2.5, md: 6 }, py: { xs: 4.5, md: 7 } }}>
        <Grid container spacing={{ xs: 4, md: 6 }}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography sx={{ color: 'text.secondary', mb: 2.5 }}>{intro}</Typography>

            {/* Quick chips */}
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 3 }}>
              <Chip icon={<RestaurantMenuIcon />} label={cuisine.join(' • ') || 'Local cuisine'} sx={{ bgcolor: alpha('#111', 0.04), borderColor: alpha('#111', 0.12), border: '1px solid' }} />
              <Chip icon={<AccessTimeIcon />} label={`Hours: ${openingHours || 'Check'}`} sx={{ bgcolor: alpha('#0ea5e9', 0.08), borderColor: alpha('#0ea5e9', 0.2), border: '1px solid' }} />
              <Chip icon={<StarIcon />} label={`Rating: ${rating ?? '—'}`} sx={{ bgcolor: alpha('#22c55e', 0.08), borderColor: alpha('#22c55e', 0.2), border: '1px solid' }} />
              {price ? (
                <Chip icon={<MonetizationOnIcon />} label={`From: ${price} / person`} sx={{ bgcolor: alpha('#FF7300', 0.08), borderColor: alpha('#FF7300', 0.2), border: '1px solid', fontWeight: 600 }} />
              ) : null}
            </Stack>

            {/* Assinaturas / Destaques */}
            {highlights.length > 0 && (
              <>
                <Typography sx={{ fontFamily: fonts.headings, letterSpacing: 1, textTransform: 'uppercase', fontSize: 14, color: colors.accent, mb: 1.25 }}>{t('gastronomy.sections.highlights', 'Signature dishes')}</Typography>
                <Stack component="ul" spacing={1} sx={{ mt: 0, pl: 0, listStyle: 'none', mb: 3 }}>
                  {highlights.map((h, i) => (
                    <Stack key={i} component="li" direction="row" spacing={1.25} alignItems="flex-start">
                      <StarIcon sx={{ color: colors.accent, mt: '2px' }} />
                      <Typography sx={{ color: 'text.primary' }}>{h}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </>
            )}

            {/* Serviços */}
            {services.length > 0 && (
              <>
                <Typography sx={{ fontFamily: fonts.headings, letterSpacing: 1, textTransform: 'uppercase', fontSize: 14, color: colors.accent, mb: 1.25 }}>{t('gastronomy.sections.services', 'Services & amenities')}</Typography>
                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 3 }}>
                  {services.map((s, i) => (
                    <Chip key={i} label={s} variant="outlined" sx={{ borderColor: alpha('#111', 0.18) }} />
                  ))}
                </Stack>
              </>
            )}

            {/* Dicas */}
            {tips.length > 0 && (
              <>
                <Typography sx={{ fontFamily: fonts.headings, letterSpacing: 1, textTransform: 'uppercase', fontSize: 14, color: colors.accent, mb: 1.25 }}>{t('gastronomy.sections.tips', 'Tips')}</Typography>
                <Stack component="ul" spacing={1} sx={{ mt: 0, pl: 0, listStyle: 'none' }}>
                  {tips.map((h, i) => (
                    <Stack key={i} component="li" direction="row" spacing={1.25} alignItems="flex-start">
                      <TipsAndUpdatesIcon sx={{ color: alpha('#111', 0.5), mt: '2px' }} />
                      <Typography sx={{ color: 'text.secondary' }}>{h}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </>
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ position: { md: 'sticky' }, top: { md: 24 }, p: 2.5, borderRadius: 2, border: '1px solid #eee', bgcolor: '#fff', boxShadow: '0 6px 18px rgba(0,0,0,0.06)' }}>
              <Typography sx={{ fontWeight: 700, mb: 1.25 }}>{t('gastronomy.sections.info', 'Information')}</Typography>
              <Stack spacing={1.25}>
                {price ? (
                  <Stack direction="row" spacing={1.25} alignItems="center">
                    <MonetizationOnIcon sx={{ color: colors.accent }} />
                    <Typography>{`From ${price} per person`}</Typography>
                  </Stack>
                ) : null}
                {address && (
                  <Stack direction="row" spacing={1.25} alignItems="center">
                    <RoomIcon sx={{ color: colors.accent }} />
                    <Typography>{address}</Typography>
                  </Stack>
                )}
                {phone && (
                  <Stack direction="row" spacing={1.25} alignItems="center">
                    <LocalPhoneIcon sx={{ color: colors.accent }} />
                    <Typography>{phone}</Typography>
                  </Stack>
                )}
                {openingHours && (
                  <Stack direction="row" spacing={1.25} alignItems="center">
                    <AccessTimeIcon sx={{ color: colors.accent }} />
                    <Typography>{openingHours}</Typography>
                  </Stack>
                )}
              </Stack>
              <Divider sx={{ my: 2 }} />
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                {website && (
                  <Button href={website} target="_blank" rel="noopener" variant="outlined" startIcon={<PublicIcon />}>Site</Button>
                )}
                {instagram && (
                  <Button href={instagram} target="_blank" rel="noopener" variant="outlined" startIcon={<InstagramIcon />}>Instagram</Button>
                )}
              </Stack>
              {mapQuery ? (
                <Box sx={{ mt: 2, borderRadius: 2, overflow: 'hidden', border: '1px solid #eee' }}>
                  <Box
                    component="iframe"
                    title={`Map — ${name}`}
                    src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&hl=${encodeURIComponent(i18n.language || 'en')}&z=15&output=embed`}
                    width="100%"
                    height="220"
                    sx={{ display: 'block', border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </Box>
              ) : null}
              <Button variant="contained" fullWidth onClick={() => setCalOpen(true)} sx={{ mt: 2, bgcolor: colors.accent, '&:hover': { bgcolor: '#ff7f14' } }}>{t('tours.cta.plan', 'Plan your trip')}</Button>
              <Button component={RouterLink} to="/gastronomy" fullWidth sx={{ mt: 2 }}>{t('gastronomy.cta.backToList', 'Back to list')}</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Footer />
      {/* Calendly modal for planning */}
      <CalendlyDialog open={calOpen} onClose={() => setCalOpen(false)} url={CALENDLY_URL} locale={i18n.language} />
      {/* Sticky CTA on mobile for better conversion */}
      <Box sx={{ display: { xs: 'block', md: 'none' }, position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 10, p: 1.25, background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.9) 40%, #fff 100%)', borderTop: '1px solid #eee' }}>
        <Button fullWidth variant="contained" onClick={() => setCalOpen(true)} sx={{ bgcolor: colors.accent, '&:hover': { bgcolor: '#ff7f14' } }}>{t('tours.cta.plan', 'Plan your trip')}</Button>
      </Box>
    </ThemeProvider>
  )
}
