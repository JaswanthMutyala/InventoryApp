import { getDb } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get('user_id');
    const product_id = searchParams.get('product_id');

    if (!user_id) return NextResponse.json({ error: 'user_id is required' }, { status: 400 });

    const db = await getDb();
    let query = `
      SELECT t.product_id, p.name as product_name,
        SUM(CASE WHEN t.type='CHECKOUT' THEN t.quantity ELSE 0 END) as total_checked_out,
        SUM(CASE WHEN t.type='CHECKIN' THEN t.quantity ELSE 0 END) as total_checked_in,
        SUM(CASE WHEN t.type='CHECKOUT' THEN t.quantity ELSE 0 END) -
        SUM(CASE WHEN t.type='CHECKIN' THEN t.quantity ELSE 0 END) as outstanding
      FROM transactions t
      JOIN products p ON t.product_id = p.id
      WHERE t.user_id = ?
    `;
    const params = [user_id];
    if (product_id) {
      query += ' AND t.product_id = ?';
      params.push(product_id);
    }
    query += ' GROUP BY t.product_id, p.name HAVING outstanding > 0';

    const [rows] = await db.query(query, params);
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch outstanding quantities' }, { status: 500 });
  }
}
