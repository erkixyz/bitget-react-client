import { Card, CardContent, Typography, Box, Grid, Chip } from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
} from '@mui/icons-material';
import type { TickerData } from '../../types/trading.types';
import {
  formatPrice,
  formatVolume,
  formatPercent,
} from '../../utils/formatters';
import { getChangeColor } from '../../theme/theme';

interface TickerCardProps {
  ticker: TickerData | null;
  isLoading?: boolean;
}

export const TickerCard = ({ ticker, isLoading }: TickerCardProps) => {
  console.log('🎯 [CLIENT] TickerCard render - isLoading:', isLoading);
  if (ticker) {
    console.log('Ticker data:');
    console.log(JSON.stringify(ticker, null, 2));
  } else {
    console.log('Ticker data: null');
  }

  if (!ticker && !isLoading) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" color="text.secondary">
            No ticker data available
          </Typography>
        </CardContent>
      </Card>
    );
  }

  if (isLoading || !ticker) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" color="text.secondary">
            {isLoading
              ? 'Loading ticker data...'
              : 'Waiting for ticker data...'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {isLoading
              ? 'Please wait...'
              : 'Check WebSocket connection status above'}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const change = parseFloat(ticker.change24h);
  const changePercent = parseFloat(ticker.change24hPercent);
  const changeColor = getChangeColor(change);
  const isPositive = change >= 0;

  return (
    <Card>
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
            {ticker.symbol}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            USDT Futures
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h3"
            component="div"
            sx={{ fontWeight: 700, mb: 1 }}
          >
            ${formatPrice(ticker.price)}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isPositive ? (
              <TrendingUpIcon sx={{ color: changeColor, fontSize: '1.2rem' }} />
            ) : (
              <TrendingDownIcon
                sx={{ color: changeColor, fontSize: '1.2rem' }}
              />
            )}

            <Typography
              variant="h6"
              sx={{ color: changeColor, fontWeight: 600 }}
            >
              {isPositive ? '+' : ''}
              {formatPrice(ticker.change24h)}
            </Typography>

            <Chip
              label={formatPercent(changePercent)}
              sx={{
                backgroundColor: changeColor + '20',
                color: changeColor,
                fontWeight: 600,
              }}
            />
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Typography variant="body2" color="text.secondary">
              24h High
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              ${formatPrice(ticker.high24h)}
            </Typography>
          </Grid>

          <Grid size={{ xs: 6, sm: 3 }}>
            <Typography variant="body2" color="text.secondary">
              24h Low
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              ${formatPrice(ticker.low24h)}
            </Typography>
          </Grid>

          <Grid size={{ xs: 6, sm: 3 }}>
            <Typography variant="body2" color="text.secondary">
              24h Volume
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {formatVolume(ticker.volume24h)}
            </Typography>
          </Grid>

          <Grid size={{ xs: 6, sm: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Last Update
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {new Date(ticker.timestamp).toLocaleTimeString()}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TickerCard;
