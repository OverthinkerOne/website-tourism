import React from 'react'
import { Dialog, DialogContent, IconButton } from '@mui/material'
// Full-screen dialog for consistent scroll; no breakpoint-based resizing
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import { ensureCalendlyStyles, loadCalendlyScript } from '../lib/calendly.js'

export default function CalendlyDialog({ open, onClose, url, prefill, locale }) {
  const containerRef = React.useRef(null)

  React.useEffect(() => {
    if (!open) return
    let cancelled = false
  // Let MUI Dialog handle body scroll lock; no manual body style here
    ;(async () => {
      try {
        await ensureCalendlyStyles()
        const Calendly = await loadCalendlyScript()
        if (cancelled) return
        const qs = new URLSearchParams()
        if (locale) qs.set('locale', locale)
        const embedUrl = qs.toString() ? `${url}${url.includes('?') ? '&' : '?'}${qs}` : url
        Calendly.initInlineWidget({
          url: embedUrl,
          parentElement: containerRef.current,
          prefill: prefill || undefined,
        })
      } catch (e) {
        // fallback: open new tab if inline fails
        window.open(url, '_blank', 'noopener,noreferrer')
        onClose?.()
      }
    })()
    return () => {
      cancelled = true
      if (containerRef.current) containerRef.current.innerHTML = ''
    }
  }, [open, url, locale, prefill, onClose])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
      PaperProps={{
        sx: {
          borderRadius: 0,
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      }}
    >
      <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
        <IconButton aria-label="Close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent sx={{ p: 0, backgroundColor: 'transparent', overflow: 'hidden' }}>
        <Box
          ref={containerRef}
          sx={{
            height: '100dvh',
            backgroundColor: '#fff',
            borderRadius: 0,
            overflow: 'hidden',
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
