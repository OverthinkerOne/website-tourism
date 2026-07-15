import React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { sizes, colors } from '../../theme/tokens.js'

export default function SocialIcons({ variant = 'desktop', onItemClick, sx, color = colors.textPrimary }) {
  const names = ['facebook', 'instagram', 'whatsapp']
  const isMenu = variant === 'menu'

  const hrefFor = (name) => {
    if (name === 'facebook') return 'https://www.facebook.com/profile.php?id=61582651620609'
    if (name === 'instagram') return 'https://www.instagram.com/paulo.iguassu/'
    if (name === 'whatsapp') return 'https://wa.me/5545991120912'
    return '#'
  }

  return (
    <Stack
      component="ul"
      direction="row"
      alignItems="center"
      spacing={0}
      sx={{
        listStyle: 'none',
        p: 0,
        m: 0,
        display: 'inline-flex',
        ...sx
      }}
    >
      {names.map((name) => {
        const brandColor =
          name === 'facebook'
            ? '#1877f2'
            : name === 'instagram'
            ? '#e4405f'
            : '#25d366' // WhatsApp green color

        return (
          <Box
            key={name}
            component="li"
            sx={{ display: 'inline-block', p: 0, m: 0 }}
          >
            <Box
              component="a"
              href={hrefFor(name)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              onClick={onItemClick}
              sx={{
                position: 'relative',
                background: 'transparent',
                borderRadius: '50%',
                mx: isMenu ? '8px' : '4px',
                width: isMenu ? '40px' : '36px',
                height: isMenu ? '40px' : '36px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                textDecoration: 'none',
                '&:hover': {
                  background: brandColor,
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
                  transform: 'translateY(-2px)',
                  '& .icon-mask': {
                    bgcolor: '#ffffff',
                  }
                }
              }}
            >

              {/* Icon mask */}
              <Box
                className="icon-mask"
                sx={{
                  width: isMenu ? '20px' : '18px',
                  height: isMenu ? '20px' : '18px',
                  bgcolor: color,
                  mask: `url(/images/icons/${name}.svg) no-repeat center / contain`,
                  WebkitMask: `url(/images/icons/${name}.svg) no-repeat center / contain`,
                  transition: 'all 0.3s ease-in-out',
                }}
              />
            </Box>
          </Box>
        )
      })}
    </Stack>
  )
}
