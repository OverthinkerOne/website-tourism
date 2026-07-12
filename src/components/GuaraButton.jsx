import React from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { keyframes } from '@emotion/react'
import { colors, fonts } from '../theme/tokens.js'

// Keyframe animations for glow pulsing
export const pulseGlow = keyframes`
  0% { opacity: .45; transform: scale(1); }
  50% { opacity: .95; transform: scale(1.04); }
  100% { opacity: .45; transform: scale(1); }
`

// Keyframe animation for sliding shine
export const shine = keyframes`
  0% { left: -100px; }
  60% { left: 100%; }
  100% { left: 100%; }
`

/**
 * Outlined button style for card CTAs (e.g. "View details", "Read more").
 */
export function CardCtaButton({ children, sx, ...props }) {
  return (
    <Button
      variant="outlined"
      sx={{
        height: '46px',
        minWidth: '170px',
        position: 'relative',
        bgcolor: 'transparent',
        borderColor: colors.accent,
        color: colors.accent,
        cursor: 'pointer',
        borderWidth: '2px',
        borderStyle: 'solid',
        overflow: 'hidden',
        borderRadius: '30px',
        fontFamily: 'Kumbh Sans, system-ui, sans-serif',
        fontWeight: 700,
        textTransform: 'none',
        transition: 'all 0.5s ease-in-out',
        zIndex: 1,
        '&::after': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          transition: 'all 0.5s ease-in-out',
          bgcolor: colors.accent,
          borderRadius: '30px',
          visibility: 'hidden',
          height: '10px',
          width: '10px',
          zIndex: -1,
        },
        '&:hover': {
          borderColor: colors.accent,
          borderWidth: '2px',
          bgcolor: 'transparent',
          color: '#fff',
          boxShadow: `0 6px 20px rgba(255,115,0,0.35)`,
          '&::after': {
            visibility: 'visible',
            transform: 'scale(100) translateX(2px)',
          }
        },
        ...sx
      }}
      {...props}
    >
      <span style={{ zIndex: 2, position: 'relative' }}>{children}</span>
    </Button>
  )
}

/**
 * Outlined button style for the main call to action "Plan your trip".
 * Includes support for a mobile sticky bar layout variant.
 */
export function PlanTripButton({ mobile = false, children, sx, ...props }) {
  const borderWidth = mobile ? '1.5px' : '1px'
  return (
    <Button
      variant="outlined"
      fullWidth
      sx={{
        borderColor: colors.accent,
        color: colors.accent,
        fontWeight: 700,
        textTransform: 'none',
        borderWidth: borderWidth,
        bgcolor: '#fff',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          borderColor: colors.accent,
          bgcolor: colors.accent,
          color: '#fff',
          borderWidth: borderWidth,
        },
        ...sx
      }}
      {...props}
    >
      {children}
    </Button>
  )
}

/**
 * Glassmorphic glossy black button used in HeroSection.
 * Implements inset highlight shadows, border reflection overlays, and tactile active presses.
 */
