'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function InventoryPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [formData, setFormData] = useState({ name: '', description: '', quantity: 0, image_url: '' });
    const [deleteConfirm, setDeleteConfirm] = useState({ show: false, productId: null, productName: '' });
    const [isDeleting, setIsDeleting] = useState(false);
    const [imagePreview, setImagePreview] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) router.push('/login');
        else {
            setUser(JSON.parse(storedUser));
            fetchProducts();
        }
    }, [router]);

    const fetchProducts = async () => {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
    };

    const isAdmin = user?.role === 'admin';

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.image_url && !isEditing) {
            alert('Please provide an image URL for this product');
            return;
        }

        const url = isEditing ? `/api/products/${currentProduct.id}` : '/api/products';
        const method = isEditing ? 'PUT' : 'POST';

        const payload = {
            name: formData.name,
            description: formData.description || '',
            quantity: formData.quantity || 0,
            user_id: user.id,
            image_url: formData.image_url,
        };

        const res = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (res.ok) {
            fetchProducts();
            setIsEditing(false);
            setCurrentProduct(null);
            setFormData({ name: '', description: '', quantity: 0, image_url: '' });
        } else {
            const error = await res.json();
            alert(error.error || 'Failed to save product');
        }
    };

    const handleEdit = (product) => {
        setIsEditing(true);
        setCurrentProduct(product);
        setFormData({ ...product });
    };

    const handleDeleteClick = (product) => {
        setDeleteConfirm({ show: true, productId: product.id, productName: product.name });
    };

    const confirmDelete = async () => {
        if (!deleteConfirm.productId) return;
        
        setIsDeleting(true);
        try {
            const res = await fetch(`/api/products/${deleteConfirm.productId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: user.id }),
            });

            if (res.ok) {
                fetchProducts();
                setDeleteConfirm({ show: false, productId: null, productName: '' });
            } else {
                const error = await res.json();
                alert(error.error || 'Failed to delete product');
            }
        } catch (err) {
            alert('Error: ' + err.message);
        } finally {
            setIsDeleting(false);
        }
    };

    const cancelDelete = () => {
        setDeleteConfirm({ show: false, productId: null, productName: '' });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="section-title">Inventory Management</h1>
                <div className="badge badge-primary">
                    {isAdmin ? 'Admin' : 'Member'}
                </div>
            </div>

            {isAdmin && (
                <div className="card mb-6">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: showForm ? '1rem' : 0 }}>
                        <h2 className="text-lg font-semibold">{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
                        <button
                            type="button"
                            onClick={() => setShowForm(prev => !prev)}
                            style={{
                                background: 'none',
                                border: '1px solid #e5e7eb',
                                borderRadius: '999px',
                                padding: '0.25rem 0.75rem',
                                fontSize: '0.8rem',
                                cursor: 'pointer',
                                color: '#4b5563'
                            }}
                        >
                            {showForm ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    {showForm && (
                    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.875rem', fontWeight: 500 }}>Product Name</label>
                            <input
                                className="input"
                                placeholder="Product Name"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.875rem', fontWeight: 500 }}>Description</label>
                            <input
                                className="input"
                                placeholder="Description"
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.875rem', fontWeight: 500 }}>Quantity</label>
                            <input
                                type="number"
                                className="input"
                                placeholder="Quantity"
                                value={formData.quantity}
                                onChange={e => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.875rem', fontWeight: 500 }}>Image URL</label>
                            <input
                                className="input"
                                placeholder="https://example.com/image.jpg"
                                value={formData.image_url}
                                onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                                required={!isEditing}
                            />
                        </div>
                        <div className="flex gap-2" style={{ gridColumn: '1 / -1' }}>
                            <button type="submit" className="btn btn-primary">{isEditing ? 'Update' : 'Add'} Product</button>
                            {isEditing && (
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => { setIsEditing(false); setCurrentProduct(null); setFormData({ name: '', description: '', quantity: 0, image_url: '' }); }}
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                    )}
                </div>
            )}

            {products.length === 0 ? (
                <div>
                    <h2 className="text-lg font-semibold mb-2">Product List</h2>
                    <div className="card" style={{ textAlign: 'center' }}>
                        <p className="text-sm text-secondary">No products are available at the moment.</p>
                    </div>
                </div>
            ) : (
                <div className="grid gap-4">
                    {products.map(product => (
                        <div key={product.id} className="card">
                            <div className="flex justify-between items-center">
                            <div className="flex-1" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                {product.image_url && (
                                    <img
                                        src={product.image_url}
                                        alt={product.name}
                                        style={{
                                            width: '56px',
                                            height: '56px',
                                            objectFit: 'cover',
                                            borderRadius: '0.5rem',
                                            cursor: 'pointer',
                                            flexShrink: 0,
                                        }}
                                        onClick={() => setImagePreview(product.image_url)}
                                    />
                                )}
                                <div>
                                    <h3 className="font-bold text-lg">{product.name}</h3>
                                    <p className="text-sm text-secondary">{product.description}</p>
                                    <p className="text-sm mt-2">
                                        Quantity: <span className="font-bold text-primary">{product.quantity}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                {isAdmin && (
                                    <>
                                        <button onClick={() => handleEdit(product)} className="btn btn-secondary">Edit</button>
                                        <button onClick={() => handleDeleteClick(product)} className="btn btn-danger" disabled={isDeleting}>Delete</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            )}

            {/* Image Preview Modal */}
            {imagePreview && (
                <div style={{
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

            {/* Delete Confirmation Dialog */}
            {deleteConfirm.show && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        padding: '30px',
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                        maxWidth: '400px',
                        width: '90%',
                        textAlign: 'center',
                    }}>
                        <h2 style={{ marginBottom: '20px', color: '#1f2937', fontSize: '18px' }}>
                            Are you sure you want to delete this product?
                        </h2>
                        <p style={{ marginBottom: '25px', color: '#6b7280', fontSize: '14px' }}>
                            <strong>{deleteConfirm.productName}</strong> will be permanently removed.
                        </p>
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                            <button
                                onClick={confirmDelete}
                                disabled={isDeleting}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#dc2626',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: isDeleting ? 'not-allowed' : 'pointer',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    opacity: isDeleting ? 0.6 : 1,
                                }}
                            >
                                {isDeleting ? 'Deleting...' : 'Delete'}
                            </button>
                            <button
                                onClick={cancelDelete}
                                disabled={isDeleting}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#6b7280',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: isDeleting ? 'not-allowed' : 'pointer',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    opacity: isDeleting ? 0.6 : 1,
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
