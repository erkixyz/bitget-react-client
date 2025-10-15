import type {
  ApiResponse,
  HealthStatus,
  Order,
  Position,
} from '../types/trading.types';

const BASE_URL = 'http://localhost:3001/api';

class ApiService {
  private async fetchWithTimeout(
    url: string,
    options: RequestInit = {},
    timeout: number = 5000
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  // Health check
  async checkHealth(): Promise<ApiResponse<HealthStatus>> {
    try {
      const response = await this.fetchWithTimeout(`${BASE_URL}/../health`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('❌ [SERVER] Health check failed:', error);
      return {
        success: false,
        data: {
          status: 'error',
          timestamp: Date.now(),
          version: 'unknown',
        },
        message: error instanceof Error ? error.message : 'Health check failed',
      };
    }
  }

  // Get all positions
  async getPositions(): Promise<ApiResponse<Position[]>> {
    try {
      const response = await this.fetchWithTimeout(`${BASE_URL}/positions`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      // Accept both array and object-with-array payloads
      const positions: Position[] = Array.isArray(data)
        ? data
        : data && Array.isArray(data.allPositions)
        ? data.allPositions
        : [];
      console.log('✅ [SERVER] Positions data received:');
      console.log(JSON.stringify(data, null, 2));
      return { success: true, data: positions };
    } catch (error) {
      console.error('❌ [SERVER] Failed to fetch positions:', error);
      return {
        success: false,
        data: [],
        message:
          error instanceof Error ? error.message : 'Failed to fetch positions',
      };
    }
  }

  // Get all orders
  async getOrders(): Promise<ApiResponse<Order[]>> {
    try {
      const response = await this.fetchWithTimeout(`${BASE_URL}/orders`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('✅ [SERVER] Orders data received:');
      console.log(JSON.stringify(data, null, 2));
      return { success: true, data };
    } catch (error) {
      console.error('❌ [SERVER] Failed to fetch orders:', error);
      return {
        success: false,
        data: [],
        message:
          error instanceof Error ? error.message : 'Failed to fetch orders',
      };
    }
  }

  // Get specific order by ID
  async getOrder(orderId: string): Promise<ApiResponse<Order | null>> {
    try {
      const response = await this.fetchWithTimeout(
        `${BASE_URL}/orders/${orderId}`
      );
      if (!response.ok) {
        if (response.status === 404) {
          return { success: true, data: null, message: 'Order not found' };
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error(`Failed to fetch order ${orderId}:`, error);
      return {
        success: false,
        data: null,
        message:
          error instanceof Error ? error.message : 'Failed to fetch order',
      };
    }
  }

  // Get specific position by ID
  async getPosition(positionId: string): Promise<ApiResponse<Position | null>> {
    try {
      const response = await this.fetchWithTimeout(
        `${BASE_URL}/positions/${positionId}`
      );
      if (!response.ok) {
        if (response.status === 404) {
          return { success: true, data: null, message: 'Position not found' };
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error(`Failed to fetch position ${positionId}:`, error);
      return {
        success: false,
        data: null,
        message:
          error instanceof Error ? error.message : 'Failed to fetch position',
      };
    }
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;
