import React from 'react'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import { fonts, colors } from '../theme/tokens.js'
import { useTranslation } from 'react-i18next'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import HandshakeIcon from '@mui/icons-material/Handshake'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import SecurityIcon from '@mui/icons-material/Security'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'

const cardMeta = [
  { key: 'c1', Icon: AutoFixHighIcon },
  { key: 'c2', Icon: HandshakeIcon },
  { key: 'c3', Icon: EventAvailableIcon },
  { key: 'c4', Icon: SecurityIcon },
  { key: 'c5', Icon: SupportAgentIcon },
  { key: 'c6', Icon: EmojiEventsIcon },
]

export default function Session5() {
  const { t } = useTranslation()
  return (
    <Box component="section" sx={{ position: 'relative', width: '100%', bgcolor: '#fff' }}>
      <Box sx={{ position: 'relative', zIndex: 1, width: 'min(1200px, 94vw)', mx: 'auto', py: { xs: 8, md: 12 } }}>
        {/* Title */}
        <Typography
          component="h2"
          sx={{
            m: 0,
            mb: { xs: 4, md: 6 },
            textAlign: 'center',
            fontFamily: fonts.headings,
            fontWeight: 400,
            fontSize: { xs: 40, md: 56 },
            lineHeight: 1.05,
            textTransform: 'uppercase',
            color: '#000',
          }}
        >
          {t('session5.title')}
        </Typography>

        {/* Cards grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
            gap: { xs: 2.5, md: 3 },
          }}
        >
          {cardMeta.map(({ key, Icon }) => {
            const title = t(`session5.cards.${key}.title`)
            const desc = t(`session5.cards.${key}.desc`)
            return (
            <Box
              key={key}
              sx={{
                position: 'relative',
                p: { xs: 2.5, md: 3 },
                borderRadius: 2,
                bgcolor: '#F8D3B5',
                border: '1px solid #E9E9E9',
                transition: 'transform 220ms ease, box-shadow 220ms ease, background-color 220ms ease',
                willChange: 'transform',
                cursor: 'default',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  bgcolor: colors.accent,
                  boxShadow: `0 8px 28px ${colors.accentGlow2}, 0 2px 8px ${colors.accentGlow3}`,
                },
                '&:hover .card-icon, &:hover .card-title': {
                  color: '#fff',
                },
                '&:hover .card-desc': {
                  opacity: 1,
                  transform: 'translateY(0)',
                  color: '#fff',
                },
              }}
            >
              {/* Icon top, centered horizontally and within a fixed top area vertically */}
              <Box sx={{ display: 'grid', placeItems: 'center', height: 64, mb: 1 }}>
                <Icon className="card-icon" sx={{ fontSize: 36, color: colors.accent, transition: 'color 220ms ease' }} aria-hidden />
              </Box>

              {/* Title below the icon, centered */}
              <Typography
                className="card-title"
                sx={{
                  textAlign: 'center',
                  fontFamily: 'Kumbh Sans, system-ui, sans-serif',
                  fontWeight: 700,
                  fontSize: 18,
                  color: colors.accent,
                  transition: 'color 220ms ease',
                }}
              >
                {title}
              </Typography>

              <Typography
                className="card-desc"
                sx={{
                  mt: 1.25,
                  fontFamily: 'Kumbh Sans, system-ui, sans-serif',
                  fontWeight: 500,
                  fontSize: 15,
                  lineHeight: 1.5,
                  color: '#111',
                  textAlign: 'center',
                  opacity: 0,
                  transform: 'translateY(6px)',
                  transition: 'opacity 220ms ease, transform 220ms ease, color 220ms ease',
                }}
              >
                {desc}
              </Typography>
            </Box>
          )})}
        </Box>
      </Box>
    </Box>
  )
}
