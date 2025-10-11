import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '../theme.js'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { fonts, colors } from '../theme/tokens.js'
import { useTranslation } from 'react-i18next'
import BLOG_POSTS from '../data/blogPosts.js'
import { findImage } from '../lib/imageProvider.js'
import { Link as RouterLink } from 'react-router-dom'

export default function BlogListPage() {
  const { t } = useTranslation()
  const [images, setImages] = React.useState({})
  React.useEffect(() => {
    let alive = true
    ;(async () => {
      const entries = await Promise.all(
        BLOG_POSTS.map(async (p) => {
          const url = await findImage({ query: p.query, orientation: 'landscape' })
          return [p.id, url]
        })
      )
      if (alive) setImages(Object.fromEntries(entries))
    })()
    return () => { alive = false }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />

      <Box component="section" sx={{ px: { xs: 2, sm: 3, md: 6 }, py: { xs: 6, md: 10 } }}>
        <Typography component="h1" sx={{ fontFamily: fonts.headings, fontSize: { xs: 36, md: 52 }, lineHeight: 1, letterSpacing: 1.2, textAlign: 'center', mb: 2 }}>
          {t('blog.list.title')}
        </Typography>
        <Typography sx={{ textAlign: 'center', color: 'text.secondary', maxWidth: 900, mx: 'auto', mb: 5 }}>
          {t('blog.list.subtitle')}
        </Typography>

        <Grid container spacing={{ xs: 3, md: 4 }}>
          {BLOG_POSTS.map((p) => {
            const category = t(`session7.posts.${p.id}.category`)
            const title = t(`session7.posts.${p.id}.title`)
            const excerpt = t(`session7.posts.${p.id}.excerpt`)
            const image = images[p.id]
            return (
              <Grid key={p.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Box sx={{ borderRadius: 2, overflow: 'hidden', border: '1px solid #eee', bgcolor: '#fff', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Box component="img" src={image} alt="" sx={{ width: '100%', height: 220, objectFit: 'cover', display: 'block', bgcolor: '#000' }} />
                  <Box sx={{ p: 2 }}>
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', px: 1, py: 0.25, borderRadius: 999, bgcolor: 'rgba(255,115,0,.12)', color: colors.accent, fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: .6 }}>{category}</Box>
                    <Typography sx={{ mt: 1.25, fontWeight: 800, fontSize: 18 }}>{title}</Typography>
                    <Typography sx={{ color: 'text.secondary', mt: 0.75 }}>{excerpt}</Typography>
                    <Button component={RouterLink} to={`/blog/${p.id}`} variant="contained" sx={{ mt: 2, bgcolor: colors.accent, '&:hover': { bgcolor: '#ff7f14' } }}>
                      {t('blog.cta.readMore')}
                    </Button>
                  </Box>
                </Box>
              </Grid>
            )
          })}
        </Grid>
      </Box>

      <Footer />
    </ThemeProvider>
  )
}
