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
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import { alpha } from '@mui/material/styles'
import { fonts, colors } from '../theme/tokens.js'
import { useTranslation } from 'react-i18next'
import { findImage } from '../lib/imageProvider.js'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import IosShareIcon from '@mui/icons-material/IosShare'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined'
import TwitterIcon from '@mui/icons-material/Twitter'
import CalendlyDialog from '../components/CalendlyDialog.jsx'
import { CALENDLY_URL } from '../config/calendly.js'
import Seo from '../components/Seo.jsx'
import { getSiteUrl, getBlogOverride, getAllBlogPosts } from '../lib/content.js'

export default function BlogPostPage() {
  const { id } = useParams()
  const { t, i18n } = useTranslation()
  const exists = React.useMemo(() => {
    const all = getAllBlogPosts()
    return all.some((x) => x.id === id)
  }, [id])
  const site = getSiteUrl()
  const postItem = React.useMemo(() => (getAllBlogPosts()).find((x) => x.id === id) || null, [id])
  const overrideFromList = postItem?._override || null
  const [hero, setHero] = React.useState('')
  const [calOpen, setCalOpen] = React.useState(false)
  const [relatedImages, setRelatedImages] = React.useState({})
  React.useEffect(() => {
    let alive = true
    ;(async () => {
      const bp = (getAllBlogPosts()).find((x) => x.id === id)
      if (!bp) return
      const over = bp._override
      if (over?.image) {
        if (alive) setHero(over.image)
        return
      }
      const url = await findImage({ query: over?.title || bp.query || id, orientation: 'landscape' })
      if (alive) setHero(url)
    })()
    return () => { alive = false }
  }, [id])

  // Load small thumbnails for related posts
  React.useEffect(() => {
    let alive = true
    ;(async () => {
      const candidates = getAllBlogPosts().filter((x) => x.id !== id).slice(0, 3)
      const entries = await Promise.all(
        candidates.map(async (p) => [p.id, await findImage({ query: p._override?.title || p.query, orientation: 'landscape' })])
      )
      if (alive) setRelatedImages(Object.fromEntries(entries))
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

  const override = getBlogOverride(id) || overrideFromList
  const category = override?.category || t(`session7.posts.${id}.category`, 'Blog')
  const title = override?.title || t(`session7.posts.${id}.title`, id)
  const paragraphsRaw = override?.body || t(`blog.posts.${id}.body`, { returnObjects: true })
  const paragraphs = Array.isArray(paragraphsRaw)
    ? paragraphsRaw
    : typeof paragraphsRaw === 'string'
      ? [paragraphsRaw]
      : []
  const date = override?.date || t(`blog.posts.${id}.date`, '')
  const tagsRaw = override?.tags || t(`blog.posts.${id}.tags`, { returnObjects: true })
  const tags = Array.isArray(tagsRaw)
    ? tagsRaw
    : typeof tagsRaw === 'string'
      ? tagsRaw.split(',').map((s) => s.trim()).filter(Boolean)
      : []
  const author = t('blog.post.author', 'Guará Travel Team')

  const wordCount = Array.isArray(paragraphs) ? paragraphs.join(' ').trim().split(/\s+/).filter(Boolean).length : 0
  const readingTime = Math.max(1, Math.round(wordCount / 200))

  const share = (network) => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    const text = `${title} — ${category}`
    let shareUrl = ''
    switch (network) {
      case 'native':
        if (navigator.share) { navigator.share({ title, text, url }).catch(() => {}) }
        else window.open(url, '_blank')
        return
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`
        break
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
        break
      default:
        shareUrl = url
    }
    window.open(shareUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Seo
        title={`${title} — Guará Travel`}
        description={paragraphs[0] || ''}
        canonical={`${site}/blog/${id}`}
        image={override?.image || hero}
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: title,
          datePublished: date || undefined,
          author: { '@type': 'Organization', name: author },
          image: override?.image || hero || undefined,
        }}
      />
      <Header />

      {/* Hero */}
      <Box sx={{ position: 'relative', height: { xs: 240, md: 420 }, overflow: 'hidden', bgcolor: '#000' }}>
  <Box component="img" src={hero} alt="" sx={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} />
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.6), rgba(0,0,0,.18))' }} />
        <Box sx={{ position: 'absolute', bottom: 22, left: { xs: 16, md: 48 }, right: 16 }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', px: 1.25, py: 0.5, borderRadius: 999, bgcolor: 'rgba(255,115,0,.12)', color: colors.accent, fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: .6 }}>{category}</Box>
          <Typography component="h1" sx={{ mt: 1, fontFamily: fonts.headings, color: '#fff', fontSize: { xs: 30, md: 46 }, letterSpacing: 1.1 }}>{title}</Typography>
          {/* Meta row */}
          <Stack direction="row" spacing={2} sx={{ mt: 0.75, color: 'rgba(255,255,255,0.9)' }}>
            {date && (
              <Stack direction="row" spacing={0.75} alignItems="center">
                <CalendarMonthIcon sx={{ fontSize: 18 }} />
                <Typography sx={{ fontSize: 13 }}>{date}</Typography>
              </Stack>
            )}
            <Stack direction="row" spacing={0.75} alignItems="center">
              <AccessTimeIcon sx={{ fontSize: 18 }} />
              <Typography sx={{ fontSize: 13 }}>{readingTime} {t('blog.post.minRead', 'min read')}</Typography>
            </Stack>
            <Stack direction="row" spacing={0.75} alignItems="center">
              <PersonOutlineIcon sx={{ fontSize: 18 }} />
              <Typography sx={{ fontSize: 13 }}>{t('blog.post.by', 'by')} {author}</Typography>
            </Stack>
          </Stack>
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ px: { xs: 2.5, md: 6 }, py: { xs: 4, md: 6 } }}>
        <Grid container spacing={{ xs: 4, md: 6 }}>
          <Grid size={{ xs: 12, md: 8 }}>
            {/* Pull quote style on 2nd paragraph if present */}
            {paragraphs.map((p, i) => (
              <Typography key={i} sx={{ color: 'text.primary', mb: 2.25, fontSize: { xs: 15.5, md: 16.5 }, lineHeight: 1.65, ...(i === 1 ? { position: 'relative', pl: 2, '&::before': { content: '""', position: 'absolute', left: 0, top: 4, bottom: 4, width: 3, borderRadius: 3, backgroundColor: colors.accent } } : {}) }}>
                {p}
              </Typography>
            ))}

            {/* Tags under article */}
            {Array.isArray(tags) && tags.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography sx={{ fontFamily: fonts.headings, letterSpacing: 1, textTransform: 'uppercase', fontSize: 13, color: colors.accent, mb: 1 }}>{t('blog.post.tags', 'Tags')}</Typography>
                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                  {tags.map((tag, i) => (
                    <Chip key={i} label={tag} size="small" sx={{ bgcolor: alpha(colors.accent, 0.08), color: colors.accent, fontWeight: 700 }} />
                  ))}
                </Stack>
              </Box>
            )}

            {/* Share row */}
            <Box sx={{ mt: 3 }}>
              <Typography sx={{ fontFamily: fonts.headings, letterSpacing: 1, textTransform: 'uppercase', fontSize: 13, color: colors.accent, mb: 1 }}>{t('blog.post.share', 'Share')}</Typography>
              <Stack direction="row" spacing={1.25}>
                <Button variant="outlined" size="small" onClick={() => share('native')} startIcon={<IosShareIcon />}>{t('blog.post.shareNative', 'Share')}</Button>
                <Button variant="outlined" size="small" onClick={() => share('whatsapp')} startIcon={<WhatsAppIcon />}>WhatsApp</Button>
                <Button variant="outlined" size="small" onClick={() => share('facebook')} startIcon={<FacebookOutlinedIcon />}>Facebook</Button>
                <Button variant="outlined" size="small" onClick={() => share('twitter')} startIcon={<TwitterIcon />}>Twitter</Button>
              </Stack>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ p: 2.5, borderRadius: 2, border: '1px solid #eee', bgcolor: '#fff', boxShadow: '0 6px 18px rgba(0,0,0,0.06)', position: { md: 'sticky' }, top: { md: 24 } }}>
              <Typography sx={{ fontWeight: 700, mb: 1.5 }}>{t('blog.sidebar.title')}</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{t('blog.sidebar.desc')}</Typography>
              <Button variant="contained" fullWidth onClick={() => setCalOpen(true)} sx={{ mt: 2, bgcolor: colors.accent, '&:hover': { bgcolor: '#ff7f14' } }}>{t('tours.cta.plan')}</Button>
              <Button component={RouterLink} to="/blog" fullWidth sx={{ mt: 1 }}>{t('blog.cta.backToList')}</Button>

              {/* Related posts */}
              <Divider sx={{ my: 2 }} />
              <Typography sx={{ fontWeight: 700, mb: 1 }}>{t('blog.post.related', 'Related posts')}</Typography>
              <Stack spacing={1.25}>
                {getAllBlogPosts().filter((x) => x.id !== id).slice(0, 3).map((p) => {
                  const o = p._override || null
                  const titleR = o?.title || t(`session7.posts.${p.id}.title`, p.id)
                  const categoryR = o?.category || t(`session7.posts.${p.id}.category`, 'Blog')
                  const img = o?.image || relatedImages[p.id]
                  return (
                    <Button key={p.id} component={RouterLink} to={`/blog/${p.id}`} sx={{ justifyContent: 'flex-start', textTransform: 'none', color: 'inherit', p: 1, borderRadius: 1, '&:hover': { backgroundColor: alpha('#000', 0.04) } }}>
                      <Box sx={{ width: 52, height: 40, borderRadius: 1, overflow: 'hidden', bgcolor: '#f5f5f5', mr: 1.25, flex: '0 0 auto' }}>
                        {img ? (
                          <Box component="img" src={img} alt="" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : null}
                      </Box>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography noWrap sx={{ fontSize: 14.5, fontWeight: 700 }}>{titleR}</Typography>
                        <Typography noWrap sx={{ fontSize: 12, color: colors.accent }}>{categoryR}</Typography>
                      </Box>
                    </Button>
                  )
                })}
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Footer />
      <CalendlyDialog open={calOpen} onClose={() => setCalOpen(false)} url={CALENDLY_URL} locale={i18n.language} />
    </ThemeProvider>
  )
}
