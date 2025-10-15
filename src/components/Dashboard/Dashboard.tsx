import { useEffect } from 'react';
import { Grid, Alert, Snackbar } from '@mui/material';
import DashboardLayout from './DashboardLayout';
import TickerCard from '../Ticker/TickerCard';
import OrdersTable from '../Orders/OrdersTable';
import PositionsTable from '../Positions/PositionsTable';
import LoadingSpinner from '../common/LoadingSpinner';
import { useTradingData } from '../../hooks/useTradingData';

export const Dashboard = () => {
  const {
    ticker,
    orders,
    positions,
    isConnected,
    isLoading,
    error,
    loadInitialData,
    refreshData,
    clearError,
  } = useTradingData();

  // Load initial data on component mount
  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  const handleRefresh = () => {
    refreshData();
  };

  const handleCloseError = () => {
    clearError();
  };

  if (isLoading && !ticker && orders.length === 0 && positions.length === 0) {
    return (
      <DashboardLayout isConnected={isConnected} onRefresh={handleRefresh}>
        <LoadingSpinner message="Loading trading data..." minHeight="60vh" />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout isConnected={isConnected} onRefresh={handleRefresh}>
      <Grid container spacing={3}>
        {/* Ticker Section */}
        <Grid size={{ xs: 12 }}>
          <TickerCard ticker={ticker} isLoading={isLoading} />
        </Grid>

        {/* Orders and Positions Tables */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <OrdersTable orders={orders} isLoading={isLoading} />
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <PositionsTable positions={positions} isLoading={isLoading} />
        </Grid>
      </Grid>

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </DashboardLayout>
  );
};

export default Dashboard;
