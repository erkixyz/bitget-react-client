import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  IconButton,
  Chip,
  InputBase,
  Badge,
  Avatar,
  alpha,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import DashboardSidebar from './DashboardSidebar';

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: 'background.default',
      }}
    >
      <DashboardSidebar />
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <AppBar
          position="static"
          elevation={0}
          sx={{
            background: '#2563eb',
            color: '#fff',
            boxShadow: '0 2px 12px 0 rgba(60,72,88,0.08)',
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar sx={{ minHeight: 64, px: { xs: 2, sm: 4 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <img
                src="/logo192.png"
                alt="Logo"
                style={{ height: 32, marginRight: 8 }}
              />
              <Typography
                variant="h6"
                sx={{ fontWeight: 900, letterSpacing: 1, color: '#fff' }}
              >
                Mira PRO
              </Typography>
              <Chip
                label="PRO"
                size="small"
                sx={{
                  ml: 1,
                  bgcolor: '#22c55e',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                }}
              />
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box
              sx={{
                background: alpha('#fff', 0.15),
                borderRadius: 2,
                px: 2,
                py: 0.5,
                display: 'flex',
                alignItems: 'center',
                minWidth: 220,
                maxWidth: 320,
                mr: 3,
              }}
            >
              <InputBase
                placeholder="Search topics..."
                sx={{ color: '#fff', width: '100%' }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </Box>
            <IconButton color="inherit" sx={{ ml: 1 }}>
              <Badge badgeContent={3} color="error">
                <ChatBubbleIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" sx={{ ml: 1 }}>
              <Badge badgeContent={7} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" sx={{ ml: 1 }}>
              <Avatar
                src="/avatar.png"
                alt="User"
                sx={{ width: 32, height: 32 }}
              />
            </IconButton>
            <IconButton color="inherit" sx={{ ml: 1 }}>
              <PowerSettingsNewIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" sx={{ py: 3, flex: 1 }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
};
