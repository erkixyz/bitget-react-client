import { io, Socket } from 'socket.io-client';

class WebSocketService {
  private socket: Socket | null = null;
  private url: string = 'http://localhost:3001';

  connect(): Socket {
    if (this.socket?.connected) {
      console.log('📡 Using existing WebSocket connection');
      return this.socket;
    }

    console.log('🔄 Connecting to WebSocket server:', this.url);
    this.socket = io(this.url, {
      transports: ['websocket', 'polling'],
      timeout: 5000,
      forceNew: true,
    });

    this.setupEventListeners();
    return this.socket;
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  getSocket(): Socket | null {
    return this.socket;
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }

  // Subscribe to ticker updates
  subscribeTicker(symbol: string): void {
    if (this.socket?.connected) {
      console.log(`📡 [CLIENT] Subscribing to ticker: ${symbol}`);
      this.socket.emit('ticker:subscribe', symbol);
    } else {
      console.log('❌ [CLIENT] Cannot subscribe to ticker - not connected');
    }
  }

  // Subscribe to positions updates
  subscribePositions(): void {
    if (this.socket?.connected) {
      this.socket.emit('positions:subscribe');
    }
  }

  // Subscribe to orders updates
  subscribeOrders(): void {
    if (this.socket?.connected) {
      this.socket.emit('orders:subscribe');
    }
  }

  // Event listener setup
  private setupEventListeners(): void {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('🟢 [SERVER] WebSocket connected to', this.url);
    });

    this.socket.on('disconnect', () => {
      console.log('🔴 [SERVER] WebSocket disconnected');
    });

    this.socket.on('connect_error', (error) => {
      console.error('❌ [SERVER] WebSocket connection error:', error);
    });

    this.socket.on('error', (error) => {
      console.error('❌ [SERVER] WebSocket error:', error);
    });
  }

  // Add event listener
  on(event: string, callback: (...args: unknown[]) => void): void {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  // Remove event listener
  off(event: string, callback?: (...args: unknown[]) => void): void {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }
}

// Export singleton instance
export const webSocketService = new WebSocketService();
export default webSocketService;
