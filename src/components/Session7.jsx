import React from 'react'
import { Box, Button } from '@mui/material'
import Typography from '@mui/material/Typography'
import { fonts, colors } from '../theme/tokens.js'
import ArticleIcon from '@mui/icons-material/Article'
import ExploreIcon from '@mui/icons-material/Explore'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { findImage } from '../lib/imageProvider.js'
import { useTranslation } from 'react-i18next'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { useNavigate } from 'react-router-dom'

const posts = [
  { id: 'inspiration-1', Icon: ExploreIcon, query: 'Iguazu waterfall viewpoint road trip' },
  { id: 'inspiration-2', Icon: CameraAltIcon, query: 'Iguazu falls sunrise photography long exposure' },
  { id: 'inspiration-3', Icon: FavoriteIcon, query: 'yerba mate argentina paraguay culture street food' },
  { id: 'inspiration-4', Icon: ArticleIcon, query: 'Iguazu hidden trail forest canopy butterflies' },
]

function BlogCard({ category, title, excerpt, Icon, image, readMoreLabel, id }) {
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        flex: '0 0 auto',
        width: { xs: 280, sm: 320, md: 360, lg: 400 },
        borderRadius: 2,
        bgcolor: '#fff',
        border: '1px solid #E5E5E5',
        overflow: 'hidden',
        boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
        transition: 'transform 220ms ease, box-shadow 220ms ease',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 16px 40px rgba(0,0,0,0.18)',
        },
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Image */}
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'relative', width: '100%', pt: '56.25%' }} />
        {image ? (
          <Box component="img" src={image} alt={title} sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
               onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${encodeURIComponent(title)}/800/600` }} />
        ) : (
          <Box sx={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: 'linear-gradient(135deg, #0ea5e9, #22d3ee)' }}>
            <Icon sx={{ fontSize: 44, color: '#fff', opacity: 0.9 }} />
          </Box>
        )}
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0))' }} />
      </Box>

      {/* Category */}
      <Box sx={{ px: 2, pt: 1 }}>
        <Box sx={{ display: 'inline-flex', alignItems: 'center', px: 1.25, py: 0.5, borderRadius: 999, bgcolor: 'rgba(255,115,0,0.12)', color: colors.accent, fontFamily: 'Kumbh Sans, system-ui, sans-serif', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.6 }}>
          {category}
        </Box>
      </Box>

      {/* Title */}
      <Box sx={{ px: 2, pt: 1.25 }}>
        <Typography sx={{ fontFamily: 'Kumbh Sans, system-ui, sans-serif', fontWeight: 800, fontSize: 20, lineHeight: 1.25, color: '#111' }}>
          {title}
        </Typography>
      </Box>

      {/* Excerpt */}
      <Box sx={{ px: 2, pt: 1, pb: 1.5 }}>
        <Typography sx={{ fontFamily: 'Kumbh Sans, system-ui, sans-serif', fontWeight: 500, fontSize: 15, lineHeight: 1.5, color: '#333', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {excerpt}
        </Typography>
      </Box>

      {/* Button (no navigation yet) */}
      <Box sx={{ px: 2, pb: 1.25, mt: 'auto' }}>
        <Button variant="contained" disableElevation onClick={() => navigate(`/blog/${id}`)} sx={{ width: '100%', bgcolor: colors.accent, color: '#fff', fontFamily: 'Kumbh Sans, system-ui, sans-serif', fontWeight: 700, textTransform: 'none', '&:hover': { bgcolor: '#ff7f14' } }}>
          {readMoreLabel}
        </Button>
      </Box>
    </Box>
  )
}

export default function Session7() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const items = React.useMemo(() => [...posts, ...posts, ...posts], [])
  const viewportRef = React.useRef(null)
  const [images, setImages] = React.useState({})
  const [isDragging, setIsDragging] = React.useState(false)
  const dragState = React.useRef({ startX: 0, startScroll: 0, pointerId: null })

  React.useEffect(() => {
    let alive = true
    ;(async () => {
      const entries = await Promise.all(
        posts.map(async (p) => {
          const url = await findImage({ query: p.query, orientation: 'landscape' })
          return [p.id, url]
        })
      )
      if (alive) setImages(Object.fromEntries(entries))
    })()
    return () => { alive = false }
  }, [])

  React.useEffect(() => {
    const vp = viewportRef.current
    if (!vp) return
    const unitWidth = vp.scrollWidth / 3
    if (unitWidth > 0) vp.scrollLeft = unitWidth
  }, [images])

  // Recenter on window resize to preserve seamless loop
  React.useEffect(() => {
    const handler = () => {
      const vp = viewportRef.current
      if (!vp) return
      const unitWidth = vp.scrollWidth / 3
      if (unitWidth > 0) vp.scrollLeft = unitWidth
    }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  React.useEffect(() => {
    let rafId
    const step = () => {
      const vp = viewportRef.current
      if (!vp) return
      if (!isDragging) vp.scrollLeft += 0.7
      const unitWidth = vp.scrollWidth / 3
      if (vp.scrollLeft >= unitWidth * 2) vp.scrollLeft -= unitWidth
      if (vp.scrollLeft <= 0) vp.scrollLeft += unitWidth
      rafId = requestAnimationFrame(step)
    }
    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [isDragging])

  // Ensure initial recenter after first paint as well (independent of images)
  React.useEffect(() => {
    const id = requestAnimationFrame(() => {
      const vp = viewportRef.current
      if (!vp) return
      const unitWidth = vp.scrollWidth / 3
      if (unitWidth > 0) vp.scrollLeft = unitWidth
    })
    return () => cancelAnimationFrame(id)
  }, [])

  const onPointerDown = (e) => {
    const vp = viewportRef.current
    if (!vp) return
    vp.setPointerCapture?.(e.pointerId)
    dragState.current = { startX: e.clientX, startScroll: vp.scrollLeft, pointerId: e.pointerId }
    setIsDragging(true)
    e.preventDefault()
  }
  const onPointerMove = (e) => {
    if (!isDragging) return
    const vp = viewportRef.current
    if (!vp) return
    const dx = e.clientX - dragState.current.startX
    vp.scrollLeft = dragState.current.startScroll - dx
    const unitWidth = vp.scrollWidth / 3
    if (vp.scrollLeft >= unitWidth * 2) vp.scrollLeft -= unitWidth
    if (vp.scrollLeft <= 0) vp.scrollLeft += unitWidth
  }
  const endDrag = () => {
    const vp = viewportRef.current
    if (!vp) return
    if (dragState.current.pointerId) {
      try { vp.releasePointerCapture?.(dragState.current.pointerId) } catch {}
    }
    setIsDragging(false)
  }

  return (
    <Box component="section" sx={{ position: 'relative', width: '100%', overflow: 'hidden', bgcolor: '#fff' }}>
  {/* Content (papers removed) */}
  <Box sx={{ position: 'relative', zIndex: 1, width: 'min(1300px, 96vw)', mx: 'auto', py: { xs: 4, md: 6 }, color: '#000', display: 'flex', flexDirection: 'column' }}>
        {/* Title and subtitle */}
        <Box sx={{ textAlign: 'center', maxWidth: 1000, mx: 'auto', px: 2 }}>
          <Typography component="h2" sx={{ m: 0, fontFamily: fonts.headings, fontWeight: 400, fontSize: { xs: 34, md: 48 }, lineHeight: 1.08, textTransform: 'uppercase', color: '#000' }}>
            {t('session7.title')}
          </Typography>
          <Typography sx={{ mt: 1, fontFamily: 'Kumbh Sans, system-ui, sans-serif', fontWeight: 500, fontSize: { xs: 15, md: 17 }, color: 'rgba(0,0,0,0.78)', lineHeight: 1.55 }}>
            {t('session7.subtitle')}
          </Typography>
        </Box>

        {/* Carousel (slow) */}
  <Box sx={{ mt: { xs: 2, md: 3 }, position: 'relative', display: 'flex' }}>
          {/* Edge fade masks (softer and narrower to not hide cards) */}
            <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2, background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 4%, rgba(255,255,255,0) 96%, rgba(255,255,255,1) 100%)' }} />

          {/* Viewport */}
          <Box ref={viewportRef} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={endDrag} onPointerCancel={endDrag} sx={{ overflowX: 'hidden', overflowY: 'visible', cursor: isDragging ? 'grabbing' : 'grab', touchAction: 'pan-y', width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'stretch', gap: { xs: 2.5, md: 3 }, px: { xs: 1.5, md: 2 } }}>
              {items.map((post, idx) => {
                const category = t(`session7.posts.${post.id}.category`)
                const title = t(`session7.posts.${post.id}.title`)
                const excerpt = t(`session7.posts.${post.id}.excerpt`)
                const Icon = post.Icon
                const image = images[post.id]
                return (
                  <Box key={post.id + '-' + idx}>
                    <BlogCard id={post.id} category={category} title={title} excerpt={excerpt} Icon={Icon} image={image} readMoreLabel={t('session7.readMore')} />
                  </Box>
                )
              })}
            </Box>
          </Box>
        </Box>

      </Box>
      {/* Footer CTA: See All Posts (absolute, does not affect cards height) */}
  <Box sx={{ position: 'absolute', left: 0, right: 0, bottom: { xs: 4, md: 8 }, textAlign: 'center', zIndex: 2 }}>
        <Button
          variant="text"
          onClick={() => navigate('/blog')}
          aria-label={t('session7.seeAllPosts', 'See All Posts')}
          sx={{
            px: 0,
            minWidth: 0,
            color: '#000',
            fontFamily: 'Kumbh Sans, system-ui, sans-serif',
            fontWeight: 700,
            textTransform: 'none',
            bgcolor: 'transparent',
            '&:hover': { color: '#FF7300', bgcolor: 'transparent' },
          }}
          endIcon={<ArrowForwardIosIcon sx={{ fontSize: 16 }} />}
        >
          {t('session7.seeAllPosts', 'See All Posts')}
        </Button>
      </Box>
    </Box>
  )
}
