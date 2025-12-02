'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './admin.module.css';

export default function AdminPanel() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [stats, setStats] = useState({ adminCount: 0, memberCount: 0 });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const res = await fetch('/api/users', {
        headers: {
          'Authorization': `Bearer ${user.id}`
        }
      });

      if (res.ok) {
        const users = await res.json();
        const adminCount = users.filter(u => u.role === 'admin').length;
        const memberCount = users.filter(u => u.role === 'member').length;
        setStats({ adminCount, memberCount });
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    } finally {
      setLoadingStats(false);
    }
  };

  const handleClearDatabase = async () => {
    if (!password) {
      setError('Please enter admin password');
      return;
    }

    if (!window.confirm(' This will permanently delete ALL history and inventory! Are you sure?')) {
      return;
    }

    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch('/api/admin/clear-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(' Database cleared successfully!');
        setPassword('');
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        setError(data.error || 'Failed to clear database');
      }
    } catch (err) {
      setError('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <h1> Admin Panel</h1>

        {/* Statistics Section */}
        {!loadingStats && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              backgroundColor: '#dbeafe',
              border: '2px solid #3b82f6',
              borderRadius: 'var(--radius)',
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6' }}>
                {stats.adminCount}
              </div>
              <div style={{ color: '#666', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                Admin Users
              </div>
            </div>
            <div style={{
              backgroundColor: '#dcfce7',
              border: '2px solid #22c55e',
              borderRadius: 'var(--radius)',
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#22c55e' }}>
                {stats.memberCount}
              </div>
              <div style={{ color: '#666', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                Member Users
              </div>
            </div>
            <div style={{
              backgroundColor: '#f3e8ff',
              border: '2px solid #a855f7',
              borderRadius: 'var(--radius)',
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#a855f7' }}>
                {stats.adminCount + stats.memberCount}
              </div>
              <div style={{ color: '#666', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                Total Users
              </div>
            </div>
          </div>
        )}

        {/* Members Management Link */}
        <div style={{
          backgroundColor: '#f0f4ff',
          border: '2px solid #3b82f6',
          borderRadius: 'var(--radius)',
          padding: '1.5rem',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <h3 style={{ marginBottom: '1rem', color: '#1f2937' }}>👥 Manage Members</h3>
          <p style={{ color: '#666', marginBottom: '1rem', fontSize: '0.875rem' }}>
            View all registered users, add or remove members
          </p>
          <a href="/members" style={{
            display: 'inline-block',
            backgroundColor: '#3b82f6',
            color: '#fff',
            padding: '0.75rem 1.5rem',
            borderRadius: 'var(--radius)',
            textDecoration: 'none',
            fontWeight: '500',
            transition: 'background-color 0.2s'
          }} onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'} onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}>
            Go to Members Page →
          </a>
        </div>

        {/* Access Logs Link */}
        <div style={{
          backgroundColor: '#f0fdf4',
          border: '2px solid #22c55e',
          borderRadius: 'var(--radius)',
          padding: '1.5rem',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <h3 style={{ marginBottom: '1rem', color: '#1f2937' }}>📊 Access Logs</h3>
          <p style={{ color: '#666', marginBottom: '1rem', fontSize: '0.875rem' }}>
            View all members and admins who have accessed the system
          </p>
          <a href="/access-logs" style={{
            display: 'inline-block',
            backgroundColor: '#22c55e',
            color: '#fff',
            padding: '0.75rem 1.5rem',
            borderRadius: 'var(--radius)',
            textDecoration: 'none',
            fontWeight: '500',
            transition: 'background-color 0.2s'
          }} onMouseOver={(e) => e.target.style.backgroundColor = '#16a34a'} onMouseOut={(e) => e.target.style.backgroundColor = '#22c55e'}>
            View Access Logs →
          </a>
        </div>
        
        <div className={styles.section}>
          <h2>⚠️ Danger Zone</h2>
          <p className={styles.warning}>
            Clear all transaction history and inventory from the database.
            This action cannot be undone!
          </p>
          
          <div className={styles.formGroup}>
            <label>Admin Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              disabled={loading}
              onKeyPress={(e) => e.key === 'Enter' && handleClearDatabase()}
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}
          {message && <div className={styles.success}>{message}</div>}

          <button
            onClick={handleClearDatabase}
            disabled={loading}
            className={styles.dangerBtn}
          >
            {loading ? 'Clearing...' : ' Clear All Data'}
          </button>
        </div>

        <div className={styles.backLink}>
          <a href="/">← Back to Dashboard</a>
        </div>
      </div>
    </div>
  );
}
