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
import FloatingWhatsApp from './components/FloatingWhatsApp.jsx'
import Seo from './components/Seo.jsx'
import { useTranslation } from 'react-i18next'
import { getSiteUrl } from './lib/content.js'

export default function App() {
  const { t } = useTranslation()
  const site = getSiteUrl()
  const title = t('seo.home.title', 'Guará Travel — Private Tours in Iguazu')
  const desc = t('seo.home.description', 'Private guided tours in Iguazu Falls and tri-border region. Personalized experiences, hotel pickup, multilingual guides.')
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Seo
        title={title}
        description={desc}
        canonical={`${site}/`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Guará Travel',
          url: site,
        }}
      />
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
      <FloatingWhatsApp />
    </ThemeProvider>
  )
}

