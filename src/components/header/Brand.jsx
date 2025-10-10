import React from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import { sizes } from '../../theme/tokens.js'

export default function Brand({ showDivider = true, dividerSx, children }) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box component="img" src="/images/dark-logo.svg" alt="logo" sx={{ height: sizes.logoHeight, width: 'auto' }} />
      {showDivider && (
        <Divider
          orientation="vertical"
          sx={{
            height: `${sizes.headerHeight * sizes.dividerHeightPct}px`,
            alignSelf: 'center',
            borderRightWidth: sizes.dividerThickness,
            borderColor: 'divider',
            ...dividerSx,
          }}
        />
      )}
      {children}
    </Stack>
  )
}
