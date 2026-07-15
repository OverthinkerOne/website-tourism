import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '../theme.js'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Pagination from '@mui/material/Pagination'
import { colors, fonts } from '../theme/tokens.js'
import galleryMedia from '../data/galleryManifest.js'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import Video from 'yet-another-react-lightbox/plugins/video'
import { useTranslation } from 'react-i18next'
import Seo from '../components/Seo.jsx'
import { getSiteUrl } from '../lib/content.js'
import { useSearchParams } from 'react-router-dom'

export default function GalleryPage() {
  const { t } = useTranslation()
  const site = getSiteUrl()
  const items = galleryMedia
  const [open, setOpen] = React.useState(false)
  const [index, setIndex] = React.useState(0)

  const [searchParams, setSearchParams] = useSearchParams()
  const pageParam = searchParams.get('page')
  const page = Math.max(1, parseInt(pageParam || '1', 10) || 1)
  const pageSize = 12
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const startIdx = (currentPage - 1) * pageSize
  const pageItems = items.slice(startIdx, startIdx + pageSize)

  const slides = pageItems.map((m) =>
    m.type === 'video'
      ? { type: 'video', sources: [{ src: m.src, type: 'video/mp4' }] }
      : { src: m.src }
  )

  const openLightbox = (i) => {
    setIndex(i)
    setOpen(true)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Seo
        title={t('seo.gallery.title', 'Gallery — Guará Travel')}
        description={t('seo.gallery.description', 'Explore our gallery of Iguazu Falls, Itaipu Dam, wildlife and experiences.')}
        canonical={`${site}/gallery${currentPage > 1 ? `?page=${currentPage}` : ''}`}
      />
      <Header />

      <Box component="section" sx={{ px: { xs: 2, sm: 3, md: 6 }, py: { xs: 6, md: 10 } }}>
        <Typography component="h1" sx={{ fontFamily: fonts.headings, fontSize: { xs: 36, md: 52 }, lineHeight: 1, letterSpacing: 1.2, textAlign: 'center', mb: 1 }}>
          {t('gallery.title')}
        </Typography>
        <Typography sx={{ textAlign: 'center', color: 'text.secondary', maxWidth: 800, mx: 'auto', mb: 4 }}>
          {t('gallery.intro')}
        </Typography>

        <Grid container spacing={{ xs: 2, md: 3 }}>
          {pageItems.map((m, idx) => (
            <Grid key={m.src + idx} size={{ xs: 6, sm: 4, md: 3 }}>
              <Box
                component={m.type === 'video' ? 'video' : 'img'}
                src={m.src}
                onClick={() => openLightbox(idx)}
                controls={m.type === 'video'}
                muted={m.type === 'video'}
                playsInline={m.type === 'video'}
                loading={m.type === 'image' ? 'lazy' : undefined}
                sx={{
                  width: '100%',
                  height: 220,
                  objectFit: 'cover',
                  borderRadius: 2,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  cursor: 'pointer',
                  backgroundColor: '#000',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.02)'
                  }
                }}
              />
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              color="primary"
              onChange={(e, value) => {
                if (value === 1) setSearchParams({})
                else setSearchParams({ page: String(value) })
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              sx={{
                '& .MuiPaginationItem-root': {
                  fontFamily: 'Kumbh Sans, system-ui, sans-serif',
                  fontWeight: 700,
                  fontSize: 14,
                },
                '& .Mui-selected': {
                  bgcolor: colors.accent,
                  color: '#fff',
                  '&:hover': {
                    bgcolor: colors.accentGlow,
                  }
                }
              }}
            />
          </Box>
        )}
      </Box>

      <Footer />

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        plugins={[Video]}
      />
    </ThemeProvider>
  )
}
