import React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import { sizes, colors, fonts, i18nLanguages } from '../theme/tokens.js'
import TapeMarquee from './TapeMarquee.jsx'
import LanguageSelect from './LanguageSelect.jsx'
import { useTranslation } from 'react-i18next'

function Tape() {
  return (
    <Box
      component="img"
      src="/images/top-tape.svg"
      alt="top tape"
      sx={{ width: '100%', display: 'block', userSelect: 'none', pointerEvents: 'none' }}
    />
  )
}

export default function Header() {
  const { t, i18n } = useTranslation()
  const [lang, setLang] = React.useState(i18n.resolvedLanguage || 'en')
  const handleLang = (code) => {
    setLang(code)
    i18n.changeLanguage(code)
  }
  return (
    <Box component="section" sx={{ width: '100%' }}>
  <TapeMarquee direction="left" speedSec={sizes.marqueeVerySlowSec} />
      <Box
        component="header"
        sx={{
          height: sizes.headerHeight,
          width: '100%',
          bgcolor: colors.headerBg,
          boxSizing: 'border-box',
          px: { xs: 2, sm: 3, md: 4, lg: 6 },
          borderBottom: '1px solid',
          borderColor: 'divider',
          backdropFilter: 'saturate(180%) blur(8px)',
          position: 'relative',
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ height: 1 }}>
          {/* Left: Logo + Divider + Social icons */}
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box component="img" src="/images/dark-logo.svg" alt="logo" sx={{ height: sizes.logoHeight, width: 'auto' }} />
            <Divider orientation="vertical" sx={{
              height: `${sizes.headerHeight * sizes.dividerHeightPct}px`,
              alignSelf: 'center',
              borderRightWidth: sizes.dividerThickness,
              borderColor: 'divider',
            }} />
            <Stack direction="row" alignItems="center" spacing={1.5}>
                {['facebook', 'instagram', 'whatsapp', 'get-your-guide'].map((name) => (
                  <Box
                    key={name}
                    component="img"
                    src={`/images/icons/${name}.svg`}
                    alt={name}
                    sx={{ height: name === 'get-your-guide' ? sizes.iconSize * 3 : sizes.iconSize, width: 'auto' }}
                  />
                ))}
            </Stack>
          </Stack>

          {/* Right: Nav + Language selector */}
          <Stack direction="row" alignItems="center" spacing={{ xs: 2, md: 3 }} sx={{ mr: 1 }}>
            {[t('nav.private_guided_tours'), t('nav.about_us'), t('nav.gallery'), t('nav.blog')].map((label) => (
              <Typography
                key={label}
                component="a"
                href="#"
                sx={{
                  fontFamily: fonts.headings,
                  fontWeight: 400,
                  fontSize: sizes.navFontSize,
                  textTransform: 'uppercase',
                  color: colors.textPrimary,
                  textDecoration: 'none',
                  letterSpacing: 1.2,
                  transition: 'opacity .2s ease, transform .2s ease',
                  '&:hover': { opacity: 0.75, transform: 'translateY(-1px)' },
                  lineHeight: 1,
                }}
              >
                {label}
              </Typography>
            ))}
            <LanguageSelect value={lang} onChange={handleLang} />
          </Stack>
        </Stack>
      </Box>
  <TapeMarquee direction="right" speedSec={sizes.marqueeVerySlowSec} />
    </Box>
  )
}
