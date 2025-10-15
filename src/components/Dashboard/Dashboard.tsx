import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Card,
  CardContent,
  Typography,
  Alert,
  Snackbar,
} from '@mui/material';
import BarChartPlaceholder from './BarChartPlaceholder';
import PieChartPlaceholder from './PieChartPlaceholder';
import MapPlaceholder from './MapPlaceholder';
import { DashboardLayout } from './DashboardLayout';
import TickerCard from '../Ticker/TickerCard';
import OrdersTable from '../Orders/OrdersTable';
import PositionsTable from '../Positions/PositionsTable';
import { useTradingData } from '../../hooks/useTradingData';

export const Dashboard = () => {
  const { ticker, orders, positions, isLoading, error } = useTradingData();
  return (
    <DashboardLayout>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 2,
                  minWidth: 260,
                  minHeight: 180,
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight={700} mb={2}>
                    Ticker
                  </Typography>
                  <TickerCard ticker={ticker} isLoading={isLoading} />
                </CardContent>
              </Card>
            </TableCell>
            <TableCell>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 2,
                  minWidth: 260,
                  minHeight: 180,
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight={700} mb={2}>
                    Aktiivsus
                  </Typography>
                  <BarChartPlaceholder />
                </CardContent>
              </Card>
            </TableCell>
            <TableCell>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 2,
                  minWidth: 260,
                  minHeight: 180,
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight={700} mb={2}>
                    Külastajad
                  </Typography>
                  <PieChartPlaceholder />
                </CardContent>
              </Card>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>
              <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={700} mb={2}>
                    Tellimused
                  </Typography>
                  <OrdersTable orders={orders} isLoading={isLoading} />
                </CardContent>
              </Card>
            </TableCell>
            <TableCell>
              <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={700} mb={2}>
                    Positsioonid
                  </Typography>
                  <PositionsTable positions={positions} isLoading={isLoading} />
                </CardContent>
              </Card>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3}>
              <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={700} mb={2}>
                    Reaalajas kaart
                  </Typography>
                  <MapPlaceholder />
                </CardContent>
              </Card>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {/* Error Snackbar */}
      {error && (
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      )}
    </DashboardLayout>
  );
};
