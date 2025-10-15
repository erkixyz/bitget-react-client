import { useState, useCallback } from 'react';
import { useWebSocket } from './useWebSocket';
import type {
  TradingDataState,
  TickerData,
  Order,
  Position,
} from '../types/trading.types';
import apiService from '../services/api';

const initialState: TradingDataState = {
  ticker: null,
  orders: [],
  positions: [],
  isConnected: false,
  isLoading: false,
  error: null,
};

export const useTradingData = () => {
  const [state, setState] = useState<TradingDataState>(initialState);

  // WebSocket event handlers
  const handleTickerUpdate = useCallback((data: TickerData) => {
    console.log('📊 [CLIENT] Processing ticker update:');
    console.log(JSON.stringify(data, null, 2));
    setState((prev) => ({
      ...prev,
      ticker: data,
      error: null,
    }));
  }, []);

  const handleOrdersUpdate = useCallback((data: Order[]) => {
    console.log(
      '[DEBUG] handleOrdersUpdate raw data:',
      JSON.stringify(data, null, 2)
    );
    // Accept both array and object-with-array payloads, and Bitget field mapping
    let orders: Order[] = [];
    if (Array.isArray(data)) {
      orders = data;
    } else if (
      data &&
      typeof data === 'object' &&
      'activeOrders' in data &&
      Array.isArray((data as { activeOrders?: Order[] }).activeOrders)
    ) {
      orders = (data as { activeOrders: Order[] }).activeOrders;
    } else {
      console.warn(
        '[WARN] handleOrdersUpdate: No orders found in payload:',
        JSON.stringify(data, null, 2)
      );
    }
    // Map Bitget fields to strict Order type
    const mappedOrders: Order[] = orders.map((o) => {
      // Only allow 'limit' or 'market' for type
      let type: 'limit' | 'market' | undefined = undefined;
      if (o.type === 'limit' || o.orderType === 'limit') type = 'limit';
      else if (o.type === 'market' || o.orderType === 'market') type = 'market';
      // Only allow valid status
      let status: 'open' | 'filled' | 'cancelled' | 'partial' | undefined =
        undefined;
      if (o.status === 'live') status = 'open';
      else if (o.status === 'canceled') status = 'cancelled';
      else if (o.status === 'filled') status = 'filled';
      else if (o.status === 'partial') status = 'partial';
      else if (o.status === 'open' || o.status === 'cancelled')
        status = o.status;
      // Parse cTime/uTime as numbers if needed
      let createdAt = o.createdAt;
      if (createdAt === undefined && o.cTime !== undefined) {
        createdAt = typeof o.cTime === 'number' ? o.cTime : Number(o.cTime);
      }
      let updatedAt = o.updatedAt;
      if (updatedAt === undefined && o.uTime !== undefined) {
        updatedAt = typeof o.uTime === 'number' ? o.uTime : Number(o.uTime);
      }
      return {
        id: o.id ?? o.orderId ?? o.clientOid,
        orderId: o.orderId,
        clientOid: o.clientOid,
        symbol: o.symbol,
        side: o.side,
        type,
        amount: o.amount ?? o.size,
        price: o.price,
        filled: o.filled,
        remaining: o.remaining,
        status,
        createdAt,
        updatedAt,
      };
    });
    console.log(
      '[DEBUG] handleOrdersUpdate mappedOrders.length:',
      mappedOrders.length
    );
    console.log(
      '[DEBUG] handleOrdersUpdate mappedOrders:',
      JSON.stringify(mappedOrders, null, 2)
    );
    setState((prev) => ({
      ...prev,
      orders: mappedOrders,
      error: null,
    }));
  }, []);

  const handlePositionsUpdate = useCallback((data: Position[]) => {
    // Accept both array and object-with-array payloads
    const hasAllPositions = (d: unknown): d is { allPositions: Position[] } =>
      typeof d === 'object' &&
      d !== null &&
      Array.isArray((d as { allPositions?: unknown }).allPositions);
    const positions: Position[] = Array.isArray(data)
      ? data
      : hasAllPositions(data)
      ? (data as { allPositions: Position[] }).allPositions
      : [];
    setState((prev) => ({
      ...prev,
      positions,
      error: null,
    }));
  }, []);

  const handleConnect = useCallback(() => {
    console.log('🟢 [CLIENT] Trading data handler: WebSocket connected');
    setState((prev) => ({
      ...prev,
      isConnected: true,
      error: null,
    }));
  }, []);

  const handleDisconnect = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isConnected: false,
      error: 'Disconnected from server',
    }));
  }, []);

  const handleError = useCallback((error: Error) => {
    setState((prev) => ({
      ...prev,
      error: error.message,
      isConnected: false,
    }));
  }, []);

  // Initialize WebSocket connection
  const { subscribeTicker, subscribeOrders, subscribePositions } = useWebSocket(
    {
      onTickerUpdate: handleTickerUpdate,
      onOrdersUpdate: handleOrdersUpdate,
      onPositionsUpdate: handlePositionsUpdate,
      onConnect: handleConnect,
      onDisconnect: handleDisconnect,
      onError: handleError,
    }
  );

  // API methods for initial data loading
  const loadInitialData = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const [ordersResult, positionsResult] = await Promise.all([
        apiService.getOrders(),
        apiService.getPositions(),
      ]);

      if (!ordersResult.success) {
        throw new Error(ordersResult.message || 'Failed to load orders');
      }

      if (!positionsResult.success) {
        throw new Error(positionsResult.message || 'Failed to load positions');
      }

      setState((prev) => ({
        ...prev,
        orders: ordersResult.data,
        positions: positionsResult.data,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to load initial data',
      }));
    }
  }, []);

  const refreshData = useCallback(() => {
    if (state.isConnected) {
      subscribeTicker('BTCUSDT');
      subscribeOrders();
      subscribePositions();
    }
    loadInitialData();
  }, [
    state.isConnected,
    subscribeTicker,
    subscribeOrders,
    subscribePositions,
    loadInitialData,
  ]);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    loadInitialData,
    refreshData,
    clearError,
    subscribeTicker,
    subscribeOrders,
    subscribePositions,
  };
};
