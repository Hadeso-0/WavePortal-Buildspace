import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    brand: {
        50: '#EEF2FF',
        100: '#EEF2FF',
        200: '#DFE6FF',
        300: '#8AA4FF',
        400: '#5B80FF',
        500: '#3764FF',
        600: '#1C4CF3',
        700: '#1046FF',
        800: '#0030D3',
        900: '#0029B6',
      },
  },
  fonts: {
    body: "'Poppins', 'Segoe UI', 'Roboto', 'Oxygen','Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',sans-serif",
    heading: "'Poppins', 'Segoe UI', 'Roboto', 'Oxygen','Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',sans-serif",
    mono: "Source Code Pro, Courier Prime, monospace",
  },
//   components:{

//   }
});

export default theme