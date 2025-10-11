import React from 'react'
import { useParams, Link as RouterLink } from 'react-router-dom'
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

export default function BlogPostPage() {
  const { id } = useParams()
  const { t } = useTranslation()
  const exists = React.useMemo(() => BLOG_POSTS.some((x) => x.id === id), [id])
  const [hero, setHero] = React.useState('')
  React.useEffect(() => {
    let alive = true
    ;(async () => {
      const bp = BLOG_POSTS.find((x) => x.id === id)
      if (!bp) return
      const url = await findImage({ query: bp.query, orientation: 'landscape' })
      if (alive) setHero(url)
    })()
    return () => { alive = false }
  }, [id])

  if (!exists) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Box sx={{ px: { xs: 2, sm: 3, md: 6 }, py: 8 }}>
          <Typography variant="h5">{t('blog.notFound')}</Typography>
          <Button component={RouterLink} to="/blog" sx={{ mt: 2 }}>{t('blog.cta.backToList')}</Button>
        </Box>
        <Footer />
      </ThemeProvider>
    )
  }

  const category = t(`session7.posts.${id}.category`)
  const title = t(`session7.posts.${id}.title`)
  const paragraphs = t(`blog.posts.${id}.body`, { returnObjects: true })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />

      {/* Hero */}
      <Box sx={{ position: 'relative', height: { xs: 240, md: 380 }, overflow: 'hidden', bgcolor: '#000' }}>
        <Box component="img" src={hero} alt="" sx={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} />
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.55), rgba(0,0,0,.15))' }} />
        <Box sx={{ position: 'absolute', bottom: 20, left: { xs: 16, md: 48 }, right: 16 }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', px: 1.25, py: 0.5, borderRadius: 999, bgcolor: 'rgba(255,115,0,.12)', color: colors.accent, fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: .6 }}>{category}</Box>
          <Typography component="h1" sx={{ mt: 1, fontFamily: fonts.headings, color: '#fff', fontSize: { xs: 28, md: 44 }, letterSpacing: 1.1 }}>{title}</Typography>
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ px: { xs: 2, sm: 3, md: 6 }, py: { xs: 4, md: 6 } }}>
        <Grid container spacing={{ xs: 4, md: 6 }}>
          <Grid size={{ xs: 12, md: 8 }}>
            {paragraphs.map((p, i) => (
              <Typography key={i} sx={{ color: 'text.primary', mb: 2 }}>{p}</Typography>
            ))}
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ p: 2.5, borderRadius: 2, border: '1px solid #eee', bgcolor: '#fff' }}>
              <Typography sx={{ fontWeight: 700, mb: 1.5 }}>{t('blog.sidebar.title')}</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{t('blog.sidebar.desc')}</Typography>
              <Button component={RouterLink} to="/tours" variant="contained" fullWidth sx={{ mt: 2, bgcolor: colors.accent, '&:hover': { bgcolor: '#ff7f14' } }}>{t('tours.cta.plan')}</Button>
              <Button component={RouterLink} to="/blog" fullWidth sx={{ mt: 1 }}>{t('blog.cta.backToList')}</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Footer />
    </ThemeProvider>
  )
}
