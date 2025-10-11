import React from 'react'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import Collapse from '@mui/material/Collapse'
import { fonts } from '../theme/tokens.js'
import { useTranslation } from 'react-i18next'

export default function Session8() {
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
    { key: 'q1' },
    { key: 'q2' },
    { key: 'q3' },
    { key: 'q4' },
    { key: 'q5' },
    { key: 'q6' },
  ]

  return (
    <Box component="section" sx={{ position: 'relative', width: '100%', bgcolor: '#fff' }}>
      <Box sx={{ position: 'relative', width: 'min(1200px, 94vw)', mx: 'auto', py: { xs: 10, md: 14 } }}>
        {/* Title */}
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 }, px: 2 }}>
          <Typography
            component="h2"
            sx={{
              m: 0,
              fontFamily: fonts.headings,
              fontSize: { xs: 36, md: 48 },
              fontWeight: 400,
              textTransform: 'uppercase',
              color: '#000',
              lineHeight: 1.05,
            }}
          >
            {t('session8.title')}
          </Typography>
        </Box>

        {/* Accordion container (same pattern as S4) */}
        <Box sx={{ width: 'min(900px, 96vw)', mx: 'auto' }}>
          <Box sx={{ bgcolor: 'rgba(255,255,255,0.92)', color: '#000', border: '1px solid #D9D9D9', borderRadius: '10px', overflow: 'hidden' }}>
            {items.map((item, idx) => {
              const isOpen = openSet.has(idx)
              const q = t(`session8.items.${item.key}.question`)
              const a = t(`session8.items.${item.key}.answer`)
              const ctrlId = `s8-acc-${idx}`
              return (
                <Box
                  key={item.key}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    alignItems: 'center',
                    gap: 2,
                    px: { xs: 2, md: 2.5 },
                    py: 1.25,
                    borderTop: idx === 0 ? 'none' : '1px solid #D9D9D9',
                  }}
                >
                  <Typography sx={{ fontFamily: 'Kumbh Sans, system-ui, sans-serif', fontSize: 18, fontWeight: 700, color: '#000' }}>
                    {q}
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
                    <Box id={ctrlId} sx={{ pt: 1, pb: 1 }}>
                      <Typography sx={{ fontFamily: 'Kumbh Sans, system-ui, sans-serif', fontSize: 16, fontWeight: 500, color: '#000', lineHeight: 1.6 }}>
                        {a}
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
  )
}
