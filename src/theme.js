import { createTheme } from '@mui/material/styles'
import { fonts } from './theme/tokens.js'

const theme = createTheme({
  palette: { mode: 'light' },
  typography: {
    fontFamily: fonts.body,
    h1: { fontFamily: fonts.headings },
    h2: { fontFamily: fonts.headings },
    h3: { fontFamily: fonts.headings },
    h4: { fontFamily: fonts.headings },
    h5: { fontFamily: fonts.headings },
    h6: { fontFamily: fonts.headings },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        *, *::before, *::after { box-sizing: border-box; }
        html, body, #root { height: 100%; }
        body { margin: 0; }
      `,
    },
  },
})

export default theme
