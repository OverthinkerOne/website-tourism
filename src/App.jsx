import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './theme.js'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import BuildTourSection from './components/BuildTourSection'
import Session2 from './components/Session2'
import Session3 from './components/Session3'
import Session4 from './components/Session4'
import Session5 from './components/Session5'
import Session6 from './components/Session6'
import Session7 from './components/Session7'
import Session8 from './components/Session8'
import Session9 from './components/Session9'
import Session10 from './components/Session10'
import Footer from './components/Footer'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <HeroSection />
      <BuildTourSection />
      <Session2 />
      <Session3 />
      <Session4 />
      <Session5 />
      <Session6 />
      <Session7 />
  <Session8 />
      <Session9 />
      <Session10 />
      <Footer />
    </ThemeProvider>
  )
}

