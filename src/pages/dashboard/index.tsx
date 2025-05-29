import { useState } from 'react';
import Head from 'next/head';
import { FiHome, FiTrendingUp, FiDollarSign, FiPieChart, FiSettings, FiBell, FiUser } from 'react-icons/fi';
import Link from 'next/link';

// Mock data for dashboard
const marketOverview = [
  { id: 1, name: 'S&P 500', value: '4,912.25', change: '+1.23%', trending: 'up' },
  { id: 2, name: 'Dow Jones', value: '36,724.12', change: '+0.89%', trending: 'up' },
  { id: 3, name: 'NASDAQ', value: '15,732.45', change: '-0.34%', trending: 'down' },
  { id: 4, name: 'Russell 2000', value: '2,025.78', change: '+0.56%', trending: 'up' },
];

const portfolioSummary = {
  totalValue: '$247,892.34',
  dayChange: '+$3,241.56 (1.32%)',
  trending: 'up',
  allocation: [
    { category: 'Stocks', percentage: 65 },
    { category: 'Bonds', percentage: 20 },
    { category: 'Cash', percentage: 10 },
    { category: 'Alternatives', percentage: 5 },
  ],
};

const recentTransactions = [
  { id: 1, type: 'Buy', symbol: 'AAPL', shares: 10, price: '$182.63', date: '2023-11-01' },
  { id: 2, type: 'Sell', symbol: 'MSFT', shares: 5, price: '$376.17', date: '2023-10-28' },
  { id: 3, type: 'Buy', symbol: 'NVDA', shares: 8, price: '$466.82', date: '2023-10-25' },
  { id: 4, type: 'Dividend', symbol: 'VTI', shares: 0, price: '$42.31', date: '2023-10-15' },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Dashboard | FinSight</title>
        <meta name="description" content="Financial dashboard with real-time insights" />
      </Head>

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className={`bg-white w-64 shadow-md fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
          <div className="flex items-center justify-between p-4 border-b">
            <h1 className="text-xl font-bold text-blue-600">FinSight</h1>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-500">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="mt-6 px-4">
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="flex items-center px-4 py-3 text-gray-700 bg-gray-100 rounded-lg">
                  <FiHome className="mr-3 h-5 w-5" />
                  <span>Overview</span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard/markets" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <FiTrendingUp className="mr-3 h-5 w-5" />
                  <span>Markets</span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard/portfolio" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <FiPieChart className="mr-3 h-5 w-5" />
                  <span>Portfolio</span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard/transactions" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <FiDollarSign className="mr-3 h-5 w-5" />
                  <span>Transactions</span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard/settings" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <FiSettings className="mr-3 h-5 w-5" />
                  <span>Settings</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 md:ml-64 relative">
          {/* Header */}
          <header className="bg-white shadow-sm fixed w-full md:w-[calc(100%-16rem)] z-20">
            <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
              <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-500">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="flex-1 ml-4 md:ml-0">
                <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
              </div>
              <div className="flex items-center space-x-4">
                <button className="text-gray-600 hover:text-gray-800">
                  <FiBell className="h-6 w-6" />
                </button>
                <button className="text-gray-600 hover:text-gray-800">
                  <FiUser className="h-6 w-6" />
                </button>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="pt-16 pb-8 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {/* Total Portfolio Value */}
              <div className="card bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <h3 className="text-lg font-medium mb-2">Total Portfolio Value</h3>
                <p className="text-3xl font-bold">{portfolioSummary.totalValue}</p>
                <div className="flex items-center mt-2">
                  <span className={`inline-flex items-center ${portfolioSummary.trending === 'up' ? 'text-green-300' : 'text-red-300'}`}>
                    {portfolioSummary.trending === 'up' ? (
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    )}
                    {portfolioSummary.dayChange}
                  </span>
                </div>
              </div>

              {/* Market Overview */}
              <div className="card col-span-1 md:col-span-2 lg:col-span-2">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Market Overview</h3>
                  <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Index</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {marketOverview.map((item) => (
                        <tr key={item.id}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-700">{item.value}</td>
                          <td className={`px-4 py-3 whitespace-nowrap text-sm text-right ${item.trending === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                            {item.change}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Asset Allocation */}
              <div className="card">
                <h3 className="text-lg font-medium mb-4">Asset Allocation</h3>
                <div className="space-y-4">
                  {portfolioSummary.allocation.map((asset) => (
                    <div key={asset.category}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{asset.category}</span>
                        <span className="text-sm font-medium text-gray-700">{asset.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            asset.category === 'Stocks' ? 'bg-blue-600' : 
                            asset.category === 'Bonds' ? 'bg-green-500' : 
                            asset.category === 'Cash' ? 'bg-yellow-500' : 'bg-purple-500'
                          }`} 
                          style={{ width: `${asset.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="card col-span-1 md:col-span-2">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Recent Transactions</h3>
                  <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Shares</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentTransactions.map((transaction) => (
                        <tr key={transaction.id}>
                          <td className={`px-4 py-3 whitespace-nowrap text-sm font-medium ${
                            transaction.type === 'Buy' ? 'text-green-600' : 
                            transaction.type === 'Sell' ? 'text-red-600' : 'text-blue-600'
                          }`}>
                            {transaction.type}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{transaction.symbol}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-700">{transaction.shares}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-700">{transaction.price}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-500">{transaction.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}