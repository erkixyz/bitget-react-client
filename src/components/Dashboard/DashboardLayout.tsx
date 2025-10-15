import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  TrendingUp as TrendingUpIcon,
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';

interface DashboardLayoutProps {
  children: React.ReactNode;
  isConnected: boolean;
  onRefresh?: () => void;
}

export const DashboardLayout = ({
  children,
  isConnected,
  onRefresh,
}: DashboardLayoutProps) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        minHeight: '100vh',
        backgroundColor: 'background.default',
      }}
    >
      <AppBar
        position="static"
        elevation={2}
        sx={{
          background: '#fff',
          color: 'text.primary',
          boxShadow: '0 2px 12px 0 rgba(60,72,88,0.08)',
        }}
      >
        <Toolbar sx={{ minHeight: 56, px: { xs: 1, sm: 2 } }}>
          <TrendingUpIcon sx={{ mr: 1, color: 'primary.main', fontSize: 32 }} />
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 800,
              letterSpacing: 1,
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              color: '#222',
            }}
          >
            Bitget Trading Dashboard
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip
              label={isConnected ? 'Connected' : 'Disconnected'}
              icon={
                <Box
                  component="span"
                  sx={{
                    display: 'inline-block',
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    bgcolor: isConnected ? 'success.main' : 'error.main',
                    mr: 1,
                  }}
                />
              }
              sx={{
                bgcolor: isConnected ? 'success.light' : 'error.light',
                color: '#222',
                fontWeight: 700,
                fontSize: '0.95rem',
                px: 1.5,
                height: 32,
                letterSpacing: 0.5,
                boxShadow: 'none',
                border: '1px solid #e0e3e7',
              }}
              size="medium"
            />
            <IconButton
              sx={{ ml: 1, color: '#222' }}
              onClick={onRefresh}
              title="Refresh Data"
              size="small"
            >
              <RefreshIcon fontSize="medium" />
            </IconButton>
            <IconButton
              title="Account"
              size="small"
              sx={{ ml: 1, color: '#222' }}
            >
              <AccountCircleIcon fontSize="medium" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        {children}
      </Container>
    </Box>
  );
};
