'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Helper function to format date
const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Status badge component
const StatusBadge = ({ status }) => {
  const statusConfig = {
    CHECKOUT: { text: 'Checked Out', color: 'bg-blue-100 text-blue-800' },
    RETURN: { text: 'Returned', color: 'bg-green-100 text-green-800' },
    OVERDUE: { text: 'Overdue', color: 'bg-red-100 text-red-800' },
  };
  
  const config = statusConfig[status] || { text: status, color: 'bg-gray-100 text-gray-800' };
  
  return (
    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${config.color}`}>
      {config.text}
    </span>
  );
};

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ 
    totalProducts: 0, 
    lowStock: 0, 
    recentTransactions: [], 
    userCheckouts: [],
    userTransactions: [] 
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
    } else {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      fetchStats(userData);
    }
  }, [router]);

  const fetchStats = async (userData) => {
    try {
      const [productsRes, outstandingRes, transactionsRes] = await Promise.all([
        fetch('/api/products'),
        fetch(`/api/transactions/outstanding?user_id=${userData.id}`),
        fetch(userData.role === 'admin' ? '/api/transactions' : `/api/transactions?user_id=${userData.id}`)
      ]);

      const productsData = await productsRes.json();
      const outstandingData = await outstandingRes.json();
      const transactionsData = await transactionsRes.json();

      const products = Array.isArray(productsData) ? productsData : [];
      const outstanding = Array.isArray(outstandingData) ? outstandingData : [];
      const transactions = Array.isArray(transactionsData) ? transactionsData : [];

      // Get user's transactions (both checkouts and returns)
      const userTransactions = transactions
        .map(tx => ({
          ...tx,
          product_name: products.find(p => p.id === tx.product_id)?.name || 'Unknown Product'
        }))
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 5); // Show only 5 most recent transactions

      setStats({
        totalProducts: products.length,
        lowStock: products.filter(p => p.quantity < 5).length,
        recentTransactions: userTransactions,
        userCheckouts: outstanding.map(o => {
          const product = products.find(p => p.id === o.product_id);
          const checkoutTransaction = transactions.find(t => 
            t.product_id === o.product_id && 
            t.user_id === userData.id && 
            t.type === 'CHECKOUT'
          );
          
          return { 
            ...o, 
            product_name: product?.name || 'Unknown Product',
            checkout_date: checkoutTransaction ? formatDate(checkoutTransaction.timestamp) : '-',
            status: 'CHECKOUT'
          };
        }),
        userTransactions: userTransactions
      });
    } catch (error) {
      console.error('Failed to fetch stats', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user || isLoading) return null;

  const isAdmin = user.role === 'admin';

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#1e293b', margin: 0, marginBottom: '0.5rem' }}>Welcome {user.name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.95rem', color: '#64748b' }}>
            <span>Student ID: {user.student_id}</span>
            <span className={`badge ${isAdmin ? 'badge-primary' : 'badge-success'}`}>
              {isAdmin ? 'Admin' : 'member'}
            </span>
          </div>
        </div>
        <button
          onClick={() => { localStorage.removeItem('user'); router.push('/login'); }}
          className="btn btn-secondary"
          style={{ padding: '0.35rem 0.6rem !important', fontSize: '0.7rem !important', height: 'auto', minHeight: '24px', lineHeight: '1.2', width: 'auto' }}
        >
          Logout
        </button>
      </header>

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, color: '#1e293b', marginBottom: '1rem' }}>Overview</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ color: '#64748b', fontSize: '0.95rem' }}>Total Products</span>
              <span style={{ fontSize: '1.75rem', fontWeight: 700, color: '#3b82f6' }}>{stats.totalProducts}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#64748b', fontSize: '0.95rem' }}>Low Stock Items</span>
              <span style={{ fontSize: '1.75rem', fontWeight: 700, color: stats.lowStock > 0 ? '#dc2626' : '#22c55e' }}>{stats.lowStock}</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link href="/transactions" className="btn btn-primary" style={{ textDecoration: 'none', textAlign: 'center' }}>
              Take / Return
            </Link>
            {isAdmin && (
              <Link href="/inventory" className="btn btn-secondary" style={{ textDecoration: 'none', textAlign: 'center' }}>
               Manage
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
          <h2 className="text-base font-semibold text-gray-800">Current Checkouts</h2>
          <p className="text-xs text-gray-500 mt-1">Items currently checked out under your name</p>
        </div>
        
        {stats.userCheckouts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th scope="col" className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                  <th scope="col" className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Checked Out</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stats.userCheckouts.map((item) => (
                  <tr key={`${item.product_id}-${item.checkout_date}`} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.product_name}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-orange-600 font-medium">{item.outstanding}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-500">{item.checkout_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-4 py-3 bg-gray-50 flex justify-between items-center">
              <Link 
                href="/transactions" 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Manage Checkouts
              </Link>
              <Link 
                href="/history" 
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                View Full History →
              </Link>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center">
            <p className="text-gray-500 text-sm mb-4">No items currently checked out</p>
            <Link 
              href="/history" 
              className="btn btn-primary"
              style={{ display: 'inline-block', textDecoration: 'none', textAlign: 'center' }}
            >
              View Transaction History
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
