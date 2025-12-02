'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MembersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [deletePassword, setDeletePassword] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [addFormData, setAddFormData] = useState({
        name: '',
        student_id: '',
        password: ''
    });
    const [searchText, setSearchText] = useState('');
    const [sortOrder, setSortOrder] = useState('desc'); // desc | asc
    const [addingMember, setAddingMember] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user.role !== 'admin') {
            router.push('/');
            return;
        }
        setIsAdmin(true);
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const res = await fetch('/api/users', {
                headers: {
                    'Authorization': `Bearer ${user.id}`
                }
            });

            if (res.ok) {
                const data = await res.json();
                setUsers(data);
            } else {
                setError('Failed to fetch users');
            }
        } catch (err) {
            setError('Error fetching users');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
        setDeletePassword('');
    };

    const handleDeleteConfirm = async () => {
        if (!deletePassword) {
            setError('Please enter admin password');
            return;
        }

        setDeleting(true);
        setError('');

        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const res = await fetch('/api/users', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.id}`
                },
                body: JSON.stringify({
                    userId: userToDelete.id,
                    password: deletePassword
                })
            });

            if (res.ok) {
                setUsers(users.filter(u => u.id !== userToDelete.id));
                setShowDeleteModal(false);
                setUserToDelete(null);
                setDeletePassword('');
            } else {
                const data = await res.json();
                setError(data.error || 'Failed to delete user');
            }
        } catch (err) {
            setError('Error deleting user');
        } finally {
            setDeleting(false);
        }
    };

    const handleAddMember = async () => {
        if (!addFormData.name || !addFormData.student_id || !addFormData.password) {
            setError('Please fill in all fields');
            return;
        }

        setAddingMember(true);
        setError('');

        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const res = await fetch('/api/users/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.id}`
                },
                body: JSON.stringify({
                    name: addFormData.name,
                    student_id: addFormData.student_id,
                    password: addFormData.password
                })
            });

            if (res.ok) {
                const newUser = await res.json();
                setUsers([...users, newUser]);
                setShowAddModal(false);
                setAddFormData({ name: '', student_id: '', password: '' });
            } else {
                const data = await res.json();
                setError(data.error || 'Failed to add member');
            }
        } catch (err) {
            setError('Error adding member');
        } finally {
            setAddingMember(false);
        }
    };

    const adminCount = users.filter(u => u.role === 'admin').length;
    const memberCount = users.filter(u => u.role === 'member').length;

    const filteredUsers = [...users]
        .filter(u => {
            if (!searchText.trim()) return true;
            const term = searchText.toLowerCase();
            return (
                u.name.toLowerCase().includes(term) ||
                (u.student_id || '').toLowerCase().includes(term)
            );
        })
        .sort((a, b) => {
            const da = new Date(a.created_at);
            const db = new Date(b.created_at);
            return sortOrder === 'desc' ? db - da : da - db;
        });

    if (!isAdmin) {
        return null;
    }

    return (
        <div className="container" style={{ padding: '2rem 1rem', maxWidth: '1200px' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Members Management</h1>

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
                            {adminCount}
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
                            {memberCount}
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
                            {users.length}
                        </div>
                        <div style={{ color: '#666', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                            Total Users
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Member Button */}
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <button
                    onClick={() => setShowAddModal(true)}
                    style={{
                        backgroundColor: '#22c55e',
                        color: '#fff',
                        border: 'none',
                        padding: '0.75rem 2rem',
                        borderRadius: 'var(--radius)',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: '600',
                        transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#16a34a'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#22c55e'}
                >
                    Add New Member
                </button>
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

            {/* Filters above table */}
            {!loading && users.length > 0 && (
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                    marginBottom: '1rem',
                    alignItems: 'center'
                }}>
                    <input
                        type="text"
                        placeholder="Search by name or roll number"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{
                            flex: '1 1 220px',
                            minWidth: '220px',
                            padding: '0.6rem 0.8rem',
                            borderRadius: 'var(--radius)',
                            border: '1px solid #d1d5db',
                            fontSize: '0.9rem'
                        }}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.85rem', color: '#4b5563' }}>Order:</label>
                            <select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                                style={{
                                    padding: '0.45rem 0.75rem',
                                    borderRadius: 'var(--radius)',
                                    border: '1px solid #d1d5db',
                                    fontSize: '0.85rem',
                                    cursor: 'pointer'
                                }}
                            >
                                <option value="desc">Newest first</option>
                                <option value="asc">Oldest first</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {loading ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>
            ) : filteredUsers.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                    No users found
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
                                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Joined Date</th>
                                <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '600' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                    <td style={{ padding: '1rem' }}>{user.name}</td>
                                    <td style={{ padding: '1rem' }}>{user.student_id}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            display: 'inline-block',
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '999px',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            backgroundColor: user.role === 'admin' ? '#fef3c7' : '#dbeafe',
                                            color: user.role === 'admin' ? '#b45309' : '#1e40af'
                                        }}>
                                            {user.role === 'admin' ? 'Admin' : 'Member'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                                        {new Date(user.created_at).toLocaleDateString('en-IN')}
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                                        {user.role === 'member' && (
                                            <button
                                                onClick={() => handleDeleteClick(user)}
                                                style={{
                                                    backgroundColor: '#ef4444',
                                                    color: '#fff',
                                                    border: 'none',
                                                    padding: '0.5rem 1rem',
                                                    borderRadius: 'var(--radius)',
                                                    cursor: 'pointer',
                                                    fontSize: '0.875rem',
                                                    fontWeight: '500',
                                                    transition: 'background-color 0.2s'
                                                }}
                                                onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'}
                                                onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}
                                            >
                                                🗑️ Remove
                                            </button>
                                        )}
                                        {user.role === 'admin' && (
                                            <span style={{ color: '#999', fontSize: '0.875rem' }}>
                                                Cannot delete admin
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: '#fff',
                        borderRadius: 'var(--radius)',
                        padding: '2rem',
                        maxWidth: '400px',
                        width: '90%',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
                    }}>
                        <h2 style={{ marginBottom: '1rem', color: '#1f2937' }}>
                            Remove Member
                        </h2>
                        <p style={{ color: '#666', marginBottom: '1.5rem' }}>
                            Are you sure you want to remove <strong>{userToDelete?.name}</strong>? This action cannot be undone.
                        </p>

                        {error && (
                            <div style={{
                                backgroundColor: '#fee2e2',
                                border: '1px solid #fca5a5',
                                color: '#dc2626',
                                padding: '0.75rem 1rem',
                                borderRadius: 'var(--radius)',
                                marginBottom: '1rem',
                                fontSize: '0.875rem'
                            }}>
                                {error}
                            </div>
                        )}

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                                Admin Password:
                            </label>
                            <input
                                type="password"
                                value={deletePassword}
                                onChange={(e) => setDeletePassword(e.target.value)}
                                placeholder="Enter admin password"
                                disabled={deleting}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '1px solid #d1d5db',
                                    borderRadius: 'var(--radius)',
                                    fontSize: '1rem',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                disabled={deleting}
                                style={{
                                    backgroundColor: '#e5e7eb',
                                    color: '#1f2937',
                                    border: 'none',
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: 'var(--radius)',
                                    cursor: deleting ? 'not-allowed' : 'pointer',
                                    fontWeight: '500',
                                    opacity: deleting ? 0.6 : 1
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteConfirm}
                                disabled={deleting}
                                style={{
                                    backgroundColor: '#ef4444',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: 'var(--radius)',
                                    cursor: deleting ? 'not-allowed' : 'pointer',
                                    fontWeight: '500',
                                    opacity: deleting ? 0.6 : 1
                                }}
                            >
                                {deleting ? 'Removing...' : 'Remove Member'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Member Modal */}
            {showAddModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: '#fff',
                        borderRadius: 'var(--radius)',
                        padding: '2rem',
                        maxWidth: '400px',
                        width: '90%',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
                    }}>
                        <h2 style={{ marginBottom: '1rem', color: '#1f2937' }}>
                            Add New Member
                        </h2>
                        

                        {error && (
                            <div style={{
                                backgroundColor: '#fee2e2',
                                border: '1px solid #fca5a5',
                                color: '#dc2626',
                                padding: '0.75rem 1rem',
                                borderRadius: 'var(--radius)',
                                marginBottom: '1rem',
                                fontSize: '0.875rem'
                            }}>
                                {error}
                            </div>
                        )}

                        <div style={{ display: 'grid', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                                    Name:
                                </label>
                                <input
                                    type="text"
                                    value={addFormData.name}
                                    onChange={(e) => setAddFormData({ ...addFormData, name: e.target.value })}
                                    placeholder="Enter member name"
                                    disabled={addingMember}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        border: '1px solid #d1d5db',
                                        borderRadius: 'var(--radius)',
                                        fontSize: '1rem',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                                    Roll Number:
                                </label>
                                <input
                                    type="text"
                                    value={addFormData.student_id}
                                    onChange={(e) => setAddFormData({ ...addFormData, student_id: e.target.value })}
                                    placeholder="Enter roll number"
                                    disabled={addingMember}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        border: '1px solid #d1d5db',
                                        borderRadius: 'var(--radius)',
                                        fontSize: '1rem',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                                    Password:
                                </label>
                                <input
                                    type="password"
                                    value={addFormData.password}
                                    onChange={(e) => setAddFormData({ ...addFormData, password: e.target.value })}
                                    placeholder="Enter password"
                                    disabled={addingMember}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        border: '1px solid #d1d5db',
                                        borderRadius: 'var(--radius)',
                                        fontSize: '1rem',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                            <button
                                onClick={() => setShowAddModal(false)}
                                disabled={addingMember}
                                style={{
                                    backgroundColor: '#e5e7eb',
                                    color: '#1f2937',
                                    border: 'none',
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: 'var(--radius)',
                                    cursor: addingMember ? 'not-allowed' : 'pointer',
                                    fontWeight: '500',
                                    opacity: addingMember ? 0.6 : 1
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddMember}
                                disabled={addingMember}
                                style={{
                                    backgroundColor: '#22c55e',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: 'var(--radius)',
                                    cursor: addingMember ? 'not-allowed' : 'pointer',
                                    fontWeight: '500',
                                    opacity: addingMember ? 0.6 : 1
                                }}
                            >
                                {addingMember ? 'Adding...' : 'Add Member'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div style={{ marginTop: '2rem' }}>
                <a href="/access-logs" style={{
                    color: '#3b82f6',
                    textDecoration: 'none',
                    fontWeight: '500',
                    marginRight: '2rem'
                }}>
                    → View Access Logs
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
