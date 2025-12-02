'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setIsAdmin(user.role === 'admin');
  }, []);

  const showMembers = isAdmin && pathname !== '/login';

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link href="/" className="brand-logo" onClick={handleNavClick}>
          
          <span className="logo-text">Inventory Management</span>
        </Link>
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>
        <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <Link href="/" className="nav-link" onClick={handleNavClick}>Dashboard</Link>
          <Link href="/inventory" className="nav-link" onClick={handleNavClick}>Inventory</Link>
          <Link href="/transactions" className="nav-link" onClick={handleNavClick}>Transactions</Link>
          <Link href="/history" className="nav-link" onClick={handleNavClick}>History</Link>
          {showMembers && <Link href="/members" className="nav-link" onClick={handleNavClick}>Members</Link>}
        </div>
      </div>
    </nav>
  );
}
