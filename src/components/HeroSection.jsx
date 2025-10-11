import React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { alpha } from '@mui/material/styles'
import { keyframes } from '@emotion/react'
import { colors, fonts } from '../theme/tokens.js'
import { useTranslation } from 'react-i18next'

export default function HeroSection() {
  const titleRef = React.useRef(null)
  const [titleWidth, setTitleWidth] = React.useState(null)
  const { t } = useTranslation()

  const pulseGlow = keyframes`
    0% { opacity: .45; transform: scale(1); }
    50% { opacity: .95; transform: scale(1.04); }
    100% { opacity: .45; transform: scale(1); }
  `

  React.useLayoutEffect(() => {
    const measure = () => {
      if (titleRef.current) setTitleWidth(titleRef.current.offsetWidth)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // Recalculate widths when text changes due to i18n switch
  React.useEffect(() => {
    if (titleRef.current) setTitleWidth(titleRef.current.offsetWidth)
  }, [t('hero.title')])

  return (
    <Box component="section" sx={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden' }}>
      {/* Background video */}
      <Box
        component="video"
        autoPlay
        muted
        loop
        playsInline
        src="/images/videos/14088619_3840_2160_60fps.mp4"
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      />

      {/* Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.25))',
          zIndex: 1,
        }}
      />

      {/* Centered content */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
          px: 2,
          textAlign: 'center',
          boxSizing: 'border-box',
          pb: { xs: '44px', md: '63px' },
          transform: { xs: 'translateY(-20px)', md: 'translateY(-36px)', lg: 'translateY(-44px)' },
        }}
      >
        <Box sx={{ display: 'inline-block', maxWidth: { xs: '100%', md: '90%' } }}>
          {/* Certification icon above title */}
          <Box
            component="img"
            src="/images/certification.png"
            alt={t('hero.certificationAlt')}
            sx={{
              display: 'block',
              height: { xs: 90, sm: 110, md: 160 },
              width: 'auto',
              mx: 'auto',
              mb: { xs: 1, md: 1.5 },
              userSelect: 'none',
            }}
          />

          {/* Title */}
          <Typography
            component="h1"
            sx={{
              fontFamily: fonts.headings,
              textTransform: 'uppercase',
              letterSpacing: 1.2,
              color: '#FFFFFF',
              fontSize: { xs: 40, sm: 56, md: 88, lg: 104 },
              lineHeight: 1,
              textShadow: '0 2px 8px rgba(0,0,0,0.45)',
              whiteSpace: { xs: 'normal', sm: 'nowrap' },
              wordBreak: 'break-word',
              overflowWrap: 'anywhere',
              hyphens: 'auto',
            }}
            ref={titleRef}
          >
            {t('hero.title')}
          </Typography>

          {/* Subtitle: swap to simple text on mobile; show decorative bars from md+ */}
          <Box sx={{ mt: { xs: 2, md: 2.5 } }}>
            {/* Mobile/simple variant */}
            <Typography
              sx={{
                display: { xs: 'block', md: 'none' },
                fontFamily: fonts.headings,
                textTransform: 'uppercase',
                letterSpacing: 1.1,
                color: '#FFFFFF',
                fontSize: { xs: 13, sm: 14 },
                lineHeight: 1.2,
              }}
            >
              {t('hero.subtitle')}
            </Typography>
            {/* Desktop/bars variant */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0, width: titleWidth ? `${titleWidth}px` : 'auto', mx: 'auto' }}>
              <Box sx={{ flex: 1, height: 2, bgcolor: '#FFFFFF', opacity: 0.9, mr: '40px' }} />
              <Typography
                sx={{
                  fontFamily: fonts.headings,
                  textTransform: 'uppercase',
                  letterSpacing: 1.2,
                  color: '#FFFFFF',
                  fontSize: { md: 18 },
                  lineHeight: 1,
                  whiteSpace: 'nowrap',
                }}
              >
                {t('hero.subtitle')}
              </Typography>
              <Box sx={{ flex: 1, height: 2, bgcolor: '#FFFFFF', opacity: 0.9, ml: '40px' }} />
            </Box>
          </Box>

          {/* CTA Button (enhanced) */}
          <Button
            variant="contained"
            sx={{
              mt: { xs: 3, md: 4 },
              px: { xs: 3.25, md: 4.25 },
              py: { xs: 2, md: 2.25 },
              borderRadius: 999,
              position: 'relative',
              overflow: 'visible',
              color: '#FFFFFF',
              textTransform: 'none',
              background: 'linear-gradient(180deg, #FF8A33 0%, #FF7300 100%)',
              boxShadow: '0 12px 26px rgba(255,115,0,0.48), 0 6px 14px rgba(0,0,0,0.28)',
              transition: 'transform .2s ease, box-shadow .2s ease, background .2s ease',
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: 0,
                borderRadius: 'inherit',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 45%)',
                pointerEvents: 'none',
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                inset: -18,
                borderRadius: 'inherit',
                background: 'radial-gradient(circle, rgba(255,115,0,0.65) 0%, rgba(255,115,0,0.0) 70%)',
                filter: 'blur(18px)',
                zIndex: -1,
                pointerEvents: 'none',
                animation: `${pulseGlow} 2.6s ease-in-out infinite`,
              },
              '&:hover': {
                transform: 'translateY(-2px) scale(1.02)',
                background: 'linear-gradient(180deg, #FFA45F 0%, #FF6A00 100%)',
                boxShadow: '0 16px 34px rgba(255,115,0,0.60), 0 8px 18px rgba(0,0,0,0.30), 0 0 22px rgba(255,115,0,0.45)',
              },
              '&:active': {
                transform: 'translateY(0) scale(0.99)',
                boxShadow: '0 10px 22px rgba(255,115,0,0.46), 0 4px 12px rgba(0,0,0,0.26)'
              },
              '&:focus-visible': {
                outline: 'none',
                boxShadow: '0 0 0 3px rgba(255,115,0,0.35), 0 12px 26px rgba(255,115,0,0.45)'
              },
            }}
            aria-label={t('hero.cta.ariaLabel')}
          >
            <Stack direction="row" alignItems="center" spacing={{ xs: 1.5, md: 2 }}>
              <Box sx={{ textAlign: 'left' }}>
                <Typography sx={{ fontFamily: 'Kumbh Sans, system-ui, sans-serif', fontWeight: 800, fontSize: 20, color: '#FFFFFF', textTransform: 'uppercase', lineHeight: 1 }}>
                  {t('hero.cta.title')}
                </Typography>
                <Typography sx={{ fontFamily: 'Kumbh Sans, system-ui, sans-serif', fontWeight: 700, fontSize: 12, color: '#C2C2C2', textTransform: 'uppercase', lineHeight: 1, mt: 0.5 }}>
                  {t('hero.cta.subtitle')}
                </Typography>
              </Box>
              <Box component="img" src="/images/icons/calendar.svg" alt={t('hero.cta.iconAlt')}
                   sx={{ width: 28, height: 28 }} />
            </Stack>
          </Button>
        </Box>
      </Box>

      {/* Bottom paper overlay above everything */}
      <Box
        component="img"
        src="/images/paper.png"
        alt=""
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: -1,
          width: '100%',
          height: 'auto',
          display: 'block',
          zIndex: 3,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
        aria-hidden
      />
    </Box>
  )
}
