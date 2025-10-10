import React from 'react'
import Box from '@mui/material/Box'
import { keyframes } from '@mui/system'
import { sizes } from '../theme/tokens.js'

const scrollLeft = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`

const scrollRight = keyframes`
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
`

export default function TapeMarquee({ direction = 'left', speedSec = sizes.marqueeSpeedSec }) {
  const animation = direction === 'left' ? `${scrollLeft} ${speedSec}s linear infinite` : `${scrollRight} ${speedSec}s linear infinite`
  return (
    <Box sx={{ width: '100%', overflow: 'hidden', height: sizes.tapeHeight, bgcolor: 'transparent' }}>
      <Box sx={{ display: 'flex', width: '200%', height: '100%' }}>
        <Box component="img" src="/images/top-tape.svg" alt="" aria-hidden sx={{ height: '100%', width: '50%' }} />
        <Box component="img" src="/images/top-tape.svg" alt="" aria-hidden sx={{ height: '100%', width: '50%' }} />
      </Box>
      <Box sx={{
        position: 'relative',
        top: `-${sizes.tapeHeight}px`,
        width: '200%',
        height: sizes.tapeHeight,
        animation,
        display: 'flex',
      }}>
        <Box component="img" src="/images/top-tape.svg" alt="" aria-hidden sx={{ height: '100%', width: '50%' }} />
        <Box component="img" src="/images/top-tape.svg" alt="" aria-hidden sx={{ height: '100%', width: '50%' }} />
      </Box>
    </Box>
  )
}
