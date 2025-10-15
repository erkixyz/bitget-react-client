// Trading data types for Bitget dashboard

export interface TickerData {
  symbol: string;
  price: string;
  change24h: string;
  change24hPercent: string;
  volume24h: string;
  high24h: string;
  low24h: string;
  timestamp: number;
}

export interface Order {
  id?: string;
  orderId?: string; // Bitget compatibility
  clientOid?: string; // Bitget compatibility
  symbol: string;
  side: 'buy' | 'sell';
  type?: 'limit' | 'market';
  orderType?: string; // Bitget compatibility
  amount?: string;
  size?: string; // Bitget compatibility
  price?: string;
  filled?: string;
  remaining?: string;
  status?: 'open' | 'filled' | 'cancelled' | 'partial' | 'live' | 'canceled';
  createdAt?: number;
  updatedAt?: number;
  // Bitget compatibility
  cTime?: number;
  uTime?: number;
}

export interface Position {
  id: string;
  symbol: string;
  side?: 'long' | 'short';
  holdSide?: 'long' | 'short'; // for Bitget server payload compatibility
  size?: string;
  notionalSize?: string;
  avgPrice?: string;
  markPrice?: string;
  pnl?: string;
  pnlPercent?: string;
  margin?: string;
  liquidationPrice?: string;
  createdAt?: number;
  updatedAt?: number;
}

export interface WebSocketEvents {
  'ticker:subscribe': (symbol: string) => void;
  'ticker:data': (data: TickerData) => void;
  'positions:subscribe': () => void;
  'positions:data': (data: Position[]) => void;
  'orders:subscribe': () => void;
  'orders:data': (data: Order[]) => void;
  connect: () => void;
  disconnect: () => void;
  error: (error: Error) => void;
}

export interface TradingDataState {
  ticker: TickerData | null;
  orders: Order[];
  positions: Position[];
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface HealthStatus {
  status: 'ok' | 'error';
  timestamp: number;
  version: string;
}
