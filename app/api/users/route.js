import { getDb } from '@/lib/db';
import { NextResponse } from 'next/server';

const ADMIN_PASSWORD = 'Admin@123';

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const userId = authHeader.split(' ')[1];

    const db = await getDb();
    const [requestingUserRows] = await db.query('SELECT role FROM users WHERE id = ?', [userId]);
    const requestingUser = requestingUserRows[0];

    if (!requestingUser || requestingUser.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const [users] = await db.query('SELECT id, student_id, name, role, password, created_at FROM users ORDER BY role DESC, created_at ASC');
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { password, userId } = await request.json();
    if (password !== ADMIN_PASSWORD) return NextResponse.json({ error: 'Invalid admin password' }, { status: 403 });
    if (!userId) return NextResponse.json({ error: 'User ID is required' }, { status: 400 });

    const db = await getDb();
    await db.query('DELETE FROM transactions WHERE user_id = ?', [userId]);
    await db.query('DELETE FROM access_logs WHERE user_id = ?', [userId]);
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [userId]);

    if (result.affectedRows === 0) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
