import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '../theme.js'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'
import { alpha } from '@mui/material/styles'
import { colors, fonts } from '../theme/tokens.js'
import { useTranslation } from 'react-i18next'
import {
  loadOverrides,
  saveOverrides,
  getAllBlogPosts,
  getAllTours,
  upsertBlog,
  upsertTour,
  removeBlog,
  removeTour,
  getAllTestimonials,
  upsertTestimonial,
  removeTestimonial,
  getAllFaqs,
  upsertFaq,
  removeFaq,
  getAllRestaurants,
  upsertRestaurant,
  removeRestaurant,
} from '../lib/content.js'

function SectionHeader({ title, action }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
      <Typography sx={{ fontFamily: fonts.headings, letterSpacing: 1, textTransform: 'uppercase', fontSize: 14, color: colors.accent }}>{title}</Typography>
      {action}
    </Box>
  )
}

export default function AdminPage() {
  const { t } = useTranslation()
  const [tab, setTab] = React.useState(0)
  const [auth, setAuth] = React.useState('')
  const [ok, setOk] = React.useState(false)
  const pass = import.meta?.env?.VITE_ADMIN_PASS || 'guara'

  const [blogList, setBlogList] = React.useState(getAllBlogPosts())
  const [tourList, setTourList] = React.useState(getAllTours())
  const [restaurantList, setRestaurantList] = React.useState(getAllRestaurants())
  const [testimonials, setTestimonials] = React.useState(getAllTestimonials())
  const [faqs, setFaqs] = React.useState(getAllFaqs())
  const [currentBlog, setCurrentBlog] = React.useState({ id: '', title: '', category: '', excerpt: '', body: '', date: '', tags: '', image: '', published: true })
  const [currentTour, setCurrentTour] = React.useState({ id: '', title: '', countryCode: 'br', short: '', intro: '', highlights: '', includes: '', tips: '', image: '', duration: '', level: '', season: '', family: '', published: true })
  const [currentTestimonial, setCurrentTestimonial] = React.useState({ id: '', name: '', country: 'BR', title: '', text: '', tags: '', rating: '5', date: '', published: true })
  const [currentFaq, setCurrentFaq] = React.useState({ id: '', question: '', answer: '', published: true })
  const [currentRestaurant, setCurrentRestaurant] = React.useState({ id: '', name: '', city: '', cuisine: '', priceRange: '', short: '', intro: '', highlights: '', services: '', tips: '', address: '', phone: '', website: '', instagram: '', openingHours: '', rating: '', image: '', published: true })

  React.useEffect(() => {
    setBlogList(getAllBlogPosts())
    setTourList(getAllTours())
    setRestaurantList(getAllRestaurants())
    setTestimonials(getAllTestimonials())
    setFaqs(getAllFaqs())
  }, [ok])

  const exportJson = () => {
    const data = loadOverrides()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'guaratravel-content.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const importJson = (file) => {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result)
        saveOverrides(parsed)
        setBlogList(getAllBlogPosts())
        setTourList(getAllTours())
        setRestaurantList(getAllRestaurants())
      } catch {}
    }
    reader.readAsText(file)
  }

  const handleSaveBlog = () => {
    const payload = {
      id: currentBlog.id.trim(),
      title: currentBlog.title.trim(),
      category: currentBlog.category.trim(),
      excerpt: currentBlog.excerpt.trim(),
      body: currentBlog.body.split('\n\n').map((p) => p.trim()).filter(Boolean),
      date: currentBlog.date.trim(),
      tags: currentBlog.tags.split(',').map((t) => t.trim()).filter(Boolean),
      image: currentBlog.image.trim(),
      published: !!currentBlog.published,
    }
    if (!payload.id) return
    upsertBlog(payload)
    setBlogList(getAllBlogPosts())
    setCurrentBlog({ id: '', title: '', category: '', excerpt: '', body: '', date: '', tags: '', image: '', published: true })
  }

  const handleSaveTour = () => {
    const payload = {
      id: currentTour.id.trim(),
      title: currentTour.title.trim(),
      countryCode: currentTour.countryCode || 'br',
      short: currentTour.short.trim(),
      intro: currentTour.intro.trim(),
      highlights: currentTour.highlights.split('\n').map((t) => t.trim()).filter(Boolean),
      includes: currentTour.includes.split('\n').map((t) => t.trim()).filter(Boolean),
      tips: currentTour.tips.split('\n').map((t) => t.trim()).filter(Boolean),
      image: currentTour.image.trim(),
      duration: currentTour.duration.trim(),
      level: currentTour.level.trim(),
      season: currentTour.season.trim(),
      family: currentTour.family.trim(),
      published: !!currentTour.published,
    }
    if (!payload.id) return
    upsertTour(payload)
    setTourList(getAllTours())
    setCurrentTour({ id: '', title: '', countryCode: 'br', short: '', intro: '', highlights: '', includes: '', tips: '', image: '', duration: '', level: '', season: '', family: '', published: true })
  }

  const handleSaveTestimonial = () => {
    const payload = {
      id: currentTestimonial.id.trim(),
      name: currentTestimonial.name.trim(),
      country: currentTestimonial.country.trim().toUpperCase(),
      title: currentTestimonial.title.trim(),
      text: currentTestimonial.text.trim(),
      tags: currentTestimonial.tags.split(',').map((t) => t.trim()).filter(Boolean),
      rating: Math.max(0, Math.min(5, parseFloat(currentTestimonial.rating) || 5)),
      date: currentTestimonial.date.trim(),
      published: !!currentTestimonial.published,
    }
    if (!payload.id) return
    upsertTestimonial(payload)
    setTestimonials(getAllTestimonials())
    setCurrentTestimonial({ id: '', name: '', country: 'BR', title: '', text: '', tags: '', rating: '5', date: '', published: true })
  }

  const handleSaveFaq = () => {
    const payload = {
      id: currentFaq.id.trim(),
      question: currentFaq.question.trim(),
      answer: currentFaq.answer.trim(),
      published: !!currentFaq.published,
    }
    if (!payload.id) return
    upsertFaq(payload)
    setFaqs(getAllFaqs())
    setCurrentFaq({ id: '', question: '', answer: '', published: true })
  }

  const handleSaveRestaurant = () => {
    const payload = {
      id: currentRestaurant.id.trim(),
      name: currentRestaurant.name.trim(),
      city: currentRestaurant.city.trim(),
      cuisine: currentRestaurant.cuisine.split(',').map((t) => t.trim()).filter(Boolean),
      priceRange: currentRestaurant.priceRange.trim(),
      short: currentRestaurant.short.trim(),
      intro: currentRestaurant.intro.trim(),
      highlights: currentRestaurant.highlights.split('\n').map((t) => t.trim()).filter(Boolean),
      services: currentRestaurant.services.split('\n').map((t) => t.trim()).filter(Boolean),
      tips: currentRestaurant.tips.split('\n').map((t) => t.trim()).filter(Boolean),
      address: currentRestaurant.address.trim(),
      phone: currentRestaurant.phone.trim(),
      website: currentRestaurant.website.trim(),
      instagram: currentRestaurant.instagram.trim(),
      openingHours: currentRestaurant.openingHours.trim(),
      rating: currentRestaurant.rating ? Number(currentRestaurant.rating) : undefined,
      image: currentRestaurant.image.trim(),
      published: !!currentRestaurant.published,
    }
    if (!payload.id) return
    upsertRestaurant(payload)
    setRestaurantList(getAllRestaurants())
    setCurrentRestaurant({ id: '', name: '', city: '', cuisine: '', priceRange: '', short: '', intro: '', highlights: '', services: '', tips: '', address: '', phone: '', website: '', instagram: '', openingHours: '', rating: '', image: '', published: true })
  }

  const removeBlogItem = (id) => { removeBlog(id); setBlogList(getAllBlogPosts()) }
  const removeTourItem = (id) => { removeTour(id); setTourList(getAllTours()) }
  const removeRestaurantItem = (id) => { removeRestaurant(id); setRestaurantList(getAllRestaurants()) }

  // Build combined lists for Testimonials and FAQs including static baseline for editing
  const STATIC_TESTIMONIAL_IDS = ['t1','t2','t3','t4','t5','t6']
  const TEST_COUNTRIES = { t1: 'BR', t2: 'US', t3: 'AR', t4: 'FR', t5: 'DE', t6: 'IT' }
  const baselineTestimonials = React.useMemo(() => {
    return STATIC_TESTIMONIAL_IDS.map((id) => ({
      id,
      isStatic: true,
      name: t(`session9.items.${id}.name`, t(`session9.items.${id}.name`, 'Traveller')) || t(`session9.items.${id}.name`, 'Traveller'),
      country: TEST_COUNTRIES[id] || 'US',
      title: t(`session9.items.${id}.title`, ''),
      text: t(`session9.items.${id}.text`, ''),
      tags: t(`session9.items.${id}.tags`, { returnObjects: true }) || [],
      rating: Number(t(`session9.items.${id}.rating`, '5')) || 5,
      date: t(`session9.items.${id}.date`, ''),
      published: true,
    }))
  }, [t])
  const combinedTestimonials = React.useMemo(() => {
    const map = new Map(baselineTestimonials.map((x) => [x.id, x]))
    for (const it of testimonials) {
      map.set(it.id, { ...it, isStatic: false })
    }
    return Array.from(map.values())
  }, [baselineTestimonials, testimonials])

  const STATIC_FAQ_IDS = ['q1','q2','q3','q4','q5','q6']
  const baselineFaqs = React.useMemo(() => {
    return STATIC_FAQ_IDS.map((id) => ({
      id,
      isStatic: true,
      question: t(`session8.items.${id}.question`, ''),
      answer: t(`session8.items.${id}.answer`, ''),
      published: true,
    }))
  }, [t])
  const combinedFaqs = React.useMemo(() => {
    const map = new Map(baselineFaqs.map((x) => [x.id, x]))
    for (const it of faqs) map.set(it.id, { ...it, isStatic: false })
    return Array.from(map.values())
  }, [baselineFaqs, faqs])

  if (!ok) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Box sx={{ px: { xs: 2, sm: 3, md: 6 }, py: 8 }}>
          <Paper sx={{ p: 3, maxWidth: 500 }}>
            <Typography sx={{ fontWeight: 700, mb: 1 }}>Admin access</Typography>
            <Typography sx={{ color: 'text.secondary', mb: 2 }}>Enter passcode to continue.</Typography>
            <TextField fullWidth type="password" value={auth} onChange={(e) => setAuth(e.target.value)} label="Passcode" />
            <Button variant="contained" sx={{ mt: 2, bgcolor: colors.accent }} onClick={() => setOk(auth === pass)}>Enter</Button>
          </Paper>
        </Box>
        <Footer />
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Box sx={{ px: { xs: 2, sm: 3, md: 6 }, py: 4 }}>
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Button variant="outlined" onClick={exportJson}>Export JSON</Button>
          <Button component="label" variant="outlined">Import JSON
            <input type="file" hidden accept="application/json" onChange={(e) => e.target.files?.[0] && importJson(e.target.files[0])} />
          </Button>
        </Box>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
          <Tab label="Blog" />
          <Tab label="Tours" />
          <Tab label="Restaurants" />
          <Tab label="Testimonials" />
          <Tab label="FAQs" />
        </Tabs>

        {tab === 0 && (
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <SectionHeader title="Create / Edit Blog Post" />
              <Stack spacing={1.25}>
                <TextField label="ID (slug)" value={currentBlog.id} onChange={(e) => setCurrentBlog({ ...currentBlog, id: e.target.value })} />
                <TextField label="Title" value={currentBlog.title} onChange={(e) => setCurrentBlog({ ...currentBlog, title: e.target.value })} />
                <TextField label="Category" value={currentBlog.category} onChange={(e) => setCurrentBlog({ ...currentBlog, category: e.target.value })} />
                <TextField label="Excerpt" value={currentBlog.excerpt} onChange={(e) => setCurrentBlog({ ...currentBlog, excerpt: e.target.value })} />
                <TextField label="Body (paragraphs, separated by blank line)" multiline minRows={6} value={currentBlog.body} onChange={(e) => setCurrentBlog({ ...currentBlog, body: e.target.value })} />
                <TextField label="Date (YYYY-MM-DD)" value={currentBlog.date} onChange={(e) => setCurrentBlog({ ...currentBlog, date: e.target.value })} />
                <TextField label="Tags (comma separated)" value={currentBlog.tags} onChange={(e) => setCurrentBlog({ ...currentBlog, tags: e.target.value })} />
                <TextField label="Image URL" value={currentBlog.image} onChange={(e) => setCurrentBlog({ ...currentBlog, image: e.target.value })} />
                <Button variant="contained" sx={{ bgcolor: colors.accent }} onClick={handleSaveBlog}>Save</Button>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <SectionHeader title="Posts (including static)" />
              <Stack spacing={1}>
                {blogList.map((b) => (
                  <Paper
                    key={b.id}
                    sx={{ p: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
                    onClick={() => {
                      const ov = b._override || {}
                      setCurrentBlog({
                        id: b.id,
                        title: ov.title || '',
                        category: ov.category || '',
                        excerpt: ov.excerpt || '',
                        body: Array.isArray(ov.body) ? ov.body.join('\n\n') : (ov.body || ''),
                        date: ov.date || '',
                        tags: Array.isArray(ov.tags) ? ov.tags.join(', ') : (ov.tags || ''),
                        image: ov.image || '',
                        published: ov.published ?? true,
                      })
                    }}
                  >
                    <Box>
                      <Typography sx={{ fontWeight: 700 }}>{b.id}</Typography>
                      <Typography sx={{ color: 'text.secondary', fontSize: 13 }}>{b._override?.title || ''}</Typography>
                    </Box>
                    <Box>
                      <Button size="small" color="error" onClick={(e) => { e.stopPropagation(); removeBlogItem(b.id) }}>Remove</Button>
                    </Box>
                  </Paper>
                ))}
              </Stack>
            </Grid>
          </Grid>
        )}

        {tab === 1 && (
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <SectionHeader title="Create / Edit Tour" />
              <Stack spacing={1.25}>
                <TextField label="ID (slug)" value={currentTour.id} onChange={(e) => setCurrentTour({ ...currentTour, id: e.target.value })} />
                <TextField label="Title (used in dynamic only)" value={currentTour.title} onChange={(e) => setCurrentTour({ ...currentTour, title: e.target.value })} />
                <TextField label="Country code (br/ar/py)" value={currentTour.countryCode} onChange={(e) => setCurrentTour({ ...currentTour, countryCode: e.target.value })} />
                <TextField label="Short description" value={currentTour.short} onChange={(e) => setCurrentTour({ ...currentTour, short: e.target.value })} />
                <TextField label="Intro" multiline minRows={3} value={currentTour.intro} onChange={(e) => setCurrentTour({ ...currentTour, intro: e.target.value })} />
                {/* Meta fields */}
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 1 }}>
                  <TextField label="Duration (e.g., Half-day)" placeholder="Half-day" value={currentTour.duration} onChange={(e) => setCurrentTour({ ...currentTour, duration: e.target.value })} />
                  <TextField label="Level (e.g., Easy)" placeholder="Easy" value={currentTour.level} onChange={(e) => setCurrentTour({ ...currentTour, level: e.target.value })} />
                  <TextField label="Best season (e.g., All year)" placeholder="All year" value={currentTour.season} onChange={(e) => setCurrentTour({ ...currentTour, season: e.target.value })} />
                  <TextField label="Family (e.g., Yes)" placeholder="Yes" value={currentTour.family} onChange={(e) => setCurrentTour({ ...currentTour, family: e.target.value })} />
                </Box>
                <TextField label="Highlights (one per line)" multiline minRows={4} value={currentTour.highlights} onChange={(e) => setCurrentTour({ ...currentTour, highlights: e.target.value })} />
                <TextField label="Includes (one per line)" multiline minRows={4} value={currentTour.includes} onChange={(e) => setCurrentTour({ ...currentTour, includes: e.target.value })} />
                <TextField label="Tips (one per line)" multiline minRows={4} value={currentTour.tips} onChange={(e) => setCurrentTour({ ...currentTour, tips: e.target.value })} />
                <TextField label="Image URL" value={currentTour.image} onChange={(e) => setCurrentTour({ ...currentTour, image: e.target.value })} />
                <Button variant="contained" sx={{ bgcolor: colors.accent }} onClick={handleSaveTour}>Save</Button>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <SectionHeader title="Tours (including static)" />
              <Stack spacing={1}>
                {tourList.map((t) => (
                  <Paper
                    key={t.id}
                    sx={{ p: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
                    onClick={() => {
                      const ov = t._override || {}
                      setCurrentTour({
                        id: t.id,
                        title: ov.title || '',
                        countryCode: ov.countryCode || t.countryCode || 'br',
                        short: ov.short || '',
                        intro: ov.intro || '',
                        highlights: Array.isArray(ov.highlights) ? ov.highlights.join('\n') : (ov.highlights || ''),
                        includes: Array.isArray(ov.includes) ? ov.includes.join('\n') : (ov.includes || ''),
                        tips: Array.isArray(ov.tips) ? ov.tips.join('\n') : (ov.tips || ''),
                        image: ov.image || '',
                        duration: ov.duration || '',
                        level: ov.level || '',
                        season: ov.season || '',
                        family: ov.family || '',
                        published: ov.published ?? true,
                      })
                    }}
                  >
                    <Box>
                      <Typography sx={{ fontWeight: 700 }}>{t.id}</Typography>
                      <Typography sx={{ color: 'text.secondary', fontSize: 13 }}>{t._override?.title || ''}</Typography>
                    </Box>
                    <Box>
                      <Button size="small" color="error" onClick={(e) => { e.stopPropagation(); removeTourItem(t.id) }}>Remove</Button>
                    </Box>
                  </Paper>
                ))}
              </Stack>
            </Grid>
          </Grid>
        )}

        {tab === 2 && (
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <SectionHeader title="Create / Edit Restaurant" />
              <Stack spacing={1.25}>
                <TextField label="ID (slug)" value={currentRestaurant.id} onChange={(e) => setCurrentRestaurant({ ...currentRestaurant, id: e.target.value })} />
                <TextField label="Name" value={currentRestaurant.name} onChange={(e) => setCurrentRestaurant({ ...currentRestaurant, name: e.target.value })} />
                <TextField label="City" value={currentRestaurant.city} onChange={(e) => setCurrentRestaurant({ ...currentRestaurant, city: e.target.value })} />
                <TextField label="Cuisine (comma separated)" value={currentRestaurant.cuisine} onChange={(e) => setCurrentRestaurant({ ...currentRestaurant, cuisine: e.target.value })} />
                <TextField label="Price range (e.g., $$-$$$)" value={currentRestaurant.priceRange} onChange={(e) => setCurrentRestaurant({ ...currentRestaurant, priceRange: e.target.value })} />
                <TextField label="Short description" value={currentRestaurant.short} onChange={(e) => setCurrentRestaurant({ ...currentRestaurant, short: e.target.value })} />
                <TextField label="Intro" multiline minRows={3} value={currentRestaurant.intro} onChange={(e) => setCurrentRestaurant({ ...currentRestaurant, intro: e.target.value })} />
                <TextField label="Highlights (one per line)" multiline minRows={4} value={currentRestaurant.highlights} onChange={(e) => setCurrentRestaurant({ ...currentRestaurant, highlights: e.target.value })} />
                <TextField label="Services (one per line)" multiline minRows={4} value={currentRestaurant.services} onChange={(e) => setCurrentRestaurant({ ...currentRestaurant, services: e.target.value })} />
                <TextField label="Tips (one per line)" multiline minRows={3} value={currentRestaurant.tips} onChange={(e) => setCurrentRestaurant({ ...currentRestaurant, tips: e.target.value })} />
                <TextField label="Address" value={currentRestaurant.address} onChange={(e) => setCurrentRestaurant({ ...currentRestaurant, address: e.target.value })} />
                <TextField label="Phone" value={currentRestaurant.phone} onChange={(e) => setCurrentRestaurant({ ...currentRestaurant, phone: e.target.value })} />
                <TextField label="Website URL" value={currentRestaurant.website} onChange={(e) => setCurrentRestaurant({ ...currentRestaurant, website: e.target.value })} />
                <TextField label="Instagram URL" value={currentRestaurant.instagram} onChange={(e) => setCurrentRestaurant({ ...currentRestaurant, instagram: e.target.value })} />
                <TextField label="Opening hours" value={currentRestaurant.openingHours} onChange={(e) => setCurrentRestaurant({ ...currentRestaurant, openingHours: e.target.value })} />
                <TextField label="Rating (0-5)" value={currentRestaurant.rating} onChange={(e) => setCurrentRestaurant({ ...currentRestaurant, rating: e.target.value })} />
                <TextField label="Image URL" value={currentRestaurant.image} onChange={(e) => setCurrentRestaurant({ ...currentRestaurant, image: e.target.value })} />
                <Button variant="contained" sx={{ bgcolor: colors.accent }} onClick={handleSaveRestaurant}>Save</Button>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <SectionHeader title="Restaurants (including static)" />
              <Stack spacing={1}>
                {restaurantList.map((r) => (
                  <Paper
                    key={r.id}
                    sx={{ p: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
                    onClick={() => {
                      const ov = r._override || {}
                      setCurrentRestaurant({
                        id: r.id,
                        name: ov.name || '',
                        city: ov.city || '',
                        cuisine: Array.isArray(ov.cuisine) ? ov.cuisine.join(', ') : (ov.cuisine || ''),
                        priceRange: ov.priceRange || '',
                        short: ov.short || '',
                        intro: ov.intro || '',
                        highlights: Array.isArray(ov.highlights) ? ov.highlights.join('\n') : (ov.highlights || ''),
                        services: Array.isArray(ov.services) ? ov.services.join('\n') : (ov.services || ''),
                        tips: Array.isArray(ov.tips) ? ov.tips.join('\n') : (ov.tips || ''),
                        address: ov.address || '',
                        phone: ov.phone || '',
                        website: ov.website || '',
                        instagram: ov.instagram || '',
                        openingHours: ov.openingHours || '',
                        rating: String(ov.rating ?? ''),
                        image: ov.image || '',
                        published: ov.published ?? true,
                      })
                    }}
                  >
                    <Box>
                      <Typography sx={{ fontWeight: 700 }}>{r.id}</Typography>
                      <Typography sx={{ color: 'text.secondary', fontSize: 13 }}>{r._override?.name || ''}</Typography>
                    </Box>
                    <Box>
                      <Button size="small" color="error" onClick={(e) => { e.stopPropagation(); removeRestaurantItem(r.id) }}>Remove</Button>
                    </Box>
                  </Paper>
                ))}
              </Stack>
            </Grid>
          </Grid>
        )}

        {tab === 3 && (
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <SectionHeader title="Create / Edit Testimonial" />
              <Stack spacing={1.25}>
                <TextField label="ID" value={currentTestimonial.id} onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, id: e.target.value })} />
                <TextField label="Name" value={currentTestimonial.name} onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, name: e.target.value })} />
                <TextField label="Country (2-letter)" value={currentTestimonial.country} onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, country: e.target.value })} />
                <TextField label="Title" value={currentTestimonial.title} onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, title: e.target.value })} />
                <TextField label="Text" multiline minRows={4} value={currentTestimonial.text} onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, text: e.target.value })} />
                <TextField label="Tags (comma separated)" value={currentTestimonial.tags} onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, tags: e.target.value })} />
                <TextField label="Rating (0-5)" value={currentTestimonial.rating} onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, rating: e.target.value })} />
                <TextField label="Date (YYYY-MM)" value={currentTestimonial.date} onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, date: e.target.value })} />
                <Button variant="contained" sx={{ bgcolor: colors.accent }} onClick={handleSaveTestimonial}>Save</Button>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <SectionHeader title="Testimonials" />
              <Stack spacing={1}>
                {combinedTestimonials.map((it) => (
                  <Paper key={it.id} sx={{ p: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => setCurrentTestimonial({
                    id: it.id,
                    name: it.name || '',
                    country: it.country || 'US',
                    title: it.title || '',
                    text: it.text || '',
                    tags: Array.isArray(it.tags) ? it.tags.join(', ') : '',
                    rating: String(it.rating ?? '5'),
                    date: it.date || '',
                    published: it.published ?? true,
                  })}>
                    <Box>
                      <Typography sx={{ fontWeight: 700 }}>{it.name || '(no name)'}</Typography>
                      <Typography sx={{ color: 'text.secondary', fontSize: 13 }}>{it.title || ''}</Typography>
                    </Box>
                    <Box>
                      {!it.isStatic && (
                        <Button size="small" color="error" onClick={(e) => { e.stopPropagation(); removeTestimonial(it.id); setTestimonials(getAllTestimonials()) }}>Remove</Button>
                      )}
                    </Box>
                  </Paper>
                ))}
              </Stack>
            </Grid>
          </Grid>
        )}

        {tab === 4 && (
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <SectionHeader title="Create / Edit FAQ" />
              <Stack spacing={1.25}>
                <TextField label="ID" value={currentFaq.id} onChange={(e) => setCurrentFaq({ ...currentFaq, id: e.target.value })} />
                <TextField label="Question" value={currentFaq.question} onChange={(e) => setCurrentFaq({ ...currentFaq, question: e.target.value })} />
                <TextField label="Answer" multiline minRows={4} value={currentFaq.answer} onChange={(e) => setCurrentFaq({ ...currentFaq, answer: e.target.value })} />
                <Button variant="contained" sx={{ bgcolor: colors.accent }} onClick={handleSaveFaq}>Save</Button>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <SectionHeader title="FAQs" />
              <Stack spacing={1}>
                {combinedFaqs.map((f) => (
                  <Paper key={f.id} sx={{ p: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => setCurrentFaq({ id: f.id, question: f.question || '', answer: f.answer || '', published: f.published ?? true })}>
                    <Box>
                      <Typography sx={{ fontWeight: 700 }}>{f.question}</Typography>
                      <Typography sx={{ color: 'text.secondary', fontSize: 13 }}>{f.answer}</Typography>
                    </Box>
                    <Box>
                      {!f.isStatic && (
                        <Button size="small" color="error" onClick={(e) => { e.stopPropagation(); removeFaq(f.id); setFaqs(getAllFaqs()) }}>Remove</Button>
                      )}
                    </Box>
                  </Paper>
                ))}
              </Stack>
            </Grid>
          </Grid>
        )}
      </Box>
      <Footer />
    </ThemeProvider>
  )
}
