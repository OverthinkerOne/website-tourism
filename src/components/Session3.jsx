import React from 'react'
import { Box } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import Typography from '@mui/material/Typography'
import { fonts } from '../theme/tokens.js'
import { useTranslation } from 'react-i18next'

export default function Session3() {
  const { t } = useTranslation()
  const [openSet, setOpenSet] = React.useState(new Set())

  const toggle = (idx) => {
    setOpenSet((prev) => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
  }

  const paragraphs = [
    t('session3.left.p1'),
    t('session3.left.p2'),
    t('session3.left.p3'),
    t('session3.left.p4'),
    t('session3.left.p5'),
    t('session3.left.p6'),
    t('session3.left.p7'),
  ]

  return (
    <Box component="section" sx={{ position: 'relative', width: '100%', bgcolor: '#fff' }}>
      <Box sx={{ width: 'min(1200px, 94vw)', mx: 'auto', py: { xs: 6, md: 10 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 3, md: 6 },
            alignItems: 'start',
          }}
        >
          {/* Left column: texts */}
          <Box>
            <Typography
              component="p"
              sx={{
                fontFamily: fonts.headings,
                fontSize: 24,
                fontWeight: 400,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: '#5F5F5F',
                lineHeight: 1.1,
                mb: { xs: 2, md: 3 },
              }}
            >
              {t('session3.left.overline')}
            </Typography>
            <Typography
              component="h2"
              id="session3-title"
              sx={{
                m: 0,
                fontFamily: fonts.headings,
                fontSize: { xs: 40, md: 48 },
                fontWeight: 400,
                letterSpacing: 0,
                textTransform: 'uppercase',
                color: '#000',
                lineHeight: 1.05,
                mb: 2,
              }}
            >
              {t('session3.left.title')}
            </Typography>

            <Box aria-labelledby="session3-title">
              {paragraphs.map((text, idx) => (
                <Typography
                  key={idx}
                  component="p"
                  sx={{
                    fontFamily: 'Kumbh Sans, system-ui, sans-serif',
                    fontSize: 20,
                    fontWeight: 400,
                    color: '#000',
                    lineHeight: 1.6,
                    mb: 2,
                  }}
                >
                  {text}
                </Typography>
              ))}
            </Box>
          </Box>

          {/* Right column: top card and accordion */}
          <Box>
            <Box
              sx={{
                bgcolor: '#FFF',
                border: '1px solid #D9D9D9',
                borderRadius: '20px',
                width: { xs: '100%', md: '66.6667%' },
                p: { xs: 2, md: 3 },
              }}
            >
              {/* Row 1: icon + title */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                <Box component="img" src="/images/icons/private-guided.svg" alt="" aria-hidden sx={{ width: 28, height: 28 }} />
                <Typography
                  sx={{
                    fontFamily: 'Kumbh Sans, system-ui, sans-serif',
                    fontSize: 24,
                    fontWeight: 700,
                    textTransform: 'capitalize',
                    color: '#000',
                  }}
                >
                  {t('session3.right.card1.title')}
                </Typography>
              </Box>

              {/* Row 2: text */}
              <Typography
                sx={{
                  fontFamily: 'Kumbh Sans, system-ui, sans-serif',
                  fontSize: 16,
                  fontWeight: 500,
                  color: '#000',
                  lineHeight: 1.5,
                  mb: 2,
                }}
              >
                {t('session3.right.card1.text')}
              </Typography>

              {/* Row 3: CTA */}
              <Box
                component="button"
                type="button"
                aria-label={t('session3.right.card1.cta')}
                style={{
                  all: 'unset',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                  width: '50%',
                  alignSelf: 'flex-start',
                  backgroundColor: '#D9D9D9',
                  borderRadius: 10,
                  padding: '12px 14px',
                  cursor: 'pointer',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Kumbh Sans, system-ui, sans-serif',
                    fontSize: 14,
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    color: '#000',
                  }}
                >
                  {t('session3.right.card1.cta')}
                </Typography>
                <Box component="img" src="/images/icons/right-arrow.svg" alt="" aria-hidden style={{ width: 20, height: 20 }} />
              </Box>
            </Box>

            {/* Accordion list */}
            <Box sx={{ mt: 2, p: 0, bgcolor: '#FFF', width: '100%' }}>
              {[
                { key: 'iguassu', icon: '/images/s3-icons/game-icons_waterfall.svg' },
                { key: 'adventure', icon: '/images/s3-icons/004-adventure-tours 1.svg' },
                { key: 'winery', icon: '/images/s3-icons/06-winery-tours 1.svg' },
                { key: 'shopping', icon: '/images/s3-icons/iconamoon_shopping-bag-thin.svg' },
                { key: 'culture', icon: '/images/s3-icons/arcticons_google-arts-and-culture.svg' },
              ].map((item, idx) => {
                const isOpen = openSet.has(idx)
                const title = t(`session3.right.accordion.${item.key}.title`)
                const desc = t(`session3.right.accordion.${item.key}.desc`)
                const ctrlId = `s3-acc-${idx}`
                return (
                  <Box
                    key={item.key}
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'auto 1fr auto',
                      alignItems: 'center',
                      gap: 2,
                      px: { xs: 2, md: 2.5 },
                      py: 1.25,
                      bgcolor: '#FFF',
                      m: 0,
                      // unified group border: left/right always; top for outer edge and separators; bottom only on last
                      borderLeft: '1px solid #D9D9D9',
                      borderRight: '1px solid #D9D9D9',
                      borderTop: '1px solid #D9D9D9',
                      // radii only for first and last
                      borderRadius: 0,
                      '&:first-of-type': { borderTopLeftRadius: '10px', borderTopRightRadius: '10px' },
                      '&:last-of-type': { borderBottom: '1px solid #D9D9D9', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' },
                    }}
                  >
                    <Box component="img" src={item.icon} alt="" aria-hidden sx={{ width: 28, height: 28 }} />
                    <Typography sx={{ fontFamily: 'Kumbh Sans, system-ui, sans-serif', fontSize: 24, fontWeight: 700, textTransform: 'capitalize', color: '#000' }}>
                      {title}
                    </Typography>
                    <Box
                      component="button"
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={ctrlId}
                      onClick={() => toggle(idx)}
                      style={{ all: 'unset', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, cursor: 'pointer' }}
                    >
                      <Box component="img" src="/images/s3-icons/plus.svg" alt="" aria-hidden sx={{ width: 20, height: 20, transition: 'transform .2s ease', transform: isOpen ? 'rotate(45deg)' : 'none' }} />
                    </Box>
                    <Collapse in={isOpen} sx={{ gridColumn: '1 / -1' }}>
                      <Box id={ctrlId} sx={{ pt: 1, px: 0.5, pb: 1 }}>
                        <Typography sx={{ fontFamily: 'Kumbh Sans, system-ui, sans-serif', fontSize: 16, fontWeight: 500, color: '#000', lineHeight: 1.6 }}>
                          {desc}
                        </Typography>
                      </Box>
                    </Collapse>
                  </Box>
                )
              })}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
