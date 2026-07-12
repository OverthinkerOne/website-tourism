import React from 'react'
import { Box, Divider, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'
import 'dayjs/locale/en'
import 'dayjs/locale/es'
import 'dayjs/locale/zh'
import { fonts, colors } from '../theme/tokens.js'
import { BuildTourStartButton } from './GuaraButton.jsx'
import { useTranslation } from 'react-i18next'
import { keyframes } from '@emotion/react'

const pulseGlow = keyframes`
  0% { opacity: .4; }
  50% { opacity: .85; }
  100% { opacity: .4; }
`

// Contract
// - Height: 226px, white background
// - Inner card: rounded 20px, 1px stroke #5F5F5F @ 50% opacity
// - Left label: "Build Your Own Tour" Bebas Neue 36px, uppercase, black, centered vertically, x=45px
// - Next: date picker "When is your trip?" centered vertically
// - Next: duration select "How Long is your trip" centered vertically
// - Next: CTA button "START" Bebas Neue 24px, uppercase, 20% letter spacing, white text, orange bg, attractive effects

export default function BuildTourSection() {
  const { t, i18n } = useTranslation()
  const [date, setDate] = React.useState(dayjs())
  const [duration, setDuration] = React.useState('3')

  // Sync dayjs locale with current i18n language
  const adapterLocale = React.useMemo(() => (i18n.language || 'en').split('-')[0], [i18n.language])
  React.useEffect(() => {
    dayjs.locale(adapterLocale)
  }, [adapterLocale])

  // Always use day/month/year format as requested
  const dateFormat = 'DD/MM/YYYY'

  const handleStart = React.useCallback(() => {
    try {
      const phone = '5545991120912' // same number used across the site
      const hasValidDate = dayjs.isDayjs(date) && date.isValid()
      const dateStr = hasValidDate ? date.format(dateFormat) : '-'
      const durationCount = parseInt(duration, 10) || 0
      const durationLabel = durationCount > 0 ? `${durationCount} ${durationCount === 1 ? 'day' : 'days'}` : '-'

      // Single-paragraph English message
      const message = `Hello! I'd like to build a custom tour. Travel date: ${dateStr}; Trip length: ${durationLabel}.`
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
      window.location.href = url
    } catch (e) {
      // no-op: in extremely old browsers fallback could be added
    }
  }, [date, duration])

  return (
    <Box component="section" sx={{ bgcolor: '#fff', minHeight: 226, display: 'grid', placeItems: 'center', overflowX: 'hidden', px: { xs: 1.5, sm: 2 }, py: { xs: 3, sm: 4 } }}>
      <Box
        sx={{
          // Responsive card container
          width: { xs: '100%', md: 'auto' },
          maxWidth: 'min(1100px, 96vw)',
          minHeight: 160,
          display: 'flex',
          alignItems: 'center',
          justifyContent: { xs: 'stretch', md: 'center' },
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          bgcolor: '#fff',
          borderRadius: '20px',
          border: '1px solid',
          borderColor: 'rgba(95,95,95,0.5)', // #5F5F5F @ 50%
          px: { xs: 2, sm: 3 },
          py: { xs: 2, sm: 2 },
          columnGap: { xs: 0, md: 2.5 },
          rowGap: { xs: 1.5, sm: 2 },
          boxSizing: 'border-box',
        }}
      >
        <Typography
          sx={{
            fontFamily: fonts.headings,
            fontSize: { xs: 24, sm: 28, md: 36 },
            fontWeight: 400,
            lineHeight: 1,
            textTransform: 'uppercase',
            color: '#000',
            mr: { xs: 0, md: 2 },
            whiteSpace: { xs: 'normal', md: 'nowrap' },
            overflowWrap: 'anywhere',
            textAlign: { xs: 'center', md: 'left' },
            width: { xs: '100%', md: 'auto' },
            mb: { xs: 1, md: 0 },
          }}
        >
          {t('buildTour.title')}
        </Typography>

  <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' }, borderColor: 'rgba(95,95,95,0.25)' }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, width: { xs: '100%', md: 'auto' } }}>
          <Box sx={{ width: '100%' }}>
            <InputLabel shrink sx={{ fontWeight: 500, color: colors.textPrimary }}>
              {t('buildTour.date')}
            </InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={adapterLocale}>
              <DatePicker
                views={['year', 'month', 'day']}
                openTo="day"
                format={dateFormat}
                value={date}
                onChange={(newVal) => {
                  if (dayjs.isDayjs(newVal) && newVal.isValid()) {
                    setDate(newVal)
                  }
                }}
                slotProps={{
                  textField: {
                    size: 'small',
                    fullWidth: true,
                    onKeyDown: (e) => {
                      if (e.key === 'Enter') e.preventDefault()
                    },
                    inputProps: { inputMode: 'numeric' },
                    sx: {
                      minWidth: { xs: '100%', md: 220 },
                      '& .MuiOutlinedInput-root': { borderRadius: 2 },
                    },
                  },
                }}
              />
            </LocalizationProvider>
          </Box>
        </Box>

  <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' }, borderColor: 'rgba(95,95,95,0.25)' }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, width: { xs: '100%', md: 'auto' } }}>
          <Box sx={{ width: '100%' }}>
            <InputLabel shrink sx={{ fontWeight: 500, color: colors.textPrimary }}>
              {t('buildTour.duration')}
            </InputLabel>
            <Select
              size="small"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              displayEmpty
              fullWidth
              sx={{ minWidth: { xs: '100%', md: 200 }, borderRadius: 2 }}
            >
              {[1,2,3,4,5,6,7,8,9,10].map((n) => (
                <MenuItem key={n} value={String(n)}>{t('buildTour.days', { count: n })}</MenuItem>
              ))}
            </Select>
          </Box>
        </Box>

  <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' }, borderColor: 'rgba(95,95,95,0.25)' }} />

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: { xs: 'auto', md: 220 }, width: { xs: '100%', md: 'auto' }, mt: { xs: 0.5, md: 0 } }}>
          <BuildTourStartButton
            onClick={handleStart}
          >
            {t('buildTour.start')}
          </BuildTourStartButton>
        </Box>
      </Box>
    </Box>
  )
}
