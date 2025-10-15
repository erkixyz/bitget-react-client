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
      <AppBar position="static" elevation={2}>
        <Toolbar>
          <TrendingUpIcon sx={{ mr: 2 }} />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 600 }}
          >
            Bitget Trading Dashboard
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip
              label={isConnected ? '🟢 Connected' : '🔴 Disconnected'}
              color={isConnected ? 'success' : 'error'}
              size="small"
              sx={{
                fontWeight: 600,
                fontSize: '0.875rem',
                '& .MuiChip-label': {
                  paddingX: 1.5,
                },
              }}
            />

            <IconButton
              color="inherit"
              onClick={onRefresh}
              title="Refresh Data"
            >
              <RefreshIcon />
            </IconButton>

            <IconButton color="inherit" title="Account">
              <AccountCircleIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 3, mb: 3 }}>
        {children}
      </Container>
    </Box>
  );
};

export default DashboardLayout;
