import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import type { FC } from 'react';

const darkTheme = createTheme({
  spacing: 10,
  palette: {
    type: 'dark',
    primary: {
      dark: '#8d6dc8',
      light: '#cabae6',
      main: '#a58ad5',
      contrastText: '#fff',
    },
    secondary: {
      dark: '#0069c0',
      light: '#6ec6ff',
      main: '#2196f3',
    },
    background: {
      default: '#000000',
      paper: '#212121',
    },
    text: {
      disabled: '#616161',
      primary: '#ffffff',
      secondary: '#bdbdbd',
    },
    common: {
      white: '#fff',
    },
    divider: '#000',
  },
  typography: {
    fontFamily: 'Inter',
    h1: {
      fontSize: '35px',
      fontWeight: 'normal',
      lineHeight: '49px',
    },
    h2: {
      fontSize: '33px',
      fontWeight: 'normal',
      lineHeight: '45px',
    },
    h3: {
      fontSize: '24px',
      fontWeight: 'normal',
      lineHeight: '30px',
    },
    h4: {
      fontSize: '21px',
      fontWeight: 'normal',
      lineHeight: '26px',
    },
    h5: {
      fontSize: '18px',
      fontWeight: 'normal',
      lineHeight: '25px',
    },
    body1: {
      fontSize: '16px',
      fontWeight: 'normal',
      lineHeight: '21px',
    },
    body2: {
      fontSize: '14px',
      fontWeight: 'normal',
      lineHeight: '21px',
    },
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none',
        fontWeight: 500,
      },
      sizeLarge: {
        fontSize: 20,
      },
    },
    MuiLink: {
      root: {
        cursor: 'pointer',
      },
    },
    MuiChip: {
      root: {
        borderRadius: 4,
        transition: 'all 0.2s',
      },
      sizeSmall: {
        fontSize: 12,
        lineHeight: '20px',
      },
      outlinedSecondary: {
        'backgroundColor': 'rgba(33, 150, 243, 0.29)',

        '&:hover': {
          backgroundColor: 'rgba(33, 150, 243, 0.29) !important',
        },

        '&:focus': {
          backgroundColor: 'rgba(33, 150, 243, 0.29) !important',
        },
      },
      colorSecondary: {
        border: '1px solid #2196f3',
      },
    },
  },
});

export const Theme: FC = ({ children }) => {
  return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>;
};
