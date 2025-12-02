import { getDb } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const db = await getDb();
    const [transactions] = await db.query(`
      SELECT t.*, p.name as product_name, u.name as user_name
      FROM transactions t
      JOIN products p ON t.product_id = p.id
      JOIN users u ON t.user_id = u.id
      ORDER BY t.timestamp DESC
    `);
    return NextResponse.json(transactions);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { product_id, user_id, type, quantity } = await request.json();
    if (!product_id || !user_id || !type || !quantity) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });

    const db = await getDb();

    // Get product
    const [productRows] = await db.query('SELECT quantity FROM products WHERE id = ?', [product_id]);
    const product = productRows[0];
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });

    let newQuantity = product.quantity;

    if (type === 'CHECKOUT') {
      if (product.quantity < quantity) return NextResponse.json({ error: `Insufficient quantity. Available: ${product.quantity}` }, { status: 400 });
      newQuantity -= quantity;
    } else if (type === 'CHECKIN') {
      const [checkedOut] = await db.query(`
        SELECT SUM(quantity) as total_checked_out FROM transactions
        WHERE user_id = ? AND product_id = ? AND type='CHECKOUT'
      `, [user_id, product_id]);
      const [checkedIn] = await db.query(`
        SELECT SUM(quantity) as total_checked_in FROM transactions
        WHERE user_id = ? AND product_id = ? AND type='CHECKIN'
      `, [user_id, product_id]);

      const outstanding = (checkedOut[0]?.total_checked_out || 0) - (checkedIn[0]?.total_checked_in || 0);
      if (quantity > outstanding) return NextResponse.json({ error: `You can return only ${outstanding} units` }, { status: 400 });
      newQuantity += quantity;
    } else {
      return NextResponse.json({ error: 'Invalid transaction type' }, { status: 400 });
    }

    await db.query('UPDATE products SET quantity = ? WHERE id = ?', [newQuantity, product_id]);
    const [result] = await db.query('INSERT INTO transactions (product_id, user_id, type, quantity) VALUES (?, ?, ?, ?)', [product_id, user_id, type, quantity]);

    return NextResponse.json({ id: result.insertId, product_id, user_id, type, quantity, timestamp: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Transaction failed' }, { status: 400 });
  }
}
