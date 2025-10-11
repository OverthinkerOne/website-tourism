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
import Divider from '@mui/material/Divider'
import { colors, fonts, sizes } from '../theme/tokens.js'
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled'
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle'
import { useTranslation } from 'react-i18next'

export default function AboutPage() {
  const { t } = useTranslation()
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />

      {/* Section 1: Video + Text side-by-side */}
      <Box component="section" sx={{ px: { xs: 2, sm: 3, md: 6 }, py: { xs: 6, md: 10 } }}>
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="stretch">
          {/* Left: Video */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                position: 'relative',
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                aspectRatio: '16 / 9',
                bgcolor: '#000',
              }}
           >
              <video
                src="/images/videos/about.mp4"
                controls
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                poster="/images/macuco.jpeg"
              />
            </Box>
          </Grid>

          {/* Right: Texts */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'center' }}>
              <Typography component="h1" sx={{ fontFamily: fonts.headings, fontSize: { xs: 36, md: 52 }, lineHeight: 1, letterSpacing: 1.2 }}>
                {t('about.title')}
              </Typography>
              <Typography sx={{ fontSize: { xs: 16, md: 18 }, color: 'text.secondary' }}>
                {t('about.intro.p1')}
              </Typography>
              <Typography sx={{ fontSize: { xs: 16, md: 18 }, color: 'text.secondary' }}>
                {t('about.intro.p2')}
              </Typography>
              <Box>
                <Typography sx={{ fontFamily: fonts.headings, letterSpacing: 1, textTransform: 'uppercase', fontSize: 14, color: colors.accent, mb: 1 }}>
                  {t('about.differentials.title')}
                </Typography>
                <ul style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--mui-palette-text-secondary)' }}>
                  {t('about.differentials.items', { returnObjects: true }).map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Section 2: Our transports */}
      <Box component="section" sx={{ py: { xs: 6, md: 10 }, bgcolor: '#0e0e0e' }}>
        <Box sx={{ px: { xs: 2, sm: 3, md: 6 } }}>
          <Typography component="h2" sx={{ fontFamily: fonts.headings, color: '#fff', fontSize: { xs: 30, md: 44 }, letterSpacing: 1.2, mb: 3 }}>
            {t('about.transports.title')}
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.85)', maxWidth: 900, mb: 4, fontSize: { xs: 16, md: 18 } }}>
            {t('about.transports.desc')}
          </Typography>

          <Grid container spacing={{ xs: 3, md: 4 }}>
            {/* Carros executivos */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ p: 3, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 1.25 }}>
                  <DirectionsCarFilledIcon sx={{ color: colors.accent, fontSize: 28 }} />
                <Typography sx={{ color: '#fff', fontFamily: fonts.headings, fontSize: 22, letterSpacing: 1, mb: 1 }}>
                  {t('about.transports.cars.title')}
                </Typography>
                </Box>
                <Typography sx={{ color: 'rgba(255,255,255,0.85)' }}>
                  {t('about.transports.cars.desc')}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {t('about.transports.cars.chips', { returnObjects: true }).map((chip) => (
                    <Box key={chip} sx={{ color: colors.accent, border: '1px solid rgba(255,115,0,.35)', borderRadius: 10, px: 1.2, py: 0.4, fontSize: 12 }}>
                      {chip}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>

            {/* Vans */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ p: 3, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 1.25 }}>
                  <AirportShuttleIcon sx={{ color: colors.accent, fontSize: 28 }} />
                <Typography sx={{ color: '#fff', fontFamily: fonts.headings, fontSize: 22, letterSpacing: 1, mb: 1 }}>
                  {t('about.transports.vans.title')}
                </Typography>
                </Box>
                <Typography sx={{ color: 'rgba(255,255,255,0.85)' }}>
                  {t('about.transports.vans.desc')}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {t('about.transports.vans.chips', { returnObjects: true }).map((chip) => (
                    <Box key={chip} sx={{ color: colors.accent, border: '1px solid rgba(255,115,0,.35)', borderRadius: 10, px: 1.2, py: 0.4, fontSize: 12 }}>
                      {chip}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Footer />
    </ThemeProvider>
  )
}
