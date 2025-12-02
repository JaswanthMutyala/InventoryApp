'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AccessLogsPage() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [filterRole, setFilterRole] = useState('all');
    const [searchText, setSearchText] = useState('');
    const [dateFilter, setDateFilter] = useState('all'); // all | today | 7 | 30 | custom
    const [customDate, setCustomDate] = useState(''); // ISO date string (yyyy-mm-dd)
    const router = useRouter();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user.role !== 'admin') {
            router.push('/');
            return;
        }
        setIsAdmin(true);
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const res = await fetch('/api/access-logs', {
                headers: {
                    'Authorization': `Bearer ${user.id}`
                }
            });

            if (res.ok) {
                const data = await res.json();
                setLogs(data);
            } else {
                setError('Failed to fetch access logs');
            }
        } catch (err) {
            setError('Error fetching access logs');
        } finally {
            setLoading(false);
        }
    };

    const filteredLogs = logs
        // role filter
        .filter(log => (filterRole === 'all' ? true : log.role === filterRole))
        // text search on name or roll number
        .filter(log => {
            if (!searchText.trim()) return true;
            const term = searchText.toLowerCase();
            return (
                (log.name || '').toLowerCase().includes(term) ||
                (log.student_id || '').toLowerCase().includes(term)
            );
        })
        // date filter
        .filter(log => {
            if (dateFilter === 'all') return true;
            const d = new Date(log.accessed_at);

            // Custom specific date: compare only the date portion
            if (dateFilter === 'custom' && customDate) {
                const logDateStr = d.toISOString().slice(0, 10); // yyyy-mm-dd
                return logDateStr === customDate;
            }
            const now = new Date();

            // normalize to local date (midnight) for comparison
            const logDay = new Date(d.getFullYear(), d.getMonth(), d.getDate());
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const diffDays = (today - logDay) / (1000 * 60 * 60 * 24);

            if (dateFilter === 'today') {
                return diffDays === 0;
            }
            if (dateFilter === '7') {
                return diffDays >= 0 && diffDays <= 7;
            }
            if (dateFilter === '30') {
                return diffDays >= 0 && diffDays <= 30;
            }
            return true;
        });

    const adminAccessCount = logs.filter(log => log.role === 'admin').length;
    const memberAccessCount = logs.filter(log => log.role === 'member').length;
    const uniqueAdmins = new Set(logs.filter(log => log.role === 'admin').map(log => log.user_id)).size;
    const uniqueMembers = new Set(logs.filter(log => log.role === 'member').map(log => log.user_id)).size;

    if (!isAdmin) {
        return null;
    }

    return (
        <div className="container" style={{ padding: '2rem 1rem', maxWidth: '1200px' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Access Logs</h1>
                <p style={{ color: '#666', marginBottom: '1.5rem' }}>
                    View all members and admins who have accessed the system
                </p>

                {/* Statistics */}
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
                            {uniqueAdmins}
                        </div>
                        <div style={{ color: '#666', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                            Unique Admins
                        </div>
                        <div style={{ color: '#999', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                            {adminAccessCount} total accesses
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
                            {uniqueMembers}
                        </div>
                        <div style={{ color: '#666', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                            Unique Members
                        </div>
                        <div style={{ color: '#999', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                            {memberAccessCount} total accesses
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
                            {logs.length}
                        </div>
                        <div style={{ color: '#666', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                            Total Accesses
                        </div>
                    </div>
                </div>
            </div>

            {error && (
                <div style={{
                    backgroundColor: '#fee2e2',
                    border: '1px solid #fca5a5',
                    color: '#dc2626',
                    padding: '1rem',
                    borderRadius: 'var(--radius)',
                    marginBottom: '1rem'
                }}>
                    {error}
                </div>
            )}

            {/* Filters */}
            <div style={{
                marginBottom: '1.5rem',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem',
                alignItems: 'center',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <label style={{ fontWeight: '500', fontSize: '0.9rem' }}>Role:</label>
                    <select
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value)}
                        style={{
                            padding: '0.4rem 0.75rem',
                            border: '1px solid #d1d5db',
                            borderRadius: 'var(--radius)',
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                        }}
                    >
                        <option value="all">All</option>
                        <option value="admin">Admin only</option>
                        <option value="member">Member only</option>
                    </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: '1 1 220px' }}>
                    <label style={{ fontWeight: '500', fontSize: '0.9rem' }}>Search:</label>
                    <input
                        type="text"
                        placeholder="Name or roll number"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{
                            flex: '1 1 auto',
                            minWidth: '180px',
                            padding: '0.4rem 0.75rem',
                            borderRadius: 'var(--radius)',
                            border: '1px solid #d1d5db',
                            fontSize: '0.9rem',
                        }}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <label style={{ fontWeight: '500', fontSize: '0.9rem' }}>Date:</label>
                    <select
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        style={{
                            padding: '0.4rem 0.75rem',
                            border: '1px solid #d1d5db',
                            borderRadius: 'var(--radius)',
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                        }}
                    >
                        <option value="all">All time</option>
                        <option value="today">Today</option>
                        <option value="7">Last 7 days</option>
                        <option value="30">Last 30 days</option>
                        <option value="custom">Specific date…</option>
                    </select>
                    {dateFilter === 'custom' && (
                        <input
                            type="date"
                            value={customDate}
                            onChange={(e) => {
                                const value = (e.target.value || '').slice(0, 10); // yyyy-mm-dd max length
                                setCustomDate(value);
                            }}
                            style={{
                                marginLeft: '0.5rem',
                                padding: '0.4rem 0.6rem',
                                borderRadius: 'var(--radius)',
                                border: '1px solid #d1d5db',
                                fontSize: '0.85rem',
                            }}
                        />
                    )}
                </div>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>
            ) : logs.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                    No access logs found
                </div>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        backgroundColor: '#fff',
                        borderRadius: 'var(--radius)',
                        overflow: 'hidden',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                    }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f3f4f6', borderBottom: '2px solid #e5e7eb' }}>
                                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Name</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Roll Number</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Role</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLogs.map((log) => (
                                <tr key={log.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                    <td style={{ padding: '1rem' }}>{log.name}</td>
                                    <td style={{ padding: '1rem' }}>{log.student_id}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            display: 'inline-block',
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '999px',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            backgroundColor: log.role === 'admin' ? '#fef3c7' : '#dbeafe',
                                            color: log.role === 'admin' ? '#b45309' : '#1e40af'
                                        }}>
                                            {log.role === 'admin' ? 'Admin' : 'Member'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', fontSize: '0.875rem', fontFamily: 'monospace' }}>
                                        {(() => {
                                            const d = new Date(log.accessed_at);
                                            return d.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' });
                                        })()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <span style={{ color: '#999', fontSize: '0.875rem' }}>
                    Showing {filteredLogs.length} of {logs.length} total accesses
                </span>
            </div>

            <div style={{ marginTop: '2rem' }}>
                <a href="/members" style={{
                    color: '#3b82f6',
                    textDecoration: 'none',
                    fontWeight: '500',
                    marginRight: '2rem'
                }}>
                    → Back to Members
                </a>
                <a href="/" style={{
                    color: '#3b82f6',
                    textDecoration: 'none',
                    fontWeight: '500'
                }}>
                    ← Back to Dashboard
                </a>
            </div>
        </div>
    );
}
