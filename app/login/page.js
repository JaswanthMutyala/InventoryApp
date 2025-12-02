'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [studentId, setStudentId] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('member');
    const [adminPassword, setAdminPassword] = useState('');
    const [memberPassword, setMemberPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        // Validate inputs
        if (role === 'admin' && name !== 'Jaswanth') {
            setError('Admin name must be "Jaswanth"');
            return;
        }

        if (role === 'admin' && !adminPassword) {
            setError('Admin password is required');
            return;
        }

        if (role === 'member' && !memberPassword) {
            setError('Member password is required');
            return;
        }

        try {
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    student_id: studentId, 
                    name, 
                    role, 
                    admin_password: adminPassword,
                    member_password: memberPassword 
                }),
            });

            if (res.ok) {
                const user = await res.json();
                localStorage.setItem('user', JSON.stringify(user));
                window.location.href = '/';
            } else {
                const data = await res.json();
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            setError('An error occurred');
        }
    };

    return (
        <div className="container" style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: 'calc(100vh - 80px)',
            padding: '1rem'
        }}>
            <div className="card" style={{ 
                width: '100%', 
                maxWidth: '450px',
                margin: '0 auto',
                padding: '1.5rem',
                boxSizing: 'border-box'
            }}>
                <div style={{ 
                    textAlign: 'center', 
                    marginBottom: '1.5rem',
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word'
                }}>
                    <h1 className="text-2xl font-bold mb-2">Inventory Management</h1>
                </div>

                {error && (
                    <div style={{
                        backgroundColor: '#fee2e2',
                        border: '1px solid #fca5a5',
                        color: 'var(--danger)',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius)',
                        marginBottom: '1rem',
                        fontSize: '0.875rem'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} style={{ display: 'grid', gap: '1rem' }}>
                    <div className="form-group">
                        <label htmlFor="role" className="text-sm font-medium" style={{ display: 'block', marginBottom: '0.5rem' }}>Role</label>
                        <select
                            id="role"
                            className="input"
                            value={role}
                            onChange={(e) => {
                                setRole(e.target.value);
                                setAdminPassword('');
                                setMemberPassword('');
                            }}
                        >
                            <option value="member">Member</option>
                            <option value="admin">Admin</option>
                        </select>
                        
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="name" className="text-sm font-medium" style={{ display: 'block', marginBottom: '0.5rem' }}>Name</label>
                        <input
                            id="name"
                            type="text"
                            className="input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="studentId" className="text-sm font-medium" style={{ display: 'block', marginBottom: '0.5rem' }}>Registered Number</label>
                        <input
                            id="studentId"
                            type="text"
                            className="input"
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                            required
                            placeholder="Enter your Registered Number"
                        />
                    </div>

                    {role === 'member' && (
                        <div className="form-group">
                            <label htmlFor="memberPassword" className="text-sm font-medium">Password</label>
                            <input
                                id="memberPassword"
                                type="password"
                                className="input"
                                value={memberPassword}
                                onChange={(e) => setMemberPassword(e.target.value)}
                                placeholder="Enter your password"
                            />
                        </div>
                    )}

                    {role === 'admin' && (
                        <>
                            
                            <div className="form-group">
                                <label htmlFor="adminPassword" className="text-sm font-medium">Password</label>
                                <input
                                    id="adminPassword"
                                    type="password"
                                    className="input"
                                    value={adminPassword}
                                    onChange={(e) => setAdminPassword(e.target.value)}
                                    placeholder="Enter your password"
                                />
                            </div>
                        </>
                    )}

                    <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
