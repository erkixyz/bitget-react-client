import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  LinearProgress,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import type { Order } from '../../types/trading.types';
import {
  formatTime,
  formatOrderSize,
  calculateFillPercent,
} from '../../utils/formatters';
import { getChangeColor } from '../../theme/theme';

interface OrdersTableProps {
  orders: Order[];
  isLoading?: boolean;
}

export const OrdersTable = ({ orders, isLoading }: OrdersTableProps) => {
  // Ensure every row has a unique 'id' property for DataGrid
  const safeOrders = Array.isArray(orders)
    ? orders.map((order, idx) => ({
        ...order,
        id: order.id ?? order.orderId ?? order.clientOid ?? idx,
      }))
    : [];
  const columns: GridColDef[] = [
    {
      field: 'orderId',
      headerName: 'Order ID',
      width: 180,
      renderCell: (params: GridRenderCellParams) => (
        <Typography
          variant="body2"
          sx={{ fontFamily: 'monospace', fontSize: '0.85rem' }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'symbol',
      headerName: 'Symbol',
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'side',
      headerName: 'Side',
      width: 80,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params.value.toUpperCase()}
          size="small"
          sx={{
            backgroundColor:
              params.value === 'buy'
                ? getChangeColor(1) + '20'
                : getChangeColor(-1) + '20',
            color:
              params.value === 'buy' ? getChangeColor(1) : getChangeColor(-1),
            fontWeight: 600,
          }}
        />
      ),
    },
    {
      field: 'filled',
      headerName: 'Filled',
      width: 180,
      renderCell: (params: GridRenderCellParams) => {
        const fillPercent = calculateFillPercent(
          params.value,
          params.row.amount
        );
        return (
          <Box sx={{ width: '100%' }}>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}
            >
              <Typography variant="body2" fontSize="0.75rem">
                {formatOrderSize(params.value, params.row.amount)}
              </Typography>
              <Typography variant="body2" fontSize="0.75rem">
                {fillPercent.toFixed(1)}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={fillPercent}
              sx={{
                height: 4,
                borderRadius: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor:
                    fillPercent > 0 ? getChangeColor(1) : 'primary.main',
                },
              }}
            />
          </Box>
        );
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      renderCell: (params: GridRenderCellParams) => {
        let color: string;
        switch (params.value) {
          case 'filled':
            color = getChangeColor(1);
            break;
          case 'cancelled':
            color = getChangeColor(-1);
            break;
          case 'partial':
            color = '#ff9800';
            break;
          default:
            color = '#2196f3';
        }

        return (
          <Chip
            label={params.value.toUpperCase()}
            size="small"
            sx={{
              backgroundColor: color + '20',
              color: color,
              fontWeight: 600,
            }}
          />
        );
      },
    },
    {
      field: 'createdAt',
      headerName: 'Created',
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2" color="text.secondary">
          {formatTime(params.value)}
        </Typography>
      ),
    },
  ];

  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
        background: '#fff',
        boxShadow: '0 2px 12px 0 rgba(60,72,88,0.08)',
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: 700, letterSpacing: 1 }}
          >
            Active Orders
          </Typography>
          <Chip
            label={`${safeOrders.length} orders`}
            size="small"
            sx={{
              bgcolor: 'grey.100',
              color: 'text.secondary',
              fontWeight: 500,
            }}
          />
        </Box>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={safeOrders}
            columns={columns}
            loading={isLoading}
            pageSizeOptions={[5, 10, 25]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10, page: 0 },
              },
            }}
            disableRowSelectionOnClick
            sx={{
              borderRadius: 2,
              background: '#fff',
              fontSize: '1rem',
              '& .MuiDataGrid-columnHeaders': {
                background: 'rgba(0,0,0,0.02)',
                fontWeight: 700,
                fontSize: '1rem',
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.04)',
              },
              '& .MuiDataGrid-cell': {
                borderBottom: '1px solid #f0f0f0',
              },
              '& .MuiDataGrid-footerContainer': {
                background: 'rgba(0,0,0,0.01)',
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default OrdersTable;
