'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TransactionsPage() {
    const router = useRouter();
    const [transactions, setTransactions] = useState([]);
    const [products, setProducts] = useState([]);
    const [outstanding, setOutstanding] = useState([]);
    const [user, setUser] = useState(null);
    const [transactionType, setTransactionType] = useState('CHECKOUT');
    const [bulkItems, setBulkItems] = useState([]);
    const [currentProduct, setCurrentProduct] = useState('');
    const [currentQuantity, setCurrentQuantity] = useState(1);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            router.push('/login');
        } else {
            setUser(JSON.parse(storedUser));
            fetchData();
        }
    }, [router]);

    const fetchData = async () => {
        const [transRes, prodRes] = await Promise.all([
            fetch('/api/transactions'),
            fetch('/api/products')
        ]);
        setTransactions(await transRes.json());
        setProducts(await prodRes.json());
        
        // Fetch outstanding quantities for the current user
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            const outstandingRes = await fetch(`/api/transactions/outstanding?user_id=${userData.id}`);
            setOutstanding(await outstandingRes.json());
        }
    };

    const getMaxReturnQuantity = (productId) => {
        const outstandingItem = outstanding.find(item => item.product_id === parseInt(productId));
        return outstandingItem?.outstanding || 0;
    };

    const addBulkItem = () => {
        if (!currentProduct) {
            setError('Please select a product');
            return;
        }

        const productId = parseInt(currentProduct);
        const product = products.find(p => p.id === productId);

        if (!product) {
            setError('Selected product is invalid');
            return;
        }
        
        // Check if product already in bulk items
        const existingIndex = bulkItems.findIndex(item => item.product_id === productId);
        const existingQty = existingIndex >= 0 ? bulkItems[existingIndex].quantity : 0;
        const requestedTotal = existingQty + currentQuantity;

        if (transactionType === 'CHECKOUT') {
            // Cannot take more than available stock
            if (requestedTotal > product.quantity) {
                setError(`Cannot take ${requestedTotal} units. Only ${product.quantity} unit(s) available for ${product.name}.`);
                return;
            }
        } else if (transactionType === 'CHECKIN') {
            const maxQty = getMaxReturnQuantity(productId);
            if (requestedTotal > maxQty) {
                setError(`Cannot return ${requestedTotal} units. You only have ${maxQty} unit(s) outstanding for ${product.name}.`);
                return;
            }
        }

        if (existingIndex >= 0) {
            // Update quantity if product already exists
            const newBulkItems = [...bulkItems];
            newBulkItems[existingIndex].quantity = requestedTotal;
            setBulkItems(newBulkItems);
        } else {
            // Add new item
            setBulkItems([
                ...bulkItems,
                { product_id: productId, product_name: product.name, product_image: product.image_url, quantity: currentQuantity },
            ]);
        }

        setCurrentProduct('');
        setCurrentQuantity(1);
        setError('');
    };

    const removeBulkItem = (productId) => {
        setBulkItems(bulkItems.filter(item => item.product_id !== productId));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (bulkItems.length === 0) {
            setError('Please add at least one item');
            return;
        }

        try {
            // Submit all items in bulk
            const promises = bulkItems.map(item =>
                fetch('/api/transactions', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        user_id: user.id,
                        product_id: item.product_id,
                        quantity: item.quantity,
                        type: transactionType,
                    }),
                })
            );

            const results = await Promise.all(promises);
            
            // Check if all succeeded
            const allSuccess = results.every(res => res.ok);
            
            if (allSuccess) {
                setSuccess(`Successfully ${transactionType === 'CHECKOUT' ? 'took' : 'returned'} ${bulkItems.length} product(s)!`);
                setBulkItems([]);
                fetchData();
                setTimeout(() => setSuccess(''), 1500);
            } else {
                setError('Some transactions failed. Please try again.');
            }
        } catch (err) {
            setError(err.message || 'Transaction failed');
        }
    };

    return (
        <div>
            <h1 className="section-title">Transactions</h1>

            <div className="card mb-6">
                <h2 className="text-lg font-semibold mb-4">New Transaction</h2>
                {error && (
                    <div style={{
                        backgroundColor: '#fee2e2',
                        border: '2px solid #ef4444',
                        borderRadius: 'var(--radius)',
                        padding: '1rem',
                        marginBottom: '1.5rem',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.75rem'
                    }}>
                        
                        <div>
                            <p style={{ 
                                color: '#991b1b', 
                                fontWeight: 600, 
                                marginBottom: '0.25rem' 
                            }}>
                                Transaction Failed
                            </p>
                            <p style={{ 
                                color: '#dc2626', 
                                fontSize: '0.875rem',
                                lineHeight: 1.5
                            }}>
                                {error}
                            </p>
                        </div>
                    </div>
                )}
                
                {success && (
                    <div style={{
                        backgroundColor: '#dcfce7',
                        border: '2px solid #22c55e',
                        borderRadius: 'var(--radius)',
                        padding: '1rem',
                        marginBottom: '1.5rem',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.75rem'
                    }}>
                        <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>✅</span>
                        <p style={{ 
                            color: '#15803d', 
                            fontWeight: 600,
                            fontSize: '0.95rem'
                        }}>
                            {success}
                        </p>
                    </div>
                )}
                <div style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '1rem', color: '#1e293b' }}>Transaction Type</h3>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                            <input
                                type="radio"
                                value="CHECKOUT"
                                checked={transactionType === 'CHECKOUT'}
                                onChange={e => setTransactionType(e.target.value)}
                                style={{ cursor: 'pointer' }}
                            />
                            <span>Take Products</span>
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                            <input
                                type="radio"
                                value="CHECKIN"
                                checked={transactionType === 'CHECKIN'}
                                onChange={e => setTransactionType(e.target.value)}
                                style={{ cursor: 'pointer' }}
                            />
                            <span>Return Products</span>
                        </label>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 100px', gap: '0.75rem', marginBottom: '1rem', alignItems: 'flex-end' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <label htmlFor="product" style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.875rem', fontWeight: 500 }}>Product</label>
                        <select
                            id="product"
                            className="input"
                            value={currentProduct}
                            onChange={e => setCurrentProduct(e.target.value)}
                            style={{ fontSize: '0.875rem', padding: '0.5rem 0.75rem', width: '100%' }}
                        >
                            <option value="">Select...</option>
                            {transactionType === 'CHECKOUT' 
                                ? products.map(p => (
                                    <option key={p.id} value={String(p.id)}>
                                        {p.name} (Available: {p.quantity})
                                    </option>
                                ))
                                : (outstanding && outstanding.length > 0)
                                    ? outstanding.map(o => {
                                        const product = products.find(p => p.id === o.product_id);
                                        if (!product) return null;
                                        return (
                                            <option key={o.product_id} value={String(o.product_id)}>
                                                {product.name} (Outstanding: {o.outstanding})
                                            </option>
                                        );
                                    })
                                    : <option disabled>No items to return</option>
                            }
                        </select>
                    </div>
                    
                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <label htmlFor="quantity" style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.875rem', fontWeight: 500 }}>
                            Quantity
                            {transactionType === 'CHECKIN' && currentProduct && (
                                <span style={{ fontSize: '0.75rem', color: '#64748b', marginLeft: '0.5rem' }}>(Max: {getMaxReturnQuantity(currentProduct)})</span>
                            )}
                        </label>
                        <input
                            id="quantity"
                            type="number"
                            className="input"
                            min="1"
                            max={transactionType === 'CHECKIN' && currentProduct ? getMaxReturnQuantity(currentProduct) : undefined}
                            value={currentQuantity}
                            onChange={e => setCurrentQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                            style={{ fontSize: '0.875rem', padding: '0.5rem 0.75rem', width: '100%' }}
                        />
                    </div>

                    <button
                        type="button"
                        onClick={addBulkItem}
                        className="btn btn-primary"
                        style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                    >
                        Add Item
                    </button>
                </div>

                {transactionType === 'CHECKIN' && outstanding && outstanding.length > 0 && (
                    <div style={{ marginBottom: '1.5rem', backgroundColor: '#eff6ff', border: '1px solid #93c5fd', borderRadius: 'var(--radius)', padding: '1rem' }}>
                        <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.75rem', color: '#1e40af' }}>📋 Products You Previously Took</h3>
                        <div className="grid gap-2">
                            {outstanding.map(item => {
                                const product = products.find(p => p.id === item.product_id);
                                if (!product) return null;
                                const alreadyInReturn = bulkItems.find(b => b.product_id === item.product_id);
                                return (
                                    <div key={item.product_id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', backgroundColor: '#ffffff', border: '1px solid #bfdbfe', borderRadius: '0.375rem' }}>
                                        <div>
                                            <span style={{ fontWeight: 600, color: '#1e293b' }}>{product.name}</span>
                                            <span style={{ color: '#64748b', marginLeft: '0.75rem', fontSize: '0.875rem' }}>Outstanding: <span style={{ fontWeight: 600, color: '#2563eb' }}>{item.outstanding}</span></span>
                                        </div>
                                        {!alreadyInReturn ? (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const productId = item.product_id;
                                                    const product = products.find(p => p.id === productId);
                                                    const existingIndex = bulkItems.findIndex(b => b.product_id === productId);
                                                    const existingQty = existingIndex >= 0 ? bulkItems[existingIndex].quantity : 0;
                                                    const requestedTotal = existingQty + 1;
                                                    const maxQty = item.outstanding;

                                                    if (requestedTotal > maxQty) {
                                                        setError(`Cannot return ${requestedTotal} units. You only have ${maxQty} unit(s) outstanding for ${product.name}.`);
                                                        return;
                                                    }

                                                    if (existingIndex >= 0) {
                                                        // Update quantity if already exists
                                                        const newBulkItems = [...bulkItems];
                                                        newBulkItems[existingIndex].quantity = requestedTotal;
                                                        setBulkItems(newBulkItems);
                                                    } else {
                                                        // Add new item with quantity 1
                                                        setBulkItems([
                                                            ...bulkItems,
                                                            { product_id: productId, product_name: product.name, product_image: product.image_url, quantity: 1 },
                                                        ]);
                                                    }
                                                    setError('');
                                                }}
                                                className="btn"
                                                style={{ backgroundColor: '#dbeafe', color: '#1e40af', border: 'none', fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
                                            >
                                                Quick Add
                                            </button>
                                        ) : (
                                            <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>✅ Added</span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {bulkItems.length > 0 && (
                    <div style={{ marginBottom: '1.5rem', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 'var(--radius)', padding: '1rem' }}>
                        <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '1rem', color: '#1e293b' }}>Items to {transactionType === 'CHECKOUT' ? 'Take' : 'Return'} ({bulkItems.length})</h3>
                        <div className="grid gap-2">
                            {bulkItems.map(item => (
                                <div key={item.product_id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.375rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        {item.product_image && (
                                            <img
                                                src={item.product_image}
                                                alt={item.product_name}
                                                style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    objectFit: 'cover',
                                                    borderRadius: '0.5rem',
                                                    cursor: 'pointer',
                                                    flexShrink: 0,
                                                }}
                                                onClick={() => setImagePreview(item.product_image)}
                                            />
                                        )}
                                        <div>
                                            <span style={{ fontWeight: 600, color: '#1e293b' }}>{item.quantity}x</span>
                                            <span style={{ color: '#475569', marginLeft: '0.5rem' }}>{item.product_name}</span>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeBulkItem(item.product_id)}
                                        className="btn"
                                        style={{
                                            backgroundColor: '#fee2e2',
                                            color: '#991b1b',
                                            border: 'none',
                                            fontSize: '0.75rem',
                                            padding: '0.35rem 0.75rem',
                                            width: 'auto',
                                            minWidth: 'auto'
                                        }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Image Preview Modal */}
                {imagePreview && (
                    <div
                        style={{
                            position: 'fixed',
                            inset: 0,
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1100,
                        }}
                        onClick={() => setImagePreview('')}
                    >
                        <div
                            style={{
                                backgroundColor: '#fff',
                                padding: '1rem',
                                borderRadius: '0.75rem',
                                maxWidth: '90vw',
                                maxHeight: '90vh',
                                boxShadow: 'var(--shadow-lg)',
                            }}
                            onClick={e => e.stopPropagation()}
                        >
                            <img
                                src={imagePreview}
                                alt="Product image"
                                style={{ maxWidth: '80vw', maxHeight: '80vh', objectFit: 'contain', display: 'block' }}
                            />
                        </div>
                    </div>
                )}

                <button type="submit" className="btn btn-primary" onClick={handleSubmit} disabled={bulkItems.length === 0} style={{ width: '100%', opacity: bulkItems.length === 0 ? 0.5 : 1, cursor: bulkItems.length === 0 ? 'not-allowed' : 'pointer' }}>
                    Complete {transactionType === 'CHECKOUT' ? 'Checkout' : 'Return'} ({bulkItems.length} items)
                </button>
            </div>
        </div>
    );
}
