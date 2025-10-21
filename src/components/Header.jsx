import React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import MenuIcon from '@mui/icons-material/Menu'
import Typography from '@mui/material/Typography'
import { sizes, colors, fonts, i18nLanguages } from '../theme/tokens.js'
import TapeMarquee from './TapeMarquee.jsx'
import LanguageSelect from './LanguageSelect.jsx'
import { useTranslation } from 'react-i18next'
import Brand from './header/Brand.jsx'
import SocialIcons from './header/SocialIcons.jsx'
import NavLinks from './header/NavLinks.jsx'
import MobileMenu from './header/MobileMenu.jsx'

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
  const lang = i18n.resolvedLanguage || i18n.language || 'en'
  const handleLang = (code) => {
    i18n.changeLanguage(code)
  }
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [menuAnchor, setMenuAnchor] = React.useState(null)
  const openMenu = Boolean(menuAnchor)
  const handleOpenMenu = (e) => setMenuAnchor(e.currentTarget)
  const handleCloseMenu = () => setMenuAnchor(null)
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
          {/* Left: Brand + (desktop) Social icons */}
          <Brand showDivider dividerSx={{ display: { xs: 'none', md: 'block' } }}>
            <SocialIcons sx={{ display: { xs: 'none', md: 'flex' } }} />
          </Brand>

          {/* Right: Nav + Language selector (responsive) */}
          <Stack direction="row" alignItems="center" spacing={{ xs: 1.5, md: 3 }} sx={{ mr: 1 }}>
            {isMobile ? (
              <>
                <LanguageSelect value={lang} onChange={handleLang} />
                <IconButton
                  aria-label={t('nav.menu')}
                  onClick={handleOpenMenu}
                  sx={{
                    color: colors.textPrimary,
                    transition: 'transform .2s ease, color .2s ease',
                    '&:hover': { color: colors.accent, transform: 'translateY(-1px)' },
                    '&:active': { transform: 'translateY(0) scale(0.95)' },
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <MobileMenu
                  anchorEl={menuAnchor}
                  open={openMenu}
                  onClose={handleCloseMenu}
                  items={[
                    { label: t('nav.private_guided_tours'), href: '/tours' },
                    { label: t('nav.gastronomy', 'Gastronomy'), href: '/gastronomy' },
                    { label: t('nav.about_us'), href: '/about' },
                    { label: t('nav.gallery'), href: '/gallery' },
                    { label: t('nav.blog'), href: '/blog' },
                  ]}
                />
              </>
            ) : (
              <>
                <NavLinks
                  items={[
                    { label: t('nav.private_guided_tours'), href: '/tours' },
                    { label: t('nav.gastronomy', 'Gastronomy'), href: '/gastronomy' },
                    { label: t('nav.about_us'), href: '/about' },
                    { label: t('nav.gallery'), href: '/gallery' },
                    { label: t('nav.blog'), href: '/blog' },
                  ]}
                />
                <LanguageSelect value={lang} onChange={handleLang} />
              </>
            )}
          </Stack>
        </Stack>
      </Box>
  <TapeMarquee direction="right" speedSec={sizes.marqueeVerySlowSec} />
    </Box>
  )
}
