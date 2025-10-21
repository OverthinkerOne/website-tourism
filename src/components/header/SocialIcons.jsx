import React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { sizes, colors } from '../../theme/tokens.js'

export default function SocialIcons({ variant = 'desktop', onItemClick, sx, color = colors.textPrimary }) {
  // Show only networks with valid links
  const names = ['facebook', 'instagram', 'whatsapp']
  const isMenu = variant === 'menu'
  const hrefFor = (name) => {
    if (name === 'facebook') return 'https://www.facebook.com/profile.php?id=61582651620609'
    if (name === 'instagram') return 'https://www.instagram.com/paulo.iguassu/'
    if (name === 'whatsapp') return 'https://wa.me/5545991120912'
    return '#'
  }

  return (
    <Stack direction="row" alignItems="center" spacing={isMenu ? 2 : 1.5} sx={sx}>
      {names.map((name) => (
        name === 'get-your-guide' ? (
          isMenu ? (
            <Box
              key={name}
              component="a"
              href="#"
              onClick={onItemClick}
              sx={{ display: 'inline-block', lineHeight: 0 }}
            >
              <Box
                component="img"
                src={`/images/icons/${name}.svg`}
                alt={name}
                sx={{ height: sizes.iconSize * 2.2, width: 'auto', opacity: 0.95 }}
              />
            </Box>
          ) : (
            <Box
              key={name}
              component="img"
              src={`/images/icons/${name}.svg`}
              alt={name}
              sx={{
                height: sizes.iconSize * 3,
                width: 'auto',
                opacity: 0.95,
                cursor: 'pointer',
                transition: 'transform .2s ease, filter .2s ease, opacity .2s ease',
                willChange: 'transform, filter',
                '&:hover': {
                  transform: 'translateY(-1px) scale(1.06)',
                  opacity: 1,
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.12))',
                },
                '&:active': { transform: 'translateY(0) scale(0.98)' },
              }}
            />
          )
        ) : (
          isMenu ? (
            <Box
              key={name}
              component="a"
              href={hrefFor(name)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              onClick={onItemClick}
              sx={{
                width: sizes.iconSize * 1.4,
                height: sizes.iconSize * 1.4,
                display: 'inline-block',
                backgroundColor: color,
                mask: `url(/images/icons/${name}.svg) no-repeat center / contain`,
                WebkitMask: `url(/images/icons/${name}.svg) no-repeat center / contain`,
                transition: 'background-color .2s ease',
                '&:hover': { backgroundColor: colors.accent },
              }}
            />
          ) : (
            <Box
              key={name}
              component="a"
              href={hrefFor(name)}
              target="_blank"
              rel="noopener noreferrer"
              role="img"
              aria-label={name}
              sx={{
                display: 'inline-block',
                width: sizes.iconSize,
                height: sizes.iconSize,
                backgroundColor: color,
                mask: `url(/images/icons/${name}.svg) no-repeat center / contain`,
                WebkitMask: `url(/images/icons/${name}.svg) no-repeat center / contain`,
                opacity: 0.95,
                cursor: 'pointer',
                transition: 'transform .2s ease, filter .2s ease, opacity .2s ease, background-color .2s ease',
                willChange: 'transform, filter, background-color',
                '&:hover': {
                  transform: 'translateY(-1px) scale(1.06)',
                  opacity: 1,
                  backgroundColor: colors.accent,
                  filter: `drop-shadow(0 2px 4px rgba(0,0,0,0.12)) drop-shadow(0 0 6px ${colors.accentGlow2})`,
                },
                '&:active': { transform: 'translateY(0) scale(0.98)' },
                '&:focus-visible': {
                  outline: 'none',
                  backgroundColor: colors.accent,
                  filter: `drop-shadow(0 0 0 rgba(0,0,0,0)) drop-shadow(0 0 6px ${colors.accentGlow2})`,
                },
              }}
            />
          )
        )
      ))}
    </Stack>
  )
}