export function HeroCtaButton({ children, sx, ...props }) {
  return (
    <Button
      variant="contained"
      sx={{
        mt: { xs: 3, md: 4 },
        outline: 'none',
        cursor: 'pointer',
        border: 0,
        position: 'relative',
        borderRadius: '100px',
        background: 'linear-gradient(180deg, #FF8A33 0%, #FF7300 100%)',
        color: '#FFFFFF',
        p: 0,
        textTransform: 'none',
        transition: 'all 0.2s ease',
        boxShadow: `
          inset 0 0.3rem 0.9rem rgba(255, 255, 255, 0.3),
          inset 0 -0.1rem 0.3rem rgba(0, 0, 0, 0.7),
          inset 0 -0.4rem 0.9rem rgba(255, 255, 255, 0.5),
          0 3rem 3rem rgba(0, 0, 0, 0.3),
          0 1rem 1rem -0.6rem rgba(0, 0, 0, 0.8)
        `,
        '&:hover': {
          background: 'linear-gradient(180deg, #FFA45F 0%, #FF6A00 100%)',
          boxShadow: `
            inset 0 0.3rem 0.5rem rgba(255, 255, 255, 0.4),
            inset 0 -0.1rem 0.3rem rgba(0, 0, 0, 0.7),
            inset 0 -0.4rem 0.9rem rgba(255, 255, 255, 0.7),
            0 3rem 3rem rgba(0, 0, 0, 0.3),
            0 1rem 1rem -0.6rem rgba(0, 0, 0, 0.8)
          `,
          '& .wrap-inner': {
            '&::before': {
              transform: 'translateY(-5%)',
            },
            '&::after': {
              opacity: 0.4,
              transform: 'translateY(5%)',
            },
            '& .content-p': {
              transform: 'translateY(-4%)',
            }
          }
        },
        '&:active': {
          transform: 'translateY(4px)',
          boxShadow: `
            inset 0 0.3rem 0.5rem rgba(255, 255, 255, 0.5),
            inset 0 -0.1rem 0.3rem rgba(0, 0, 0, 0.8),
            inset 0 -0.4rem 0.9rem rgba(255, 255, 255, 0.4),
            0 3rem 3rem rgba(0, 0, 0, 0.3),
            0 1rem 1rem -0.6rem rgba(0, 0, 0, 0.8)
          `
        },
        ...sx
      }}
      {...props}
    >
      <Box
        className="wrap-inner"
        sx={{
          width: '100%',
          height: '100%',
          borderRadius: 'inherit',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box',
          padding: { xs: '16px 28px', md: '24px 36px' },
          '&::before, &::after': {
            content: '""',
            position: 'absolute',
            transition: 'all 0.3s ease',
          },
          '&::before': {
            left: '-15%',
            right: '-15%',
            bottom: '25%',
            top: '-100%',
            borderRadius: '50%',
            bgcolor: 'rgba(255, 255, 255, 0.12)',
            pointerEvents: 'none',
          },
          '&::after': {
            left: '6%',
            right: '6%',
            top: '12%',
            bottom: '40%',
            borderRadius: '22px 22px 0 0',
            boxShadow: 'inset 0 10px 8px -10px rgba(255, 255, 255, 0.8)',
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0) 100%)',
            pointerEvents: 'none',
          }
        }}
      >
        <Box
          className="content-p"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            margin: 0,
            transition: 'all 0.2s ease',
            transform: 'translateY(2%)',
            maskImage: 'linear-gradient(to bottom, white 75%, rgba(255,255,255,0.7) 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, white 75%, rgba(255,255,255,0.7) 100%)',
          }}
        >
          {children}
        </Box>
      </Box>
    </Button>
  )
}

/**
 * Premium gradient start button used in BuildTourSection.
 */
