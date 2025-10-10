import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './theme.js'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Página limpa para começar do zero */}
    </ThemeProvider>
  )
}

