import React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import { fonts } from '../../theme/tokens.js'
import SocialIcons from './SocialIcons.jsx'

export default function MobileMenu({ anchorEl, open, onClose, labels }) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{
        sx: {
          mt: 1,
          minWidth: 220,
          borderRadius: 2,
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
        },
      }}
    >
      {labels.map((label) => (
        <MenuItem
          key={label}
          onClick={onClose}
          component="a"
          href="#"
          sx={{ fontFamily: fonts.headings, textTransform: 'uppercase', letterSpacing: 1, fontSize: 16 }}
        >
          {label}
        </MenuItem>
      ))}
      <Divider sx={{ my: 1 }} />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 2, pb: 1 }}>
        <SocialIcons variant="menu" onItemClick={onClose} />
      </Box>
    </Menu>
  )
}
