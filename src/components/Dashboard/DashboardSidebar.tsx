import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryIcon from '@mui/icons-material/History';
import ScheduleIcon from '@mui/icons-material/Schedule';
import WorkIcon from '@mui/icons-material/Work';
import PostAddIcon from '@mui/icons-material/PostAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const navItems = [
  { label: 'Dashboard', icon: <DashboardIcon /> },
  { label: 'My Requests', icon: <PostAddIcon /> },
  { label: 'My Schedule', icon: <ScheduleIcon /> },
  { label: 'Session History', icon: <HistoryIcon /> },
  { label: 'Freelance Jobs', icon: <WorkIcon /> },
  { label: 'Settings', icon: <SettingsIcon /> },
];

export default function DashboardSidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 220,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 220,
          boxSizing: 'border-box',
          background: '#f8fafc',
          borderRight: '1px solid #e0e3e7',
        },
      }}
    >
      <Box
        sx={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          px: 2,
          borderBottom: '1px solid #e0e3e7',
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 800, color: '#1976d2', letterSpacing: 1 }}
        >
          Bitget
        </Typography>
      </Box>
      <List sx={{ py: 1 }}>
        {navItems.map((item) => (
          <ListItemButton key={item.label} sx={{ borderRadius: 2, mb: 0.5 }}>
            <ListItemIcon sx={{ color: '#1976d2', minWidth: 36 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{ fontWeight: 500, fontSize: '1rem' }}
            />
          </ListItemButton>
        ))}
      </List>
      <Divider sx={{ my: 1 }} />
      <List>
        <ListItemButton>
          <ListItemIcon sx={{ color: '#1976d2', minWidth: 36 }}>
            <HelpOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="FAQs" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
