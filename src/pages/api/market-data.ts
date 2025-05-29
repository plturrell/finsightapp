import type { NextApiRequest, NextApiResponse } from 'next';

// Mock market data
const marketData = {
  indices: [
    { id: 1, name: 'S&P 500', value: 4912.25, change: 1.23, previousClose: 4852.65 },
    { id: 2, name: 'Dow Jones', value: 36724.12, change: 0.89, previousClose: 36399.12 },
    { id: 3, name: 'NASDAQ', value: 15732.45, change: -0.34, previousClose: 15786.08 },
    { id: 4, name: 'Russell 2000', value: 2025.78, change: 0.56, previousClose: 2014.52 },
  ],
  sectors: [
    { id: 1, name: 'Technology', performance: 2.14, marketCap: '12.8T' },
    { id: 2, name: 'Healthcare', performance: 0.82, marketCap: '5.6T' },
    { id: 3, name: 'Financials', performance: 1.05, marketCap: '8.2T' },
    { id: 4, name: 'Consumer Discretionary', performance: -0.42, marketCap: '3.9T' },
    { id: 5, name: 'Industrials', performance: 0.77, marketCap: '4.1T' },
  ],
  topGainers: [
    { id: 1, symbol: 'AAPL', name: 'Apple Inc.', price: 182.63, change: 3.28 },
    { id: 2, symbol: 'MSFT', name: 'Microsoft Corp.', price: 376.17, change: 2.74 },
    { id: 3, symbol: 'NVDA', name: 'NVIDIA Corp.', price: 466.82, change: 5.12 },
  ],
  topLosers: [
    { id: 1, symbol: 'AMZN', name: 'Amazon.com Inc.', price: 142.83, change: -1.76 },
    { id: 2, symbol: 'TSLA', name: 'Tesla Inc.', price: 215.49, change: -2.34 },
    { id: 3, symbol: 'META', name: 'Meta Platforms Inc.', price: 328.41, change: -0.92 },
  ],
  timestamp: new Date().toISOString(),
};

type MarketDataResponse = {
  indices: typeof marketData.indices;
  sectors: typeof marketData.sectors;
  topGainers: typeof marketData.topGainers;
  topLosers: typeof marketData.topLosers;
  timestamp: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<MarketDataResponse>
) {
  // Add random fluctuations to make data dynamic
  const randomizedData = {
    ...marketData,
    indices: marketData.indices.map(index => ({
      ...index,
      value: index.value + (Math.random() * 10 - 5),
      change: index.change + (Math.random() * 0.5 - 0.25),
    })),
    timestamp: new Date().toISOString(),
  };

  // Simulate API latency
  setTimeout(() => {
    res.status(200).json(randomizedData);
  }, 300);
}