// Utility functions for formatting trading data

export const formatPrice = (
  price: string | number,
  decimals: number = 4
): string => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(numPrice)) return '0.00';

  return numPrice.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

export const formatVolume = (volume: string | number): string => {
  const numVolume = typeof volume === 'string' ? parseFloat(volume) : volume;
  if (isNaN(numVolume)) return '0';

  if (numVolume >= 1e9) {
    return `${(numVolume / 1e9).toFixed(2)}B`;
  } else if (numVolume >= 1e6) {
    return `${(numVolume / 1e6).toFixed(2)}M`;
  } else if (numVolume >= 1e3) {
    return `${(numVolume / 1e3).toFixed(2)}K`;
  }

  return numVolume.toFixed(2);
};

export const formatPnL = (pnl: string | number): string => {
  const numPnL = typeof pnl === 'string' ? parseFloat(pnl) : pnl;
  if (isNaN(numPnL)) return '0.00';

  const prefix = numPnL >= 0 ? '+' : '';
  return `${prefix}${numPnL.toFixed(2)}`;
};

export const formatPercent = (percent: string | number): string => {
  const numPercent =
    typeof percent === 'string' ? parseFloat(percent) : percent;
  if (isNaN(numPercent)) return '0.00%';

  const prefix = numPercent >= 0 ? '+' : '';
  return `${prefix}${numPercent.toFixed(2)}%`;
};

export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

export const formatDateTime = (timestamp: number): string => {
  return `${formatDate(timestamp)} ${formatTime(timestamp)}`;
};

export const truncateString = (str: string, maxLength: number = 10): string => {
  if (str.length <= maxLength) return str;
  return `${str.substring(0, maxLength)}...`;
};

export const formatOrderSize = (filled: string, total: string): string => {
  const numFilled = parseFloat(filled);
  const numTotal = parseFloat(total);

  if (isNaN(numFilled) || isNaN(numTotal)) return '0/0';

  return `${formatPrice(numFilled, 6)}/${formatPrice(numTotal, 6)}`;
};

export const calculateFillPercent = (filled: string, total: string): number => {
  const numFilled = parseFloat(filled);
  const numTotal = parseFloat(total);

  if (isNaN(numFilled) || isNaN(numTotal) || numTotal === 0) return 0;

  return (numFilled / numTotal) * 100;
};
