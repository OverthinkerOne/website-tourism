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
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { fonts, colors } from '../theme/tokens.js'
import { useTranslation } from 'react-i18next'
import { findImage } from '../lib/imageProvider.js'
import { Link as RouterLink } from 'react-router-dom'
import { getAllRestaurants, getRestaurantOverride, getSiteUrl } from '../lib/content.js'
import Seo from '../components/Seo.jsx'

export default function GastronomyPage() {
  const { t } = useTranslation()
  const site = getSiteUrl()
  const [images, setImages] = React.useState({})
  const [list, setList] = React.useState(() => getAllRestaurants())

  React.useEffect(() => {
    let alive = true
    ;(async () => {
      const restaurants = getAllRestaurants()
      setList(restaurants)
      const entries = await Promise.all(
        restaurants.map(async (r) => {
          const override = getRestaurantOverride(r.id) || r._override
          const staticUrl = override?.image || r.image
          if (staticUrl) return [r.id, staticUrl]
          const query = `${override?.name || r.name || r.id} ${override?.city || r.city || ''}`.trim()
          const url = await findImage({ query, orientation: 'landscape' })
          return [r.id, url]
        })
      )
      if (alive) setImages(Object.fromEntries(entries))
    })()
    return () => { alive = false }
  }, [])

  React.useEffect(() => {
    const onStorage = () => setList(getAllRestaurants())
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
  <Seo title={t('seo.gastronomy.title', 'Gastronomy — Best Restaurants in the Region')} description={t('seo.gastronomy.description', 'Our curated selection of restaurants and local flavors around Guaratuba and Serra do Mar.')} canonical={`${site}/gastronomy`} />
      <Header />

      <Box component="section" sx={{ px: { xs: 2, sm: 3, md: 6 }, py: { xs: 6, md: 10 } }}>
        <Typography component="h1" sx={{ fontFamily: fonts.headings, fontSize: { xs: 36, md: 52 }, lineHeight: 1, letterSpacing: 1.2, textAlign: 'center', mb: 2 }}>
          {t('gastronomy.list.title', 'Local gastronomy')}
        </Typography>
        <Typography sx={{ textAlign: 'center', color: 'text.secondary', maxWidth: 900, mx: 'auto', mb: 5 }}>
          {t('gastronomy.list.subtitle', 'Our curated list of restaurants and cafés to try on your trip.')}
        </Typography>

        <Grid container spacing={{ xs: 3, md: 4 }}>
          {list.map((r) => {
            const override = getRestaurantOverride(r.id) || r._override
            const name = override?.name || r.name || r.id
            const city = override?.city || r.city || 'Guaratuba'
            const cuisines = override?.cuisine || r.cuisine || []
            return (
              <Grid key={r.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Box sx={{ borderRadius: 2, overflow: 'hidden', border: '1px solid #eee', bgcolor: '#fff', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Box
                    component="img"
                    src={images[r.id] || r.image || '/images/restaurants/placeholder.svg'}
                    alt={name}
                    onError={(e) => { e.currentTarget.src = '/images/restaurants/placeholder.svg' }}
                    sx={{ width: '100%', height: 200, objectFit: 'cover', display: 'block', bgcolor: '#000' }}
                  />
                  <Box sx={{ p: 2 }}>
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', px: 1, py: 0.25, borderRadius: 999, bgcolor: 'rgba(255,115,0,.12)', color: colors.accent, fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: .6 }}>{city}</Box>
                    <Typography sx={{ mt: 1.25, fontWeight: 700, fontSize: 18 }}>{name}</Typography>
                    <Stack direction="row" spacing={0.5} useFlexGap flexWrap="wrap" sx={{ mt: 0.5 }}>
                      {(Array.isArray(cuisines) ? cuisines : [cuisines]).filter(Boolean).slice(0, 3).map((c) => (
                        <Chip key={c} size="small" label={c} sx={{ bgcolor: 'rgba(17,17,17,.05)' }} />
                      ))}
                    </Stack>
                    <Typography sx={{ color: 'text.secondary', mt: 0.75 }}>{override?.short || r.short || ''}</Typography>
                    <Button component={RouterLink} to={`/gastronomy/${r.id}`} variant="contained" sx={{ mt: 2, bgcolor: colors.accent, '&:hover': { bgcolor: '#ff7f14' } }}>
                      {t('gastronomy.cta.viewDetails', 'View details')}
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
