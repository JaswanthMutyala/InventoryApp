import { getDb } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  try {
    const id = params.id;
    const { name, description = '', quantity = 0, user_id, image_url } = await request.json();

    if (!name || !user_id) return NextResponse.json({ error: 'Name and user_id are required' }, { status: 400 });

    const db = await getDb();
    const [user] = await db.query('SELECT role FROM users WHERE id = ?', [user_id]);
    if (!user[0] || user[0].role !== 'admin') return NextResponse.json({ error: 'Only admins can update products' }, { status: 403 });

    // Update product
    const [result] = await db.query(
      'UPDATE products SET name = ?, description = ?, quantity = ?, image_url = ? WHERE id = ?',
      [name, description, quantity, image_url, id]
    );

    if (result.affectedRows === 0) return NextResponse.json({ error: 'Product not found' }, { status: 404 });

    return NextResponse.json({ id, name, description, quantity, image_url });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = params.id;
    const { user_id } = await request.json();

    if (!user_id) return NextResponse.json({ error: 'user_id is required' }, { status: 400 });

    const db = await getDb();
    const [user] = await db.query('SELECT role FROM users WHERE id = ?', [user_id]);
    if (!user[0] || user[0].role !== 'admin') return NextResponse.json({ error: 'Only admins can delete products' }, { status: 403 });

    await db.query('DELETE FROM transactions WHERE product_id = ?', [id]);
    const [result] = await db.query('DELETE FROM products WHERE id = ?', [id]);

    if (result.affectedRows === 0) return NextResponse.json({ error: 'Product not found' }, { status: 404 });

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product', details: error.message }, { status: 500 });
  }
}
