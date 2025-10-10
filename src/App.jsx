import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './theme.js'
import Header from './components/Header.jsx'
import HeroSection from './components/HeroSection.jsx'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <HeroSection />
    </ThemeProvider>
  )
}

