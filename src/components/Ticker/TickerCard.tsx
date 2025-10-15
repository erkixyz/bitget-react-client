import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  useTheme,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
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
  const theme = useTheme();
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
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
        background: '#fff',
        boxShadow: '0 2px 12px 0 rgba(60,72,88,0.08)',
        minWidth: 320,
        maxWidth: 480,
        mx: 'auto',
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: 700,
              flexGrow: 1,
              letterSpacing: 1,
              color: '#222',
            }}
          >
            {ticker.symbol}
          </Typography>
          <Chip
            label="USDT Futures"
            size="small"
            sx={{
              bgcolor: theme.palette.grey[100],
              color: '#222',
              fontWeight: 500,
              ml: 1,
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
          <Typography
            variant="h3"
            component="div"
            sx={{ fontWeight: 800, color: '#222', mr: 2 }}
          >
            ${formatPrice(ticker.price)}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isPositive ? (
              <TrendingUpIcon sx={{ color: changeColor, fontSize: '2rem' }} />
            ) : (
              <TrendingDownIcon sx={{ color: changeColor, fontSize: '2rem' }} />
            )}
            <Typography
              variant="h6"
              sx={{
                color: changeColor,
                fontWeight: 700,
                minWidth: 70,
                textShadow: '0 1px 2px #fff8',
              }}
            >
              {isPositive ? '+' : ''}
              {formatPrice(ticker.change24h)}
            </Typography>
            <Chip
              label={formatPercent(changePercent)}
              sx={{
                backgroundColor: changeColor + '18',
                color: changeColor,
                fontWeight: 700,
                fontSize: '1rem',
                ml: 1,
                border: '1px solid #e0e3e7',
              }}
            />
          </Box>
        </Box>
        <Table
          size="small"
          sx={{
            mt: 2,
            '& td, & th': { color: '#222', borderColor: '#e0e3e7' },
          }}
          aria-label="ticker stats"
        >
          <TableBody>
            <TableRow>
              <TableCell
                variant="head"
                sx={{ color: theme.palette.text.secondary, fontWeight: 500 }}
              >
                24h High
              </TableCell>
              <TableCell
                sx={{ fontWeight: 700, color: theme.palette.success.dark }}
              >
                ${formatPrice(ticker.high24h)}
              </TableCell>
              <TableCell
                variant="head"
                sx={{ color: theme.palette.text.secondary, fontWeight: 500 }}
              >
                24h Low
              </TableCell>
              <TableCell
                sx={{ fontWeight: 700, color: theme.palette.error.dark }}
              >
                ${formatPrice(ticker.low24h)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                variant="head"
                sx={{ color: theme.palette.text.secondary, fontWeight: 500 }}
              >
                24h Volume
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }}>
                {formatVolume(ticker.volume24h)}
              </TableCell>
              <TableCell
                variant="head"
                sx={{ color: theme.palette.text.secondary, fontWeight: 500 }}
              >
                Last Update
              </TableCell>
              <TableCell
                sx={{ fontWeight: 500, color: theme.palette.text.secondary }}
              >
                {new Date(ticker.timestamp).toLocaleTimeString()}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TickerCard;
