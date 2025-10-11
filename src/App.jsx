import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './theme.js'
import Header from './components/Header.jsx'
import HeroSection from './components/HeroSection.jsx'
import BuildTourSection from './components/BuildTourSection.jsx'
import Session2 from './components/Session2.jsx'
import Session3 from './components/Session3.jsx'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <HeroSection />
      <BuildTourSection />
      <Session2 />
      <Session3 />
    </ThemeProvider>
  )
}

