import { getDb } from '@/lib/db';
import { NextResponse } from 'next/server';

const ADMIN_PASSWORD = 'Admin@123';

export async function POST(request) {
  try {
    const { password } = await request.json();
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Invalid admin password' }, { status: 403 });
    }

    const db = await getDb();
    await db.query('DELETE FROM transactions');
    await db.query('DELETE FROM products');
    await db.query('DELETE FROM access_logs');

    return NextResponse.json({ message: 'All history and inventory cleared successfully' });
  } catch (error) {
    console.error('Error clearing data:', error);
    return NextResponse.json({ error: 'Failed to clear data' }, { status: 500 });
  }
}
