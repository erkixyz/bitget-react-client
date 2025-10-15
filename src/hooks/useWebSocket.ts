import { useEffect, useRef } from 'react';
import { Socket } from 'socket.io-client';
import webSocketService from '../services/websocket';
import type { TickerData, Order, Position } from '../types/trading.types';

interface UseWebSocketProps {
  onTickerUpdate?: (data: TickerData) => void;
  onOrdersUpdate?: (data: Order[]) => void;
  onPositionsUpdate?: (data: Position[]) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Error) => void;
}

export const useWebSocket = ({
  onTickerUpdate,
  onOrdersUpdate,
  onPositionsUpdate,
  onConnect,
  onDisconnect,
  onError,
}: UseWebSocketProps = {}) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Connect to WebSocket
    socketRef.current = webSocketService.connect();
    const socket = socketRef.current;

    if (!socket) return;

    // Set up event listeners
    const handleConnect = () => {
      console.log('WebSocket connected');
      onConnect?.();

      // Auto-subscribe to default data streams
      webSocketService.subscribeTicker('BTCUSDT');
      webSocketService.subscribeOrders();
      webSocketService.subscribePositions();
    };

    const handleDisconnect = () => {
      console.log('WebSocket disconnected');
      onDisconnect?.();
    };

    const handleError = (error: Error) => {
      console.error('WebSocket error:', error);
      onError?.(error);
    };

    const handleTickerData = (data: TickerData) => {
      console.log('📦 [SERVER PACKET] Ticker data received:');
      console.log(JSON.stringify(data, null, 2));
      onTickerUpdate?.(data);
    };

    const handleOrdersData = (data: Order[]) => {
      console.log('📦 [SERVER PACKET] Orders data received:');
      console.log(JSON.stringify(data, null, 2));
      onOrdersUpdate?.(data);
    };

    const handlePositionsData = (data: Position[]) => {
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
      console.log('📦 [SERVER PACKET] Positions data received:');
      console.log(JSON.stringify(data, null, 2));
      onPositionsUpdate?.(positions);
    };

    // Register event listeners
    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('error', handleError);
    socket.on('ticker:data', handleTickerData);
    socket.on('orders:data', handleOrdersData);
    socket.on('positions:data', handlePositionsData);

    // Cleanup function
    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('error', handleError);
      socket.off('ticker:data', handleTickerData);
      socket.off('orders:data', handleOrdersData);
      socket.off('positions:data', handlePositionsData);
    };
  }, [
    onConnect,
    onDisconnect,
    onError,
    onTickerUpdate,
    onOrdersUpdate,
    onPositionsUpdate,
  ]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      webSocketService.disconnect();
    };
  }, []);

  return {
    socket: socketRef.current,
    isConnected: webSocketService.isConnected(),
    subscribeTicker: webSocketService.subscribeTicker.bind(webSocketService),
    subscribeOrders: webSocketService.subscribeOrders.bind(webSocketService),
    subscribePositions:
      webSocketService.subscribePositions.bind(webSocketService),
  };
};
