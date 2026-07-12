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

        const tooltipText = name.charAt(0).toUpperCase() + name.slice(1)

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
                  '& .tooltip': {
                    top: '-42px',
                    opacity: 1,
                    visibility: 'visible',
                  },
                  '& .icon-mask': {
                    bgcolor: '#ffffff',
                  }
                }
              }}
            >
              {/* Tooltip (Only on desktop header/footer to avoid mobile clutter) */}
              {!isMenu && (
                <Box
                  className="tooltip"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    fontSize: '11px',
                    fontWeight: 700,
                    background: brandColor,
                    color: '#ffffff',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.08)',
                    opacity: 0,
                    visibility: 'hidden',
                    pointerEvents: 'none',
                    transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                    whiteSpace: 'nowrap',
                    zIndex: 10,
                    // Triangle pointer
                    '&::before': {
                      position: 'absolute',
                      content: '""',
                      height: '6px',
                      width: '6px',
                      background: brandColor,
                      bottom: '-3px',
                      left: '50%',
                      transform: 'translate(-50%) rotate(45deg)',
                      transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                    }
                  }}
                >
                  {tooltipText}
                </Box>
              )}

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
