import React from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import { sizes } from '../../theme/tokens.js'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function Brand({ showDivider = true, dividerSx, children }) {
  const { t } = useTranslation()
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box component={Link} to="/" sx={{ display: 'inline-flex', alignItems: 'center' }} aria-label={t('brand.logoAlt')}>
        <Box component="img" src="/images/dark-logo.svg" alt={t('brand.logoAlt')} sx={{ height: sizes.logoHeight, width: 'auto' }} />
      </Box>
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
