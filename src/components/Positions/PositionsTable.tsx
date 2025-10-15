import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import type { Position } from '../../types/trading.types';
import {
  formatPrice,
  formatPnL,
  formatPercent,
  formatTime,
} from '../../utils/formatters';
import { getChangeColor } from '../../theme/theme';

interface PositionsTableProps {
  positions: Position[];
  isLoading?: boolean;
}

export const PositionsTable = ({
  positions,
  isLoading,
}: PositionsTableProps) => {
  // Ensure every row has a unique 'id' property for DataGrid
  const safePositions = Array.isArray(positions)
    ? positions.map((pos, idx) => ({
        ...pos,
        id: pos.id ?? `${pos.symbol}_${pos.holdSide ?? pos.side ?? idx}`,
      }))
    : [];
  const totalPnL = safePositions.reduce(
    (sum, pos) => sum + parseFloat(pos.pnl || '0'),
    0
  );

  const columns: GridColDef[] = [
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
      renderCell: (params: GridRenderCellParams) => {
        // Defensive: fallback to holdSide or '-'
        const value = params.value || params.row.holdSide || '-';
        return (
          <Chip
            label={typeof value === 'string' ? value.toUpperCase() : value}
            size="small"
            sx={{
              backgroundColor:
                value === 'long'
                  ? getChangeColor(1) + '20'
                  : getChangeColor(-1) + '20',
              color: value === 'long' ? getChangeColor(1) : getChangeColor(-1),
              fontWeight: 600,
            }}
          />
        );
      },
    },
    {
      field: 'size',
      headerName: 'Size',
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2">{formatPrice(params.value, 6)}</Typography>
      ),
    },
    {
      field: 'avgPrice',
      headerName: 'Avg Price',
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          ${formatPrice(params.value)}
        </Typography>
      ),
    },
    {
      field: 'markPrice',
      headerName: 'Mark Price',
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          ${formatPrice(params.value)}
        </Typography>
      ),
    },
    {
      field: 'notionalSize',
      headerName: 'Notional',
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2">${formatPrice(params.value)}</Typography>
      ),
    },
    {
      field: 'pnl',
      headerName: 'PnL',
      width: 140,
      renderCell: (params: GridRenderCellParams) => {
        const pnl = parseFloat(params.value);
        const pnlPercent = parseFloat(params.row.pnlPercent);
        const color = getChangeColor(pnl);

        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {pnl > 0 ? (
              <TrendingUpIcon sx={{ color, fontSize: '1rem' }} />
            ) : pnl < 0 ? (
              <TrendingDownIcon sx={{ color, fontSize: '1rem' }} />
            ) : null}
            <Box>
              <Typography variant="body2" sx={{ color, fontWeight: 600 }}>
                {formatPnL(pnl)}
              </Typography>
              <Typography variant="caption" sx={{ color, fontSize: '0.7rem' }}>
                {formatPercent(pnlPercent)}
              </Typography>
            </Box>
          </Box>
        );
      },
    },
    {
      field: 'margin',
      headerName: 'Margin',
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2">${formatPrice(params.value)}</Typography>
      ),
    },
    {
      field: 'liquidationPrice',
      headerName: 'Liq. Price',
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Typography
          variant="body2"
          color="warning.main"
          sx={{ fontWeight: 500 }}
        >
          ${formatPrice(params.value)}
        </Typography>
      ),
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
            sx={{ fontWeight: 700, letterSpacing: 1, color: '#222' }}
          >
            Open Positions
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip
              label={`${safePositions.length} positions`}
              size="small"
              sx={{ bgcolor: 'grey.100', color: '#222', fontWeight: 500 }}
            />
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="caption" sx={{ color: '#222' }}>
                Total PnL
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: getChangeColor(totalPnL),
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                }}
              >
                {totalPnL > 0 ? (
                  <TrendingUpIcon sx={{ fontSize: '1rem' }} />
                ) : totalPnL < 0 ? (
                  <TrendingDownIcon sx={{ fontSize: '1rem' }} />
                ) : null}
                {formatPnL(totalPnL)}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={safePositions}
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
              color: '#222',
              fontSize: '1rem',
              '& .MuiDataGrid-columnHeaders': {
                background: 'rgba(0,0,0,0.02)',
                fontWeight: 700,
                fontSize: '1rem',
                color: '#222',
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.04)',
              },
              '& .MuiDataGrid-cell': {
                borderBottom: '1px solid #f0f0f0',
                color: '#222',
              },
              '& .MuiDataGrid-footerContainer': {
                background: 'rgba(0,0,0,0.01)',
                color: '#222',
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default PositionsTable;
