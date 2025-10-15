import { createTheme } from '@mui/material/styles';

// Professional dark trading theme with blue accents
export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2', // Blue accent
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#90caf9', // Light blue
      light: '#bbdefb',
      dark: '#64b5f6',
    },
    background: {
      default: '#0a0e27', // Very dark navy
      paper: '#1a1d35', // Dark navy for cards
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    },
    success: {
      main: '#4caf50', // Green for profits
      light: '#81c784',
      dark: '#388e3c',
    },
    error: {
      main: '#f44336', // Red for losses
      light: '#e57373',
      dark: '#d32f2f',
    },
    warning: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00',
    },
    info: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
    },
    divider: '#37404a',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a1d35',
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a1d35',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
          border: '1px solid #37404a',
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

// Helper function to get color based on value change
export const getChangeColor = (value: string | number): string => {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  if (numValue > 0) return theme.palette.success.main;
  if (numValue < 0) return theme.palette.error.main;
  return theme.palette.text.secondary;
};

// Helper function to format price change with color
export const formatPriceChange = (change: string, changePercent: string) => ({
  text: `${parseFloat(change) >= 0 ? '+' : ''}${change} (${
    parseFloat(changePercent) >= 0 ? '+' : ''
  }${changePercent}%)`,
  color: getChangeColor(change),
});
