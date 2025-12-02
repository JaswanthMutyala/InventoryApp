import './globals.css';
import Link from 'next/link';
import NavBar from './components/navbar';

export const metadata = {
  title: 'Inventory System',
  description: 'Manage your inventory efficiently',
  manifest: '/manifest.json',
  viewport: 'width=device-width, initial-scale=1.0, maximum-scale=5.0',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        <NavBar />
        <main className="container" style={{ minHeight: 'calc(100vh - 80px)', padding: '1rem' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
