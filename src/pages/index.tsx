import Head from 'next/head';
import Link from 'next/link';
import { FiBarChart2, FiPieChart, FiTrendingUp, FiGlobe } from 'react-icons/fi';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>FinSight - Financial Insights Platform</title>
        <meta name="description" content="Advanced financial insights and analytics platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-blue-600">FinSight</h1>
            <div className="flex space-x-4">
              <Link href="/dashboard" className="button-primary">
                Dashboard
              </Link>
              <Link href="/login" className="button-secondary">
                Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="lg:w-1/2">
                <h2 className="text-4xl font-extrabold sm:text-5xl sm:tracking-tight">
                  <span className="block">Financial insights</span>
                  <span className="block">powered by AI</span>
                </h2>
                <p className="mt-4 text-xl">
                  Unlock the power of data-driven financial decision making with advanced analytics and real-time insights.
                </p>
                <div className="mt-8">
                  <Link href="/dashboard" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-600 bg-white hover:bg-indigo-50">
                    Get Started
                  </Link>
                </div>
              </div>
              <div className="mt-10 lg:mt-0 lg:w-1/2 lg:flex lg:justify-end">
                {/* Placeholder for hero image */}
                <div className="bg-white/20 rounded-lg p-6 w-full h-64 flex items-center justify-center">
                  <FiTrendingUp className="w-24 h-24" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">
              Powerful Financial Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="card">
                <div className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <FiBarChart2 className="text-blue-600 w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Advanced Analytics</h3>
                <p className="text-gray-600">
                  Comprehensive financial analytics with interactive visualizations and real-time data.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="card">
                <div className="rounded-full bg-green-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <FiPieChart className="text-green-600 w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Portfolio Management</h3>
                <p className="text-gray-600">
                  Track, analyze, and optimize your investment portfolio with AI-powered recommendations.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="card">
                <div className="rounded-full bg-purple-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <FiGlobe className="text-purple-600 w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Market Intelligence</h3>
                <p className="text-gray-600">
                  Stay informed with the latest market trends, news, and insights from around the world.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold">FinSight</h2>
              <p className="text-gray-300">Financial insights platform</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-300 hover:text-white">About</a>
              <a href="#" className="text-gray-300 hover:text-white">Features</a>
              <a href="#" className="text-gray-300 hover:text-white">Pricing</a>
              <a href="#" className="text-gray-300 hover:text-white">Contact</a>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} FinSight. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}