import React from 'react'
import Typography from '@mui/material/Typography'
import { colors, fonts, sizes } from '../../theme/tokens.js'

// Backwards-compatible: accepts either `items` [{ label, href }] or legacy `labels` [string]
export default function NavLinks({ items, labels }) {
  const data = items || (labels ? labels.map((l) => ({ label: l, href: '#' })) : [])
  return (
    <>
      {data.map(({ label, href }) => (
        <Typography
          key={label}
          component="a"
          href={href || '#'}
          sx={{
            fontFamily: fonts.headings,
            fontWeight: 400,
            fontSize: sizes.navFontSize,
            textTransform: 'uppercase',
            color: colors.textPrimary,
            textDecoration: 'none',
            letterSpacing: 1.2,
            position: 'relative',
            transition: 'color .2s ease, transform .2s ease, text-shadow .25s ease',
            '&::after': {
              content: '""',
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: -6,
              height: 2,
              background: colors.accent,
              opacity: 0,
              transform: 'scaleX(0.2)',
              transition: 'opacity .25s ease, transform .25s ease',
            },
            '&:hover': {
              color: colors.accent,
              transform: 'translateY(-1px)',
              textShadow: `0 1px 0 ${colors.strokeOnWhite}, 0 0 4px ${colors.accentGlow2}`,
              '&::after': { opacity: 1, transform: 'scaleX(1)' },
            },
            '&:focus-visible': {
              outline: 'none',
              color: colors.accent,
              textShadow: `0 1px 0 ${colors.strokeOnWhite}, 0 0 4px ${colors.accentGlow2}`,
              '&::after': { opacity: 1, transform: 'scaleX(1)' },
            },
            lineHeight: 1,
          }}
        >
          {label}
        </Typography>
      ))}
    </>
  )
}
