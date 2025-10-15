import { Box, Typography } from '@mui/material';

export default function MapPlaceholder() {
  return (
    <Box
      sx={{
        width: '100%',
        height: 220,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f3f6fa',
        borderRadius: 2,
      }}
    >
      <Typography color="text.secondary">
        [Maailmakaardi placeholder]
      </Typography>
    </Box>
  );
}
