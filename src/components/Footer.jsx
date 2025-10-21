import React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { sizes, colors, fonts } from '../theme/tokens.js'
import SocialIcons from './header/SocialIcons.jsx'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  const linkSx = {
    color: 'inherit',
    textDecoration: 'none',
    opacity: 0.88,
    transition: 'color .18s ease, opacity .18s ease, transform .18s ease',
    '&:hover': { color: '#000', opacity: 1, transform: 'translateX(2px)' },
    '&:focus-visible': { outline: 'none', color: '#000', opacity: 1 },
  }

  return (
    <Box component="footer" sx={{ width: '100%', mt: 0 }}>
      {/* Main footer area */}
      <Box
        component="nav"
        aria-label={t('footer.aria_main_nav')}
        sx={{
          background: '#fff',
          color: '#000',
          px: { xs: 2, sm: 3, md: 4, lg: 6 },
          py: { xs: 4, md: 6 },
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              md: '2fr 1fr 1.2fr',
            },
            gap: { xs: 24, sm: 28, md: 32 },
            alignItems: 'flex-start',
          }}
        >
          {/* Brand + description + socials */}
          <Stack spacing={2} sx={{ alignItems: 'flex-start', textAlign: 'left' }}>
            <Box component="img" src="/images/dark-logo.svg" alt={t('brand.logoAlt')} sx={{ display: 'block', height: sizes.logoHeight, width: 'auto' }} />
            <Typography variant="body2" sx={{ fontFamily: 'Kumbh Sans, system-ui, sans-serif', color: 'rgba(0,0,0,0.85)' }}>
              {t('footer.description')}
            </Typography>
            <SocialIcons sx={{ mt: 0.5 }} color="#000" />
          </Stack>

          {/* Explore */}
          <Stack spacing={1.25}>
            <Typography component="h3" sx={{ fontFamily: fonts.headings, fontSize: 22, letterSpacing: 1, textTransform: 'uppercase', color: '#000' }}>
              {t('footer.explore')}
            </Typography>
            <Stack component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }} spacing={0.75}>
              <li><Typography component="a" href="/tours" sx={linkSx}>{t('nav.private_guided_tours')}</Typography></li>
              <li><Typography component="a" href="/about" sx={linkSx}>{t('nav.about_us')}</Typography></li>
              <li><Typography component="a" href="/gallery" sx={linkSx}>{t('nav.gallery')}</Typography></li>
              <li><Typography component="a" href="/blog" sx={linkSx}>{t('nav.blog')}</Typography></li>
            </Stack>
          </Stack>

          {/* Resources column removed (no pages available for those links yet) */}

          {/* Contact */}
          <Stack spacing={1.25}>
            <Typography component="h3" sx={{ fontFamily: fonts.headings, fontSize: 22, letterSpacing: 1, textTransform: 'uppercase', color: '#000' }}>
              {t('footer.contact')}
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body2" sx={{ fontFamily: 'Kumbh Sans, system-ui, sans-serif', color: 'rgba(0,0,0,0.85)' }}>{t('footer.address')}</Typography>
              <Stack spacing={0.5}>
                <Typography component="a" href="mailto:hello@guaratravel.com" sx={linkSx}>{t('footer.emailLabel')}: hello@guaratravel.com</Typography>
                <Typography component="a" href="tel:+5545999999999" sx={linkSx}>{t('footer.phoneLabel')}: +55 45 99999-9999</Typography>
                <Typography component="a" href="https://wa.me/5545991120912" target="_blank" rel="noopener noreferrer" sx={linkSx}>WhatsApp</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Box>

      {/* Bottom legal bar */}
      <Box
        sx={{
          background: '#fff',
          color: '#000',
          px: { xs: 2, sm: 3, md: 4, lg: 6 },
          py: { xs: 1.5, md: 2 },
          borderTop: '1px solid #eee',
        }}
      >
          <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'flex-start', sm: 'center' }} justifyContent="space-between" spacing={{ xs: 1, sm: 2 }}>
          <Typography
            variant="body2"
            sx={{ fontFamily: 'Kumbh Sans, system-ui, sans-serif', opacity: 0.9 }}
          >
            © {year} {t('footer.rights')}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={1.25} sx={{ alignSelf: { xs: 'flex-end', sm: 'auto' } }}>
            <Box component="img" src="/images/revo-black.svg" alt="RevoAds" title="RevoAds" sx={{ height: 16, width: 'auto', display: 'block' }} />
          </Stack>
        </Stack>
      </Box>
    </Box>
  )
}
