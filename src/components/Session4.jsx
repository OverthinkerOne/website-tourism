import React from 'react'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import Collapse from '@mui/material/Collapse'
import { fonts } from '../theme/tokens.js'
import { useTranslation } from 'react-i18next'

export default function Session4() {
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

  const items = [
    { key: 'step1', icon: '/images/s4-icons/one.svg' },
    { key: 'step2', icon: '/images/s4-icons/two.svg' },
    { key: 'step3', icon: '/images/s4-icons/tree.svg' },
    { key: 'step4', icon: '/images/s4-icons/four.svg' },
  ]

  return (
  <Box component="section" sx={{ position: 'relative', width: '100%', bgcolor: '#000' }}>
      {/* Background image */}
      <Box component="img" src="/images/img-s4.png" alt="" aria-hidden
           sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />

      {/* Top/Bottom paper overlays exactly as in Session 2 */}
      <Box
        component="img"
        src="/images/paper.png"
        alt=""
        aria-hidden
        sx={{ position: 'absolute', top: -1, left: 0, right: 0, width: '100%', height: 'auto', zIndex: 2, pointerEvents: 'none', userSelect: 'none', transform: 'scaleY(-1)' }}
      />
      <Box
        component="img"
        src="/images/paper.png"
        alt=""
        aria-hidden
        sx={{ position: 'absolute', bottom: -1, left: 0, right: 0, width: '100%', height: 'auto', zIndex: 2, pointerEvents: 'none', userSelect: 'none' }}
      />

      {/* Content container */}
  <Box sx={{ position: 'relative', zIndex: 3, width: 'min(1200px, 94vw)', mx: 'auto', pt: { xs: 14, md: 20 }, pb: { xs: 18, md: 22 } }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
          <Box sx={{ width: 'min(600px, 90vw)', mr: 'auto' }}>
            <Box sx={{ bgcolor: 'rgba(255,255,255,0.9)', color: '#000', border: '1px solid #D9D9D9', borderRadius: '10px', overflow: 'hidden' }}>
              {/* Title inside the same box, above items */}
              <Box sx={{ px: { xs: 2, md: 2.5 }, py: { xs: 1.5, md: 2 } }}>
                <Typography
                  component="h2"
                  sx={{
                    m: 0,
                    fontFamily: fonts.headings,
                    fontSize: { xs: 40, md: 48 },
                    fontWeight: 400,
                    textTransform: 'uppercase',
                    color: '#000',
                    lineHeight: 1.05,
                  }}
                >
                  {t('session4.title')}
                </Typography>
              </Box>

              {/* Accordion items */}
              {items.map((item, idx) => {
                const isOpen = openSet.has(idx)
                const title = t(`session4.accordion.${item.key}`)
                const ctrlId = `s4-acc-${idx}`
                const desc = t(`session4.descriptions.${item.key}`)
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
                      borderTop: '1px solid #D9D9D9',
                    }}
                  >
                    <Box component="img" src={item.icon} alt="" aria-hidden sx={{ width: 28, height: 28 }} />
                    <Typography sx={{ fontFamily: 'Kumbh Sans, system-ui, sans-serif', fontSize: 20, fontWeight: 700, color: '#000' }}>
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
