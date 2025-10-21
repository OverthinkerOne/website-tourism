import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { CALENDLY_URL } from '../config/calendly.js'
import { ensureCalendlyStyles, loadCalendlyScript } from '../lib/calendly.js'

export default function ScheduleCallDialog({ open, onClose }) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const { t, i18n } = useTranslation()
  const [step, setStep] = React.useState('form') // form | schedule
  const [loading, setLoading] = React.useState(false)
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    phone: '',
    partySize: '',
    startDate: '',
    endDate: '',
    message: '',
  })
  const containerRef = React.useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleStartSchedule = async () => {
    // Basic validation
    if (!form.name || !form.email) return
    setLoading(true)
    setStep('schedule')
    try {
      await ensureCalendlyStyles()
      const Calendly = await loadCalendlyScript()
      const customAnswers = {}
      const dateRange = form.startDate && form.endDate ? `${form.startDate} - ${form.endDate}` : ''
      if (dateRange) customAnswers.a1 = dateRange
      if (form.partySize) customAnswers.a2 = String(form.partySize)
      if (form.phone) customAnswers.a3 = form.phone
      if (form.message) customAnswers.a4 = form.message
      const qs = new URLSearchParams()
      if (i18n.language) qs.set('locale', i18n.language)
      const url = qs.toString() ? `${CALENDLY_URL}${CALENDLY_URL.includes('?') ? '&' : '?'}${qs}` : CALENDLY_URL
      Calendly.initInlineWidget({
        url,
        parentElement: containerRef.current,
        prefill: {
          name: form.name,
          email: form.email,
          customAnswers,
        },
      })
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setStep('form')
    setForm({ name: '', email: '', phone: '', partySize: '', startDate: '', endDate: '', message: '' })
    if (containerRef.current) containerRef.current.innerHTML = ''
    onClose?.()
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth fullScreen={fullScreen} PaperProps={{ sx: { borderRadius: fullScreen ? 0 : 2 } }}>
      <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }} aria-label={t('close', 'Close')}>
        <CloseIcon />
      </IconButton>
      {step === 'form' ? (
        <>
          <DialogTitle sx={{ pr: 6 }}>{t('schedule.title', 'Agende uma conversa')}</DialogTitle>
          <DialogContent dividers>
            <Stack spacing={2}>
              <TextField label={t('schedule.name', 'Nome completo')} name="name" value={form.name} onChange={handleChange} fullWidth required />
              <TextField label={t('schedule.email', 'E-mail')} name="email" type="email" value={form.email} onChange={handleChange} fullWidth required />
              <TextField label={t('schedule.phone', 'Telefone / WhatsApp')} name="phone" value={form.phone} onChange={handleChange} fullWidth />
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField label={t('schedule.startDate', 'Data de chegada')} name="startDate" type="date" value={form.startDate} onChange={handleChange} InputLabelProps={{ shrink: true }} fullWidth />
                <TextField label={t('schedule.endDate', 'Data de partida')} name="endDate" type="date" value={form.endDate} onChange={handleChange} InputLabelProps={{ shrink: true }} fullWidth />
              </Stack>
              <TextField label={t('schedule.partySize', 'Quantidade de pessoas')} name="partySize" type="number" inputProps={{ min: 1 }} value={form.partySize} onChange={handleChange} fullWidth />
              <TextField label={t('schedule.message', 'Mensagem / Preferências')} name="message" value={form.message} onChange={handleChange} fullWidth multiline minRows={3} />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>{t('cancel', 'Cancelar')}</Button>
            <Button onClick={handleStartSchedule} variant="contained" disabled={loading || !form.name || !form.email}>{t('schedule.continue', 'Continuar')}</Button>
          </DialogActions>
        </>
      ) : (
        <>
          <DialogTitle sx={{ pr: 6 }}>{t('schedule.pickTime', 'Escolha o melhor horário')}</DialogTitle>
          <DialogContent sx={{ p: 0 }}>
            <Box ref={containerRef} sx={{ height: fullScreen ? '100vh' : '80vh' }} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setStep('form')}>{t('back', 'Voltar')}</Button>
            <Button onClick={handleClose} variant="contained">{t('close', 'Fechar')}</Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  )
}