export function BuildTourStartButton({ children, sx, ...props }) {
  return (
    <Box sx={{ position: 'relative', display: 'block', width: '100%', ...sx }}>
      {/* Background breathing glow */}
      <Box
        sx={{
          position: 'absolute',
          inset: -18,
          borderRadius: 2,
          background: 'radial-gradient(circle, rgba(255,115,0,0.65) 0%, rgba(255,115,0,0.0) 70%)',
          filter: 'blur(18px)',
          zIndex: 0,
          pointerEvents: 'none',
          animation: `${pulseGlow} 2.4s ease-in-out infinite`,
        }}
      />
      {/* Actual Button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          height: 48,
          px: { xs: 2.5, md: 4 },
          borderRadius: 2,
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #FF8A33 0%, #FF7300 100%)',
          boxShadow: '0 8px 18px rgba(255,115,0,0.40), 0 2px 8px rgba(0,0,0,0.16)',
          border: '3px solid rgba(255, 255, 255, 0.3)',
          textTransform: 'uppercase',
          letterSpacing: { xs: '0.12em', md: '0.2em' },
          fontFamily: fonts.headings,
          fontSize: { xs: 18, md: 24 },
          fontWeight: 400,
          color: '#FFF',
          transition: 'all 0.3s ease-in-out',
          zIndex: 1,
          '&::before': {
            content: '""',
            position: 'absolute',
            width: '100px',
            height: '100%',
            backgroundImage: 'linear-gradient(120deg, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0) 70%)',
            top: 0,
            left: '-100px',
            opacity: 0.6,
          },
          '&:hover': {
            transform: 'scale(1.02)',
            borderColor: 'rgba(255, 255, 255, 0.6)',
            background: 'linear-gradient(180deg, #FFA45F 0%, #FF6A00 100%)',
            boxShadow: '0 14px 30px rgba(255,115,0,0.60), 0 6px 14px rgba(0,0,0,0.22), 0 0 22px rgba(255,115,0,0.45)',
          },
          '&:hover::before': {
            animation: `${shine} 1.5s ease-out infinite`,
          },
          '&:active': { transform: 'scale(0.995)' },
          '&:focus-visible': { outline: 'none', boxShadow: '0 0 0 3px rgba(255,115,0,0.35), 0 8px 18px rgba(0,0,0,0.24)' },
        }}
        {...props}
      >
        {children}
      </Button>
    </Box>
  )
}

/**
 * About us gradient button used in Session2.
 */
export function AboutUsButton({ children, sx, ...props }) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-block', ...sx }}>
      {/* Background breathing glow */}
      <Box
        sx={{
          position: 'absolute',
          inset: -18,
          borderRadius: 999,
          background: 'radial-gradient(circle, rgba(255,115,0,0.65) 0%, rgba(255,115,0,0.0) 70%)',
          filter: 'blur(18px)',
          zIndex: 0,
          pointerEvents: 'none',
          animation: `${pulseGlow} 2.6s ease-in-out infinite`,
        }}
      />
      {/* Actual Button */}
      <Button
        variant="contained"
        sx={{
          px: { xs: 2.75, md: 3.25 },
          py: { xs: 1.1, md: 1.25 },
          borderRadius: 999,
          position: 'relative',
          overflow: 'hidden',
          color: '#fff',
          background: 'linear-gradient(180deg, #FF8A33 0%, #FF7300 100%)',
          boxShadow: '0 8px 18px rgba(255,115,0,0.40), 0 2px 8px rgba(0,0,0,0.16)',
          border: '3px solid rgba(255, 255, 255, 0.3)',
          textTransform: 'uppercase',
          letterSpacing: { xs: '0.14em', md: '0.18em' },
          fontFamily: fonts.headings,
          fontSize: { xs: 14, sm: 15, md: 16 },
          fontWeight: 400,
          transition: 'all 0.3s ease-in-out',
          zIndex: 1,
          '& svg': {
            transition: 'all 0.3s ease-in-out',
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            width: '100px',
            height: '100%',
            backgroundImage: 'linear-gradient(120deg, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0) 70%)',
            top: 0,
            left: '-100px',
            opacity: 0.6,
          },
          '&:hover': {
            transform: 'scale(1.05)',
            borderColor: 'rgba(255, 255, 255, 0.6)',
            background: 'linear-gradient(180deg, #FFA45F 0%, #FF6A00 100%)',
            boxShadow: '0 14px 30px rgba(255,115,0,0.60), 0 6px 14px rgba(0,0,0,0.22), 0 0 22px rgba(255,115,0,0.45)'
          },
          '&:hover svg': {
            transform: 'translateX(4px)',
          },
          '&:hover::before': {
            animation: `${shine} 1.5s ease-out infinite`,
          },
          '&:active': { transform: 'scale(0.99)' },
          '&:focus-visible': { outline: 'none', boxShadow: '0 0 0 3px rgba(255,115,0,0.35), 0 10px 22px rgba(0,0,0,0.28)' },
        }}
        {...props}
      >
        {children}
      </Button>
    </Box>
  )
}
