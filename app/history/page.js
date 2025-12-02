'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Helper function to format date only (no time)
const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

export default function TransactionHistory() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    userName: '',
    productName: 'All',
    date: '',
    type: 'All'
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
    } else {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      fetchData(userData);
    }
  }, [router]);

  const fetchData = async (userData) => {
    try {
      const [transactionsRes, productsRes] = await Promise.all([
        fetch('/api/transactions'),
        fetch('/api/products')
      ]);

      const transactionsData = await transactionsRes.json();
      const productsData = await productsRes.json();
      
      setProducts(productsData);
      setTransactions(transactionsData);
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredTransactions = transactions.filter(tx => {
    const productName = products.find(p => p.id === tx.product_id)?.name || 'Unknown Product';
    
    return (
      (filters.userName === '' || tx.user_name?.toLowerCase().includes(filters.userName.toLowerCase())) &&
      (filters.productName === 'All' || productName === filters.productName) &&
      (filters.date === '' || formatDate(tx.timestamp) === filters.date) &&
      (filters.type === 'All' || tx.type === filters.type)
    );
  });

  if (!user || isLoading) {
    return null;
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem', color: '#1e293b' }}>
        Transaction History
      </h1>

      {/* Filters */}
      <div className="card" style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {/* User Name Filter */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 500, color: '#374151' }}>User Name</label>
            <input
              type="text"
              name="userName"
              value={filters.userName}
              onChange={handleFilterChange}
              className="input"
              placeholder="Search..."
              style={{ padding: '0.625rem 0.75rem', fontSize: '0.875rem' }}
            />
          </div>

          {/* Product Filter */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 500, color: '#374151' }}>Product</label>
            <select
              name="productName"
              value={filters.productName}
              onChange={handleFilterChange}
              className="input"
              style={{ padding: '0.625rem 0.75rem', fontSize: '0.875rem', cursor: 'pointer' }}
            >
              <option value="All">All</option>
              {products.map(product => (
                <option key={product.id} value={product.name}>{product.name}</option>
              ))}
            </select>
          </div>

          {/* Date Filter */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 500, color: '#374151' }}>Date</label>
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
              className="input"
              style={{ padding: '0.625rem 0.75rem', fontSize: '0.875rem' }}
            />
          </div>

          {/* Type Filter */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 500, color: '#374151' }}>Type</label>
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="input"
              style={{ padding: '0.625rem 0.75rem', fontSize: '0.875rem', cursor: 'pointer' }}
            >
              <option value="All">All</option>
              <option value="CHECKOUT">Checkout</option>
              <option value="CHECKIN">Return</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="card">
        <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: '#1e293b' }}>
          Transaction History
        </h2>
        
        {filteredTransactions.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: 600, color: '#64748b' }}>User Name</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: 600, color: '#64748b' }}>Product</th>
                  <th style={{ padding: '0.75rem', textAlign: 'center', fontSize: '0.875rem', fontWeight: 600, color: '#64748b' }}>Quantity</th>
                  <th style={{ padding: '0.75rem', textAlign: 'center', fontSize: '0.875rem', fontWeight: 600, color: '#64748b' }}>Type</th>
                  <th style={{ padding: '0.75rem', textAlign: 'center', fontSize: '0.875rem', fontWeight: 600, color: '#64748b' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx, index) => {
                  const productName = products.find(p => p.id === tx.product_id)?.name || 'Unknown Product';
                  const typeLabel = tx.type === 'CHECKOUT' ? 'took' : 'return';
                  
                  return (
                    <tr key={index} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '0.75rem', fontSize: '0.875rem', color: '#1e293b' }}>{tx.user_name || '-'}</td>
                      <td style={{ padding: '0.75rem', fontSize: '0.875rem', color: '#1e293b' }}>{productName}</td>
                      <td style={{ padding: '0.75rem', textAlign: 'center', fontSize: '0.875rem', color: '#1e293b' }}>{tx.quantity}</td>
                      <td style={{ padding: '0.75rem', textAlign: 'center', fontSize: '0.875rem', color: '#1e293b' }}>{typeLabel}</td>
                      <td style={{ padding: '0.75rem', textAlign: 'center', fontSize: '0.875rem', color: '#1e293b' }}>{formatDate(tx.timestamp)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
            <p>No transactions yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
