import { getDb } from '@/lib/db';
import { NextResponse } from 'next/server';

const ADMIN_NAME = 'Jaswanth';
const ADMIN_PASSWORD = 'Admin@123';

export async function POST(request) {
  try {
    const { student_id, name, role, admin_password, member_password } = await request.json();
    if (!student_id || !name) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });

    const db = await getDb();

    let userRole = 'member';
    let userPassword = null;

    if (role === 'admin') {
      if (name !== ADMIN_NAME || admin_password !== ADMIN_PASSWORD)
        return NextResponse.json({ error: 'Invalid admin credentials' }, { status: 403 });
      userRole = 'admin';
    } else {
      if (!member_password) return NextResponse.json({ error: 'Member password required' }, { status: 400 });
      userPassword = member_password;
    }

    const [existing] = await db.query('SELECT * FROM users WHERE student_id = ?', [student_id]);
    let user = existing[0];

    if (!user) {
      if (role === 'admin') {
        const [result] = await db.query(
          'INSERT INTO users (student_id, name, role, password) VALUES (?, ?, ?, ?)',
          [student_id, name, userRole, userPassword]
        );
        user = { id: result.insertId, student_id, name, role: userRole };
      } else {
        return NextResponse.json({ error: 'User not found. Contact admin.' }, { status: 403 });
      }
    } else if (role === 'member' && user.password !== member_password) {
      return NextResponse.json({ error: 'Incorrect password' }, { status: 403 });
    }

    // Log access
    await db.query('INSERT INTO access_logs (user_id, student_id, name, role) VALUES (?, ?, ?, ?)', [
      user.id,
      student_id,
      name,
      userRole
    ]);

    return NextResponse.json({ id: user.id, student_id, name, role: userRole });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
