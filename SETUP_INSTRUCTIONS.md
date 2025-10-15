# Bitget React Dashboard Setup Instructions

## Project Overview

Create a modern React TypeScript dashboard with Material-UI for Bitget trading data that connects to the WebSocket server running on `localhost:3001`.

## Required Features

- 📊 **BTCUSDT Ticker Display** - Real-time price updates
- 📋 **Orders Table** - Active orders with real-time updates
- 📈 **Positions Table** - Current positions with P&L
- 🎨 **Modern UI** - Material-UI components with responsive design
- 🔌 **WebSocket Integration** - Connect to bitget-websocket-server

## Setup Commands

### 1. Initialize Vite React Project

```bash
npm create vite@latest . -- --template react-ts
npm install
```

### 2. Install Dependencies

```bash
# Material-UI Core
npm install @mui/material @emotion/react @emotion/styled

# Material-UI Icons and Data Grid
npm install @mui/icons-material @mui/x-data-grid

# WebSocket Client
npm install socket.io-client
npm install @types/socket.io-client --save-dev
```

## Project Structure to Create

```
src/
├── components/
│   ├── Dashboard/
│   │   ├── Dashboard.tsx           # Main dashboard container
│   │   └── DashboardLayout.tsx     # Layout with AppBar, Sidebar
│   ├── Ticker/
│   │   └── TickerCard.tsx          # BTCUSDT price display
│   ├── Orders/
│   │   └── OrdersTable.tsx         # Orders data grid
│   ├── Positions/
│   │   └── PositionsTable.tsx      # Positions data grid
│   └── common/
│       └── LoadingSpinner.tsx      # Reusable loading component
├── hooks/
│   ├── useWebSocket.ts             # WebSocket connection hook
│   └── useTradingData.ts           # Trading data state management
├── types/
│   └── trading.types.ts            # TypeScript interfaces
├── services/
│   ├── api.ts                      # REST API calls
│   └── websocket.ts                # WebSocket service
├── theme/
│   └── theme.ts                    # MUI theme configuration
└── utils/
    └── formatters.ts               # Price/number formatting
```

## Key Components to Implement

### 1. WebSocket Events to Handle

- `ticker:subscribe` / `ticker:data` - BTCUSDT price updates
- `positions:subscribe` / `positions:data` - Positions data
- `orders:subscribe` / `orders:data` - Orders data

### 2. MUI Components to Use

- `AppBar` with `Toolbar` for header
- `Grid` for responsive layout
- `Card` with `CardContent` for ticker
- `DataGrid` for orders/positions tables
- `Typography` for text styling
- `Box` for layout containers

### 3. Color Scheme

- Green for profits/positive changes
- Red for losses/negative changes
- Dark theme with blue accents
- Professional trading interface look

## Server Connection Details

- **WebSocket URL**: `ws://localhost:3001`
- **REST API Base**: `http://localhost:3001/api`
- **Health Check**: `GET /health`
- **Positions**: `GET /api/positions`
- **Orders**: `GET /api/orders`

## Development Workflow

1. Start with basic Vite setup
2. Configure MUI theme
3. Create layout components
4. Implement WebSocket connection
5. Build ticker component
6. Add orders table
7. Add positions table
8. Style and polish

## Commands for New VS Code Window

After opening this project folder in VS Code:

1. **Initialize Project**: Ask Copilot to "create the complete Bitget React dashboard project using these instructions"

2. **Or Step by Step**:
   - "Initialize Vite React TypeScript project"
   - "Install Material-UI dependencies"
   - "Create the project structure and components"
   - "Implement WebSocket integration"
   - "Build the dashboard components"

The bitget-websocket-server is already running on port 3001, so the React app should connect to it automatically.
