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
import Pagination from '@mui/material/Pagination'
import { fonts, colors } from '../theme/tokens.js'
import { useTranslation } from 'react-i18next'
import { findImage } from '../lib/imageProvider.js'
import { Link as RouterLink, useSearchParams } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import { getSiteUrl } from '../lib/content.js'
import { getAllBlogPosts } from '../lib/content.js'

export default function BlogListPage() {
  const { t } = useTranslation()
  const site = getSiteUrl()
  const [posts, setPosts] = React.useState(() => getAllBlogPosts())
  const [images, setImages] = React.useState({})
  const [searchParams, setSearchParams] = useSearchParams()
  const pageParam = searchParams.get('page')
  const page = Math.max(1, parseInt(pageParam || '1', 10) || 1)
  const pageSize = 6
  const totalPages = Math.max(1, Math.ceil(posts.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const startIdx = (currentPage - 1) * pageSize
  const pagePosts = posts.slice(startIdx, startIdx + pageSize)
  React.useEffect(() => {
    let alive = true
    ;(async () => {
      const list = getAllBlogPosts()
      const entries = await Promise.all(
        list.map(async (p) => {
          const url = p._override?.image || (await findImage({ query: p._override?.title || p.query, orientation: 'landscape' }))
          return [p.id, url]
        })
      )
      if (alive) setImages(Object.fromEntries(entries))
    })()
    const onStorage = () => { setPosts(getAllBlogPosts()) }
    window.addEventListener('storage', onStorage)
    return () => { alive = false }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Seo
        title={t('seo.blog.title', 'Blog — Guará Travel')}
        description={t('seo.blog.description', 'Stories, tips and inspiration for planning your Iguazu adventure.')}
        canonical={`${site}/blog${currentPage > 1 ? `?page=${currentPage}` : ''}`}
      />
      <Header />

      <Box component="section" sx={{ px: { xs: 2, sm: 3, md: 6 }, py: { xs: 6, md: 10 } }}>
        <Typography component="h1" sx={{ fontFamily: fonts.headings, fontSize: { xs: 36, md: 52 }, lineHeight: 1, letterSpacing: 1.2, textAlign: 'center', mb: 2 }}>
          {t('blog.list.title')}
        </Typography>
        <Typography sx={{ textAlign: 'center', color: 'text.secondary', maxWidth: 900, mx: 'auto', mb: 5 }}>
          {t('blog.list.subtitle')}
        </Typography>

        <Grid container spacing={{ xs: 3, md: 4 }}>
          {pagePosts.map((p) => {
            const override = p._override
            const category = override?.category || t(`session7.posts.${p.id}.category`)
            const title = override?.title || t(`session7.posts.${p.id}.title`)
            const excerpt = override?.excerpt || t(`session7.posts.${p.id}.excerpt`)
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

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              color="primary"
              onChange={(e, value) => {
                if (value === 1) setSearchParams({})
                else setSearchParams({ page: String(value) })
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            />
          </Box>
        )}
      </Box>

      <Footer />
    </ThemeProvider>
  )
}
