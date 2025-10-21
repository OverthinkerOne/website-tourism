import React from 'react'
import Box from '@mui/material/Box'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'

export default function FloatingWhatsApp() {
  const href = 'https://wa.me/5545991120912'
  return (
    <Box
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      sx={{
        position: 'fixed',
        right: { xs: 16, md: 24 },
        bottom: { xs: 80, md: 24 }, // lift on mobile to avoid sticky CTAs
        zIndex: 1100,
        width: 56,
        height: 56,
        borderRadius: '50%',
        bgcolor: '#25D366',
        color: '#fff',
        display: 'grid',
        placeItems: 'center',
        boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
        transition: 'transform .2s ease, box-shadow .2s ease',
        animation: 'waPulse 2.2s infinite',
        '@keyframes waPulse': {
          '0%': { boxShadow: '0 0 0 0 rgba(37,211,102, 0.6)' },
          '70%': { boxShadow: '0 0 0 18px rgba(37,211,102, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(37,211,102, 0)' },
        },
        '&:hover': {
          transform: 'translateY(-2px) scale(1.04)',
          boxShadow: '0 12px 26px rgba(37,211,102,0.45), 0 6px 16px rgba(0,0,0,0.18)'
        },
        '&:active': { transform: 'translateY(0) scale(0.98)' },
      }}
    >
      <WhatsAppIcon sx={{ fontSize: 28 }} />
    </Box>
  )
}
