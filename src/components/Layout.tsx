import { ReactNode, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiHome, FiTrendingUp, FiPieChart, FiDollarSign, FiSettings, FiBell, FiUser, FiMenu, FiX } from 'react-icons/fi';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export default function Layout({ children, title = 'FinSight', description = 'Financial insights platform' }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const navigationItems = [
    { name: 'Overview', href: '/dashboard', icon: FiHome },
    { name: 'Markets', href: '/dashboard/markets', icon: FiTrendingUp },
    { name: 'Portfolio', href: '/dashboard/portfolio', icon: FiPieChart },
    { name: 'Transactions', href: '/dashboard/transactions', icon: FiDollarSign },
    { name: 'Settings', href: '/dashboard/settings', icon: FiSettings },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>{`${title} | FinSight`}</title>
        <meta name="description" content={description} />
      </Head>

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className={`bg-white w-64 shadow-md fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
          <div className="flex items-center justify-between p-4 border-b">
            <Link href="/" className="text-xl font-bold text-blue-600">FinSight</Link>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-500">
              <FiX className="h-6 w-6" />
            </button>
          </div>
          <nav className="mt-6 px-4">
            <ul className="space-y-2">
              {navigationItems.map((item) => {
                const isActive = router.pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link 
                      href={item.href} 
                      className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                        isActive 
                          ? 'text-white bg-blue-600' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="absolute bottom-0 w-full p-4 border-t">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <FiUser className="h-6 w-6 text-gray-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">john.doe@example.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 md:ml-64 relative">
          {/* Header */}
          <header className="bg-white shadow-sm fixed w-full md:w-[calc(100%-16rem)] z-20">
            <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
              <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-500">
                <FiMenu className="h-6 w-6" />
              </button>
              <div className="flex-1 ml-4 md:ml-0">
                <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
              </div>
              <div className="flex items-center space-x-4">
                <button className="text-gray-600 hover:text-gray-800 relative">
                  <FiBell className="h-6 w-6" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                </button>
                <button className="text-gray-600 hover:text-gray-800">
                  <FiUser className="h-6 w-6" />
                </button>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="pt-16 pb-8 px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}