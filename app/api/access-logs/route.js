import { getDb } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = await getDb();
    const [logs] = await db.query(`
      SELECT al.id, al.user_id, al.student_id, al.name, al.role, al.accessed_at, u.password
      FROM access_logs al
      LEFT JOIN users u ON al.user_id = u.id
      ORDER BY al.accessed_at DESC
    `);

    return NextResponse.json(logs);
  } catch (error) {
    console.error('Error fetching access logs:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
