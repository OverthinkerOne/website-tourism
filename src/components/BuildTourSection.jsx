import React from 'react'
import { Box, Button, Divider, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'
import 'dayjs/locale/en'
import 'dayjs/locale/pt'
import 'dayjs/locale/es'
import 'dayjs/locale/fr'
import 'dayjs/locale/de'
import 'dayjs/locale/it'
import 'dayjs/locale/ja'
import 'dayjs/locale/ko'
import { fonts, colors } from '../theme/tokens.js'
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

  return (
    <Box component="section" sx={{ bgcolor: '#fff', height: 226, display: 'grid', placeItems: 'center' }}>
      <Box
        sx={{
          width: 'min(1180px, 92vw)',
          height: 160,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#fff',
          borderRadius: '20px',
          border: '1px solid',
          borderColor: 'rgba(95,95,95,0.5)', // #5F5F5F @ 50%
          px: 3,
          gap: 2.5,
        }}
      >
        <Typography
          sx={{
            fontFamily: fonts.headings,
            fontSize: 36,
            fontWeight: 400,
            lineHeight: 1,
            textTransform: 'uppercase',
            color: '#000',
            mr: 2,
            whiteSpace: 'nowrap',
          }}
        >
          {t('buildTour.title')}
        </Typography>

        <Divider orientation="vertical" flexItem sx={{ borderColor: 'rgba(95,95,95,0.25)' }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box>
            <InputLabel shrink sx={{ fontWeight: 500, color: colors.textPrimary }}>
              {t('buildTour.date')}
            </InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={adapterLocale}>
              <DatePicker
                value={date}
                onChange={(newVal) => setDate(newVal)}
                slotProps={{
                  textField: {
                    size: 'small',
                    sx: {
                      minWidth: 220,
                      '& .MuiOutlinedInput-root': { borderRadius: 2 },
                    },
                  },
                }}
              />
            </LocalizationProvider>
          </Box>
        </Box>

        <Divider orientation="vertical" flexItem sx={{ borderColor: 'rgba(95,95,95,0.25)' }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box>
            <InputLabel shrink sx={{ fontWeight: 500, color: colors.textPrimary }}>
              {t('buildTour.duration')}
            </InputLabel>
            <Select
              size="small"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              displayEmpty
              sx={{ minWidth: 200, borderRadius: 2 }}
            >
              <MenuItem value={"1"}>1 day</MenuItem>
              <MenuItem value={"2"}>2 days</MenuItem>
              <MenuItem value={"3"}>3 days</MenuItem>
              <MenuItem value={"4"}>4 days</MenuItem>
              <MenuItem value={"5"}>5 days</MenuItem>
              <MenuItem value={"6"}>6 days</MenuItem>
              <MenuItem value={"7"}>7 days</MenuItem>
              <MenuItem value={"8"}>8 days</MenuItem>
              <MenuItem value={"9"}>9 days</MenuItem>
              <MenuItem value={"10"}>10 days</MenuItem>
            </Select>
          </Box>
        </Box>

        <Divider orientation="vertical" flexItem sx={{ borderColor: 'rgba(95,95,95,0.25)' }} />

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 220 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              height: 48,
              px: 4,
              borderRadius: 2,
              // vivid orange base
              background: 'linear-gradient(180deg, #FF8A33 0%, #FF7300 100%)',
              boxShadow: '0 8px 18px rgba(255,115,0,0.40), 0 2px 8px rgba(0,0,0,0.16)',
              textTransform: 'uppercase',
              letterSpacing: '0.2em', // 20%
              fontFamily: fonts.headings,
              fontSize: 24,
              fontWeight: 400,
              color: '#FFF',
              position: 'relative',
              overflow: 'visible',
              isolation: 'isolate',
              // breathing outer glow
              '&::after': {
                content: '""',
                position: 'absolute',
                inset: -18,
                borderRadius: 'inherit',
                background: 'radial-gradient(circle, rgba(255,115,0,0.65) 0%, rgba(255,115,0,0.0) 70%)',
                filter: 'blur(18px)',
                zIndex: -2,
                pointerEvents: 'none',
                animation: `${pulseGlow} 2.4s ease-in-out infinite`,
              },
              '&:hover': {
                background: 'linear-gradient(180deg, #FFA45F 0%, #FF6A00 100%)',
                boxShadow: '0 14px 30px rgba(255,115,0,0.60), 0 6px 14px rgba(0,0,0,0.22), 0 0 22px rgba(255,115,0,0.45)',
                transform: 'translateY(-1px) scale(1.02)',
              },
              '&:hover::after': {
                opacity: 0.95,
              },
              transition: 'all 180ms ease',
            }}
          >
            {t('buildTour.start')}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
