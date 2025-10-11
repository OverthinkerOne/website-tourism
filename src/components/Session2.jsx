import React from 'react'
import { Box, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { colors, fonts } from '../theme/tokens.js'

const images = [
  '/images/carousel-s2/SaveClip.App_476343054_18032969774569592_7526527612979803973_n.jpg',
  '/images/carousel-s2/SaveClip.App_484814131_18037139819569592_3245375217564991692_n.jpg',
  '/images/carousel-s2/SaveClip.App_485270468_18037646876569592_7826056654123938580_n.jpg',
  '/images/carousel-s2/SaveClip.App_486090904_18037646765569592_8273965451699820646_n.jpg',
]

export default function Session2() {
  const { t } = useTranslation()
  const [index, setIndex] = React.useState(0)

  React.useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <Box component="section" sx={{ position: 'relative', width: '100%', height: { xs: 'auto', md: '120vh' }, minHeight: { xs: '100vh', md: 'auto' }, overflow: 'hidden', bgcolor: '#000' }}>
      {/* Background carousel */}
      {images.map((src, i) => (
        <Box
          key={src + i}
          component="img"
          src={src}
          alt={t('session2.carouselAlt', { index: i + 1 })}
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: i === index ? 1 : 0,
            transition: 'opacity 800ms ease',
          }}
        />
      ))}

  {/* Dark overlay for contrast */}
  <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55))', zIndex: 1 }} />

      {/* Top paper edge pinned to top limit */}
      <Box
        component="img"
        src="/images/paper.png"
        alt=""
        sx={{ position: 'absolute', top: -1, left: 0, right: 0, width: '100%', height: 'auto', zIndex: 2, pointerEvents: 'none', userSelect: 'none', transform: 'scaleY(-1)' }}
        aria-hidden
      />

      {/* Bottom paper edge pinned to bottom limit */}
      <Box
        component="img"
        src="/images/paper.png"
        alt=""
        sx={{ position: 'absolute', bottom: -1, left: 0, right: 0, width: '100%', height: 'auto', zIndex: 2, pointerEvents: 'none', userSelect: 'none' }}
        aria-hidden
      />

      {/* Content layer */}
      <Box sx={{ position: 'relative', zIndex: 3, inset: 0, color: '#fff', width: '100%', height: '100%' }}>
    {/* Top title/subtitle block */}
  <Box sx={{ position: { xs: 'relative', md: 'absolute' }, top: { xs: 'auto', md: 140 }, pt: { xs: 8, sm: 10 }, left: 0, right: 0, display: 'grid', placeItems: 'center', px: 2 }}>
          <Box sx={{ textAlign: 'center', maxWidth: 1100 }}>
            <Box component="h2" sx={{
              m: 0,
              fontFamily: 'Bebas Neue, Roboto, Arial, sans-serif',
              fontWeight: 400,
              fontSize: { xs: 32, sm: 36, md: 48 },
              textTransform: 'uppercase',
              color: '#fff',
              lineHeight: 1.05,
              mb: 0.5,
            }}>
              {t('session2.title')}
            </Box>
            <Box component="p" sx={{
              m: 0,
              fontFamily: 'Kumbh Sans, system-ui, sans-serif',
              fontWeight: 500,
              fontSize: { xs: 16, sm: 18, md: 24 },
              textTransform: 'lowercase',
              color: '#fff',
              lineHeight: 1.25,
              opacity: 0.95,
              mx: 'auto',
              maxWidth: { xs: 560, md: 'none' },
              textAlign: 'center',
            }}>
              {t('session2.subtitle')}
            </Box>
          </Box>

        </Box>

    {/* Bottom features grid */}
  <Box sx={{ position: { xs: 'relative', md: 'absolute' }, bottom: { xs: 'auto', md: 180 }, left: 0, right: 0, px: { xs: 2, md: 3 }, py: { xs: 6, sm: 8, md: 0 }, mt: { xs: 3, sm: 4 } }}>
          <Box sx={{
            width: 'min(1200px, 94vw)',
            mx: 'auto',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
            gap: { xs: 2, md: 3 },
            pb: { xs: 2, md: 5 },
          }}>
            {[
              {
                icon: '/images/s2-icons/icon-1.svg',
                title: t('session2.features.f1_title'),
                text: t('session2.features.f1_text'),
              },
              {
                icon: '/images/s2-icons/icon-2.svg',
                title: t('session2.features.f2_title'),
                text: t('session2.features.f2_text'),
              },
              {
                icon: '/images/s2-icons/icon-3.svg',
                title: t('session2.features.f3_title'),
                text: t('session2.features.f3_text'),
              },
              {
                icon: '/images/s2-icons/icon-4.svg',
                title: t('session2.features.f4_title'),
                text: t('session2.features.f4_text'),
              },
            ].map((item) => (
              <Box
                key={item.title}
                sx={{
                  color: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <Box
                  component="img"
                  src={item.icon}
                  alt="icon"
                  sx={{ width: { xs: 28, md: 36 }, height: { xs: 28, md: 36 }, mb: 1.25, filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.4))' }}
                />
                <Box
                  component="h3"
                  sx={{
                    m: 0,
                    fontFamily: 'Kumbh Sans, system-ui, sans-serif',
                    fontWeight: 700,
                    fontSize: { xs: 15, md: 16 },
                    color: '#fff',
                    textTransform: 'capitalize',
                    lineHeight: 1.2,
                  }}
                >
                  {item.title}
                </Box>
                <Box
                  component="p"
                  sx={{
                    m: 0,
                    mt: 0.75,
                    fontFamily: 'Kumbh Sans, system-ui, sans-serif',
                    fontWeight: 500,
                    fontSize: { xs: 14, md: 16 },
                    color: '#fff',
                    textTransform: 'lowercase',
                    lineHeight: 1.35,
                    opacity: 0.95,
                    maxWidth: { xs: 260, md: 260 },
                  }}
                >
                  {item.text}
                </Box>
              </Box>
            ))}
          </Box>
          {/* CTA inside the features container -> below the internal boxes */}
          <Box sx={{ display: 'grid', placeItems: 'center', mt: { xs: 3, md: 3 } }}>
            <Button
              component="a"
              href="/about"
              aria-label={t('nav.about_us')}
              endIcon={<ArrowForwardIosIcon sx={{ fontSize: 16 }} />}
              sx={{
                px: { xs: 2.75, md: 3.25 },
                py: { xs: 1.1, md: 1.25 },
                borderRadius: 999,
                textTransform: 'uppercase',
                letterSpacing: { xs: '0.14em', md: '0.18em' },
                fontFamily: fonts.headings,
                fontSize: { xs: 14, sm: 15, md: 16 },
                fontWeight: 400,
                color: '#fff',
                background: 'linear-gradient(180deg, #FF8A33 0%, #FF7300 100%)',
                boxShadow: '0 8px 18px rgba(255,115,0,0.40), 0 2px 8px rgba(0,0,0,0.16)',
                transition: 'transform .18s ease, box-shadow .18s ease, background .18s ease',
                '&:hover': {
                  transform: 'translateY(-1px) scale(1.02)',
                  background: 'linear-gradient(180deg, #FFA45F 0%, #FF6A00 100%)',
                  boxShadow: '0 14px 30px rgba(255,115,0,0.60), 0 6px 14px rgba(0,0,0,0.22), 0 0 22px rgba(255,115,0,0.45)'
                },
                '&:active': { transform: 'translateY(0) scale(0.99)' },
                '&:focus-visible': { outline: 'none', boxShadow: '0 0 0 3px rgba(255,115,0,0.35), 0 10px 22px rgba(0,0,0,0.28)' },
              }}
            >
              {t('nav.about_us')}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
