import { getDb } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const db = await getDb();
    const [products] = await db.query('SELECT * FROM products ORDER BY created_at DESC');
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { name, description = '', quantity = 0, user_id, image_url } = await request.json();
    if (!name || !user_id || !image_url) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });

    const db = await getDb();
    const [user] = await db.query('SELECT role FROM users WHERE id = ?', [user_id]);
    if (!user[0] || user[0].role !== 'admin') return NextResponse.json({ error: 'Only admins can create products' }, { status: 403 });

    const [result] = await db.query(
      'INSERT INTO products (name, description, quantity, image_url) VALUES (?, ?, ?, ?)',
      [name, description, quantity, image_url]
    );

    return NextResponse.json({ id: result.insertId, name, description, quantity, image_url });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
