import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '../theme.js'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { fonts, colors } from '../theme/tokens.js'
import { useTranslation } from 'react-i18next'
import TOURS from '../data/tours.js'
import { findImage } from '../lib/imageProvider.js'
import { Link as RouterLink } from 'react-router-dom'
import TOUR_IMAGES from '../data/tourImages.js'
import { getAllTours, getTourOverride } from '../lib/content.js'
import Seo from '../components/Seo.jsx'
import { getSiteUrl } from '../lib/content.js'

export default function PrivateToursPage() {
  const { t } = useTranslation()
  const site = getSiteUrl()
  const [images, setImages] = React.useState({})
  const [tours, setTours] = React.useState(() => getAllTours())
  React.useEffect(() => {
    let alive = true
    ;(async () => {
      const list = getAllTours()
      setTours(list)
      const entries = await Promise.all(
        list.map(async (tour) => {
          const override = getTourOverride(tour.id) || tour._override
          const staticUrl = override?.image || TOUR_IMAGES[tour.id]
          if (staticUrl) return [tour.id, staticUrl]
          const url = await findImage({ query: override?.title || tour.query || tour.id, orientation: 'landscape' })
          return [tour.id, url]
        })
      )
      if (alive) setImages(Object.fromEntries(entries))
    })()
    return () => { alive = false }
  }, [])
  // Reflect Admin edits live
  React.useEffect(() => {
    const onStorage = () => setTours(getAllTours())
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Seo title={t('seo.tours.title', 'Private Guided Tours — Guará Travel')} description={t('seo.tours.description', 'Browse our curated private tours across Brazil, Argentina and Paraguay around Iguazu.')} canonical={`${site}/tours`} />
      <Header />

      <Box component="section" sx={{ px: { xs: 2, sm: 3, md: 6 }, py: { xs: 6, md: 10 } }}>
        <Typography component="h1" sx={{ fontFamily: fonts.headings, fontSize: { xs: 36, md: 52 }, lineHeight: 1, letterSpacing: 1.2, textAlign: 'center', mb: 2 }}>
          {t('tours.list.title')}
        </Typography>
        <Typography sx={{ textAlign: 'center', color: 'text.secondary', maxWidth: 900, mx: 'auto', mb: 5 }}>
          {t('tours.list.subtitle')}
        </Typography>

        <Grid container spacing={{ xs: 3, md: 4 }}>
          {tours.map((tour) => {
            const override = getTourOverride(tour.id) || tour._override
            const cc = override?.countryCode || tour.countryCode || 'br'
            const country = t(`session6.countries.${cc}`, (cc || 'br').toUpperCase())
            const title = override?.title || t(`session6.titles.${tour.id}`, override?.title || tour.title || tour.id)
            return (
              <Grid key={tour.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Box sx={{ borderRadius: 2, overflow: 'hidden', border: '1px solid #eee', bgcolor: '#fff', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Box component="img" src={images[tour.id]} alt={title} onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${encodeURIComponent(title)}/800/600` }} sx={{ width: '100%', height: 200, objectFit: 'cover', display: 'block', bgcolor: '#000' }} />
                  <Box sx={{ p: 2 }}>
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', px: 1, py: 0.25, borderRadius: 999, bgcolor: 'rgba(255,115,0,.12)', color: colors.accent, fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: .6 }}>{country}</Box>
                    <Typography sx={{ mt: 1.25, fontWeight: 700, fontSize: 18 }}>{title}</Typography>
                    <Typography sx={{ color: 'text.secondary', mt: 0.75 }}>{override?.short || t(`tours.details.${tour.id}.short`, override?.short || tour.short || '')}</Typography>
                    <Button component={RouterLink} to={`/tours/${tour.id}`} variant="contained" sx={{ mt: 2, bgcolor: colors.accent, '&:hover': { bgcolor: '#ff7f14' } }}>
                      {t('tours.cta.viewDetails')}
                    </Button>
                  </Box>
                </Box>
              </Grid>
            )
          })}
        </Grid>
      </Box>

      <Footer />
    </ThemeProvider>
  )
}
