import { getDb } from '@/lib/db';
import { NextResponse } from 'next/server';

const ADMIN_PASSWORD = 'Admin@123';

export async function POST(request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { name, student_id, password } = await request.json();
    if (!name || !student_id || !password) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });

    const db = await getDb();
    const [existing] = await db.query('SELECT * FROM users WHERE student_id = ?', [student_id]);
    if (existing.length > 0) return NextResponse.json({ error: 'Roll number already exists' }, { status: 400 });

    const [result] = await db.query('INSERT INTO users (student_id, name, role, password) VALUES (?, ?, ?, ?)', [
      student_id,
      name,
      'member',
      password
    ]);

    const newUser = { id: result.insertId, student_id, name, role: 'member', created_at: new Date().toISOString() };
    await db.query('INSERT INTO access_logs (user_id, student_id, name, role) VALUES (?, ?, ?, ?)', [
      newUser.id,
      student_id,
      name,
      'member'
    ]);

    return NextResponse.json(newUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
