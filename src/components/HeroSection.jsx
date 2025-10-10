import React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { alpha } from '@mui/material/styles'
import { colors, fonts } from '../theme/tokens.js'
import { useTranslation } from 'react-i18next'

export default function HeroSection() {
  const titleRef = React.useRef(null)
  const [titleWidth, setTitleWidth] = React.useState(null)
  const { t } = useTranslation()

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
    <Box component="section" sx={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden', mb: '100px' }}>
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
        }}
      >
        {/* Wrapper shrinks to the title width so side bars match title width */}
        <Box sx={{ display: 'inline-block', maxWidth: { xs: '100%', md: '90%' } }}>
          {/* Certification icon above title */}
          <Box
            component="img"
            src="/images/certification.png"
            alt="certification"
            sx={{
              display: 'block',
              height: { xs: 120, md: 160 },
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
              fontSize: { xs: 48, sm: 64, md: 88, lg: 104 },
              lineHeight: 1,
              textShadow: '0 2px 8px rgba(0,0,0,0.45)',
              whiteSpace: 'nowrap',
            }}
            ref={titleRef}
          >
            {t('hero.title')}
          </Typography>

          {/* Subtitle with side bars matching title width */}
          <Box sx={{ mt: { xs: 2, md: 2.5 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0, width: titleWidth ? `${titleWidth}px` : 'auto', mx: 'auto' }}>
              <Box sx={{ flex: 1, height: 2, bgcolor: '#FFFFFF', opacity: 0.9, mr: '40px' }} />
              <Typography
                sx={{
                  fontFamily: fonts.headings,
                  textTransform: 'uppercase',
                  letterSpacing: 1.2,
                  color: '#FFFFFF',
                  fontSize: { xs: 14, md: 18 },
                  lineHeight: 1,
                  whiteSpace: 'nowrap',
                }}
              >
                {t('hero.subtitle')}
              </Typography>
              <Box sx={{ flex: 1, height: 2, bgcolor: '#FFFFFF', opacity: 0.9, ml: '40px' }} />
            </Box>
          </Box>

          {/* CTA Button */}
          <Button
            variant="contained"
            sx={{
              mt: { xs: 3, md: 4 },
              px: { xs: 2.5, md: 3.5 },
              py: { xs: 1.25, md: 1.5 },
              borderRadius: 2.5,
              position: 'relative',
              overflow: 'hidden',
              color: '#FFFFFF',
              textTransform: 'none',
              // Glassy orange with subtle gradient
              background: (theme) => `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.38)} 0%, ${alpha(theme.palette.primary.main, 0.28)} 100%)`,
              border: '1px solid',
              borderColor: (theme) => alpha(theme.palette.primary.main, 0.65),
              boxShadow: (theme) => `0 10px 22px ${alpha('#000', 0.28)}, 0 0 0 1px ${alpha(theme.palette.primary.main, 0.08)} inset`,
              backdropFilter: 'saturate(180%) blur(8px)',
              transition: 'transform .2s ease, box-shadow .2s ease, background .2s ease, filter .2s ease',
              '&::after': {
                // top sheen highlight
                content: '""',
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 40%)',
                pointerEvents: 'none',
              },
              '&:hover': {
                transform: 'translateY(-2px) scale(1.01)',
                background: (theme) => `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.44)} 0%, ${alpha(theme.palette.primary.main, 0.34)} 100%)`,
                boxShadow: (theme) => `0 14px 30px ${alpha('#000', 0.34)}, 0 0 0 1px ${alpha(theme.palette.primary.main, 0.12)} inset, 0 0 18px ${alpha(theme.palette.primary.main, 0.28)}`,
              },
              '&:active': {
                transform: 'translateY(0) scale(0.99)',
                boxShadow: (theme) => `0 8px 18px ${alpha('#000', 0.28)}, 0 0 0 1px ${alpha(theme.palette.primary.main, 0.12)} inset`,
              },
              '&:focus-visible': {
                outline: 'none',
                boxShadow: (theme) => `0 0 0 3px ${alpha(theme.palette.primary.main, 0.35)}, 0 10px 22px ${alpha('#000', 0.28)}`,
              },
            }}
            aria-label="Schedule a call"
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
        alt="paper edge"
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: 'auto',
          display: 'block',
          zIndex: 3,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />
    </Box>
  )
}
