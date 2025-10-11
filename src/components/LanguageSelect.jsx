import React from 'react'
import { styled, alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { i18nLanguages, fonts } from '../theme/tokens.js'

const StyledSelect = styled(Select)(({ theme }) => ({
  height: 36,
  borderRadius: 999,
  backgroundColor: alpha(theme.palette.text.primary, 0.03),
  backdropFilter: 'saturate(180%) blur(6px)',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.divider,
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.text.secondary,
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.text.primary,
  },
  '& .MuiSelect-select': {
    paddingLeft: 14,
    paddingRight: 36,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  '& .MuiSvgIcon-root': {
    right: 10,
  },
}))

const flagMap = {
  en: '🇬🇧',
  es: '🇪🇸',
  zh: '🇨🇳',
}

export default function LanguageSelect({ value, onChange }) {
  return (
    <StyledSelect
      value={value}
      onChange={(e) => onChange(e.target.value)}
      variant="outlined"
      size="small"
      IconComponent={ExpandMoreIcon}
      MenuProps={{
        PaperProps: {
          elevation: 0,
          sx: {
            borderRadius: 2,
            mt: 1,
            border: '1px solid',
            borderColor: 'divider',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
          },
        },
      }}
      renderValue={(sel) => {
        const current = i18nLanguages.find((l) => l.code === sel)
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box component="span" sx={{ fontSize: 18, lineHeight: 1 }}>{flagMap[sel]}</Box>
            <Box component="span" sx={{ fontFamily: fonts.headings, letterSpacing: 1, textTransform: 'uppercase' }}>
              {current?.code}
            </Box>
          </Box>
        )
      }}
    >
      {i18nLanguages.map(({ code, label }) => (
        <MenuItem key={code} value={code} sx={{ py: 1 }}>
          <ListItemIcon sx={{ minWidth: 28 }}>
            <Box component="span" sx={{ fontSize: 18, lineHeight: 1 }}>{flagMap[code]}</Box>
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{
              sx: { fontFamily: fonts.body },
            }}
            primary={label}
          />
        </MenuItem>
      ))}
    </StyledSelect>
  )
}
