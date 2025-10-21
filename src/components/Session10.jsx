import React from 'react'
import { Box, Button, Link, Typography } from '@mui/material'
import { fonts, colors } from '../theme/tokens.js'
import { CALENDLY_URL } from '../config/calendly.js'
import CalendlyDialog from './CalendlyDialog.jsx'
import { useTranslation } from 'react-i18next'

export default function Session10() {
  const { t, i18n } = useTranslation()
  const [calOpen, setCalOpen] = React.useState(false)
  return (
    <Box component="section" sx={{ position: 'relative', width: '100%', minHeight: { xs: '60vh', md: '70vh' }, overflow: 'hidden', display: 'grid', placeItems: 'center' }}>
      {/* Background image */}
      <Box component="img" src="/images/macuco.jpeg" alt="background" sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
      {/* Overlay for contrast */}
      <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 100%)', zIndex: 1 }} />

      {/* Content */}
  <Box sx={{ position: 'relative', zIndex: 2, display: 'grid', placeItems: 'center', textAlign: 'center', px: 2 }}>
        {/* Title */}
        <Typography component="h2" sx={{
          m: 0,
          fontFamily: fonts.headings,
          fontWeight: 400,
          fontSize: { xs: 36, sm: 44, md: 56 },
          lineHeight: 1.05,
          textTransform: 'uppercase',
          color: '#fff',
          textShadow: '0 2px 10px rgba(0,0,0,0.35)'
        }}>
          {t('session10.title')}
        </Typography>

        {/* CTA */}
        <Box sx={{ mt: { xs: 3, md: 4 } }}>
          <Button
            onClick={() => setCalOpen(true)}
            sx={{
              px: { xs: 3.5, md: 4 },
              py: { xs: 1.5, md: 1.75 },
              borderRadius: 999,
              textTransform: 'uppercase',
              letterSpacing: '0.2em', // 20%
              fontFamily: fonts.headings,
              fontSize: { xs: 14, md: 16 },
              fontWeight: 400,
              color: '#000',
              background: '#fff',
              boxShadow: '0 8px 18px rgba(255,255,255,0.25), 0 2px 8px rgba(0,0,0,0.16)',
              transition: 'transform .18s ease, box-shadow .18s ease, background .18s ease, color .18s ease',
              '&:hover': {
                transform: 'translateY(-1px) scale(1.02)',
                background: colors.accent,
                color: '#fff',
                boxShadow: '0 14px 30px rgba(255,115,0,0.60), 0 6px 14px rgba(0,0,0,0.22), 0 0 22px rgba(255,115,0,0.45)'
              },
              '&:active': { transform: 'translateY(0) scale(0.99)' },
              '&:focus-visible': { outline: 'none', boxShadow: '0 0 0 3px rgba(255,255,255,0.45), 0 10px 22px rgba(0,0,0,0.28)' },
            }}
          >
            {t('session10.cta')}
          </Button>
        </Box>

        {/* Sub legend with Calendly link (text + logo both react on hover) */}
  <Link href={`${CALENDLY_URL}?locale=${encodeURIComponent(i18n.language || '')}`} target="_blank" rel="noopener noreferrer" underline="none"
              sx={{
                mt: { xs: 2, md: 2.5 },
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                fontFamily: 'Kumbh Sans, system-ui, sans-serif',
                fontWeight: 600,
                fontSize: { xs: 14, md: 15 },
                color: '#fff',
                transition: 'color .18s ease',
                '& img': {
                  height: 18,
                  filter: 'brightness(12)',
                  transition: 'filter .18s ease',
                },
                '&:hover': {
                  color: colors.accent,
                },
                '&:hover img': {
                  // approximate orange tint via css filter
                  filter: 'invert(53%) sepia(94%) saturate(1512%) hue-rotate(1deg) brightness(101%) contrast(103%)',
                }
              }}>
          {t('session10.calendlyPrefix')}
          <Box component="img" src="/images/calendly.png" alt="Calendly" />
        </Link>
  <CalendlyDialog open={calOpen} onClose={() => setCalOpen(false)} url={CALENDLY_URL} locale={i18n.language} />
      </Box>
    </Box>
  )
}
