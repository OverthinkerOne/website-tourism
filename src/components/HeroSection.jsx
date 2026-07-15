import React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { alpha } from '@mui/material/styles'
import { keyframes } from '@emotion/react'
import { HeroCtaButton } from './GuaraButton.jsx'
import { colors, fonts } from '../theme/tokens.js'
import { CALENDLY_URL } from '../config/calendly.js'
import CalendlyDialog from './CalendlyDialog.jsx'
import { useTranslation } from 'react-i18next'

export default function HeroSection() {
  const titleRef = React.useRef(null)
  const [titleWidth, setTitleWidth] = React.useState(null)
  const { t, i18n } = useTranslation()
  const [calOpen, setCalOpen] = React.useState(false)
  const [videoError, setVideoError] = React.useState(false)
  const [videoLoaded, setVideoLoaded] = React.useState(false)
  const videoRef = React.useRef(null)


  const animatedGradient = keyframes`
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
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

  // Timeout for video loading
  React.useEffect(() => {
    if (!videoLoaded && !videoError) {
      const timer = setTimeout(() => {
        if (!videoLoaded) {
          console.warn('[Video] Video took too long to load, using fallback')
          setVideoError(true)
        }
      }, 8000) // 8 second timeout
      return () => clearTimeout(timer)
    }
  }, [videoLoaded, videoError])

  return (
  <Box component="section" sx={{ position: 'relative', height: '100vh', minHeight: 640, width: '100%', overflow: 'hidden' }}>
      {/* Fallback: Animated gradient background (always shown as base) */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(-45deg, #1a472a, #2d5a3d, #0f3620, #1a472a)',
          backgroundSize: '400% 400%',
          animation: `${animatedGradient} 15s ease infinite`,
          zIndex: 0,
        }}
      />

      {/* Background video (overlay on top of gradient, if loads successfully) */}
      {!videoError && (
        <Box
          ref={videoRef}
          component="video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedMetadata={(event) => {
            setVideoLoaded(true)
            event.currentTarget.play().catch(() => {})
          }}
          onCanPlayThrough={() => setVideoLoaded(true)}
          onError={() => {
            console.error('[Video] Failed to load video')
            setVideoError(true)
          }}
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            backgroundColor: '#0f3620',
            zIndex: videoLoaded ? 1 : -1,
            opacity: videoLoaded ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
          }}
        >
          <source src="/images/videos/14088619_3840_2160_60fps_compressed.mp4" type="video/mp4" />
        </Box>
      )}

      {/* Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.25))',
          zIndex: 2,
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
          // Add a bit more bottom padding so content isn’t too close to the lower paper edge
          pb: { xs: '84px', sm: '96px', md: '128px' },
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
          <HeroCtaButton
            onClick={() => setCalOpen(true)}
            ariaLabel={t('hero.cta.ariaLabel')}
          >
            <Stack direction="row" alignItems="center" spacing={{ xs: 1.5, md: 2 }}>
              <Box sx={{ textAlign: 'left' }}>
                <Typography sx={{ fontFamily: 'Kumbh Sans, system-ui, sans-serif', fontWeight: 800, fontSize: 20, color: '#FFFFFF', textTransform: 'uppercase', lineHeight: 1 }}>
                  {t('hero.cta.title')}
                </Typography>
                <Typography sx={{ fontFamily: 'Kumbh Sans, system-ui, sans-serif', fontWeight: 700, fontSize: 12, color: '#FFFFFF', textTransform: 'uppercase', lineHeight: 1, mt: 0.5 }}>
                  {t('hero.cta.subtitle')}
                </Typography>
              </Box>
              <Box component="img" src="/images/icons/calendar.svg" alt={t('hero.cta.iconAlt')}
                   sx={{ width: 28, height: 28 }} />
            </Stack>
          </HeroCtaButton>
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
  <CalendlyDialog open={calOpen} onClose={() => setCalOpen(false)} url={CALENDLY_URL} locale={i18n.language} />
    </Box>
  )
}
