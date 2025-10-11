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
import { fonts, colors } from '../theme/tokens.js'
import { useTranslation } from 'react-i18next'
import TOURS from '../data/tours.js'
import { findImage } from '../lib/imageProvider.js'

export default function TourDetailPage() {
  const { id } = useParams()
  const { t } = useTranslation()
  const tour = React.useMemo(() => TOURS.find((x) => x.id === id), [id])
  const [hero, setHero] = React.useState('')
  React.useEffect(() => {
    let alive = true
    ;(async () => {
      if (!tour) return
      const url = await findImage({ query: tour.query || id, orientation: 'landscape' })
      if (alive) setHero(url)
    })()
    return () => { alive = false }
  }, [tour, id])

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

  const title = t(`session6.titles.${tour.id}`)
  const cc = tour.countryCode
  const country = t(`session6.countries.${cc}`)
  const intro = t(`tours.details.${tour.id}.intro`)
  const highlights = t(`tours.details.${tour.id}.highlights`, { returnObjects: true })
  const includes = t(`tours.details.${tour.id}.includes`, { returnObjects: true })
  const tips = t(`tours.details.${tour.id}.tips`, { returnObjects: true })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
      <Box sx={{ px: { xs: 2, sm: 3, md: 6 }, py: { xs: 5, md: 8 } }}>
        <Grid container spacing={{ xs: 4, md: 6 }}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography sx={{ color: 'text.secondary', mb: 3 }}>{intro}</Typography>
            <Typography sx={{ fontFamily: fonts.headings, letterSpacing: 1, textTransform: 'uppercase', fontSize: 14, color: colors.accent, mb: 1 }}>{t('tours.sections.highlights')}</Typography>
            <ul style={{ marginTop: 0, paddingLeft: '1.1rem' }}>
              {highlights.map((h, i) => (<li key={i}>{h}</li>))}
            </ul>
            <Divider sx={{ my: 3 }} />
            <Typography sx={{ fontFamily: fonts.headings, letterSpacing: 1, textTransform: 'uppercase', fontSize: 14, color: colors.accent, mb: 1 }}>{t('tours.sections.tips')}</Typography>
            <ul style={{ marginTop: 0, paddingLeft: '1.1rem' }}>
              {tips.map((h, i) => (<li key={i}>{h}</li>))}
            </ul>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ p: 2.5, borderRadius: 2, border: '1px solid #eee', bgcolor: '#fff' }}>
              <Typography sx={{ fontWeight: 700, mb: 1.5 }}>{t('tours.sections.includes')}</Typography>
              <ul style={{ marginTop: 0, paddingLeft: '1.1rem' }}>
                {includes.map((it, i) => (<li key={i}>{it}</li>))}
              </ul>
              <Button variant="contained" fullWidth sx={{ mt: 2, bgcolor: colors.accent, '&:hover': { bgcolor: '#ff7f14' } }}>{t('tours.cta.plan')}</Button>
              <Button component={RouterLink} to="/tours" fullWidth sx={{ mt: 1 }}>{t('tours.cta.backToList')}</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Footer />
    </ThemeProvider>
  )
}
