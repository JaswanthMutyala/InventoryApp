module.exports = [
"[project]/app/transactions/page.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TransactionsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
'use client';
;
;
;
function TransactionsPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [transactions, setTransactions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [products, setProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [outstanding, setOutstanding] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [transactionType, setTransactionType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('CHECKOUT');
    const [bulkItems, setBulkItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentProduct, setCurrentProduct] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [currentQuantity, setCurrentQuantity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [imagePreview, setImagePreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            router.push('/login');
        } else {
            setUser(JSON.parse(storedUser));
            fetchData();
        }
    }, [
        router
    ]);
    const fetchData = async ()=>{
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
    const getMaxReturnQuantity = (productId)=>{
        const outstandingItem = outstanding.find((item)=>item.product_id === parseInt(productId));
        return outstandingItem?.outstanding || 0;
    };
    const addBulkItem = ()=>{
        if (!currentProduct) {
            setError('Please select a product');
            return;
        }
        const productId = parseInt(currentProduct);
        const product = products.find((p)=>p.id === productId);
        if (!product) {
            setError('Selected product is invalid');
            return;
        }
        // Check if product already in bulk items
        const existingIndex = bulkItems.findIndex((item)=>item.product_id === productId);
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
            const newBulkItems = [
                ...bulkItems
            ];
            newBulkItems[existingIndex].quantity = requestedTotal;
            setBulkItems(newBulkItems);
        } else {
            // Add new item
            setBulkItems([
                ...bulkItems,
                {
                    product_id: productId,
                    product_name: product.name,
                    product_image: product.image_url,
                    quantity: currentQuantity
                }
            ]);
        }
        setCurrentProduct('');
        setCurrentQuantity(1);
        setError('');
    };
    const removeBulkItem = (productId)=>{
        setBulkItems(bulkItems.filter((item)=>item.product_id !== productId));
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setError('');
        setSuccess('');
        if (bulkItems.length === 0) {
            setError('Please add at least one item');
            return;
        }
        try {
            // Submit all items in bulk
            const promises = bulkItems.map((item)=>fetch('/api/transactions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user_id: user.id,
                        product_id: item.product_id,
                        quantity: item.quantity,
                        type: transactionType
                    })
                }));
            const results = await Promise.all(promises);
            // Check if all succeeded
            const allSuccess = results.every((res)=>res.ok);
            if (allSuccess) {
                setSuccess(`Successfully ${transactionType === 'CHECKOUT' ? 'took' : 'returned'} ${bulkItems.length} product(s)!`);
                setBulkItems([]);
                fetchData();
                setTimeout(()=>setSuccess(''), 1500);
            } else {
                setError('Some transactions failed. Please try again.');
            }
        } catch (err) {
            setError(err.message || 'Transaction failed');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "section-title",
                children: "Transactions"
            }, void 0, false, {
                fileName: "[project]/app/transactions/page.js",
                lineNumber: 152,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-lg font-semibold mb-4",
                        children: "New Transaction"
                    }, void 0, false, {
                        fileName: "[project]/app/transactions/page.js",
                        lineNumber: 155,
                        columnNumber: 17
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            backgroundColor: '#fee2e2',
                            border: '2px solid #ef4444',
                            borderRadius: 'var(--radius)',
                            padding: '1rem',
                            marginBottom: '1.5rem',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.75rem'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        color: '#991b1b',
                                        fontWeight: 600,
                                        marginBottom: '0.25rem'
                                    },
                                    children: "Transaction Failed"
                                }, void 0, false, {
                                    fileName: "[project]/app/transactions/page.js",
                                    lineNumber: 169,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        color: '#dc2626',
                                        fontSize: '0.875rem',
                                        lineHeight: 1.5
                                    },
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/app/transactions/page.js",
                                    lineNumber: 176,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/transactions/page.js",
                            lineNumber: 168,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/transactions/page.js",
                        lineNumber: 157,
                        columnNumber: 21
                    }, this),
                    success && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            backgroundColor: '#dcfce7',
                            border: '2px solid #22c55e',
                            borderRadius: 'var(--radius)',
                            padding: '1rem',
                            marginBottom: '1.5rem',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.75rem'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: '1.25rem',
                                    lineHeight: 1
                                },
                                children: "✅"
                            }, void 0, false, {
                                fileName: "[project]/app/transactions/page.js",
                                lineNumber: 198,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    color: '#15803d',
                                    fontWeight: 600,
                                    fontSize: '0.95rem'
                                },
                                children: success
                            }, void 0, false, {
                                fileName: "[project]/app/transactions/page.js",
                                lineNumber: 199,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/transactions/page.js",
                        lineNumber: 188,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: '1.5rem'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                style: {
                                    fontSize: '0.95rem',
                                    fontWeight: 600,
                                    marginBottom: '1rem',
                                    color: '#1e293b'
                                },
                                children: "Transaction Type"
                            }, void 0, false, {
                                fileName: "[project]/app/transactions/page.js",
                                lineNumber: 209,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: '1rem',
                                    marginBottom: '1.5rem'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            cursor: 'pointer'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "radio",
                                                value: "CHECKOUT",
                                                checked: transactionType === 'CHECKOUT',
                                                onChange: (e)=>setTransactionType(e.target.value),
                                                style: {
                                                    cursor: 'pointer'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/transactions/page.js",
                                                lineNumber: 212,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Take Products"
                                            }, void 0, false, {
                                                fileName: "[project]/app/transactions/page.js",
                                                lineNumber: 219,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/transactions/page.js",
                                        lineNumber: 211,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            cursor: 'pointer'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "radio",
                                                value: "CHECKIN",
                                                checked: transactionType === 'CHECKIN',
                                                onChange: (e)=>setTransactionType(e.target.value),
                                                style: {
                                                    cursor: 'pointer'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/transactions/page.js",
                                                lineNumber: 222,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Return Products"
                                            }, void 0, false, {
                                                fileName: "[project]/app/transactions/page.js",
                                                lineNumber: 229,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/transactions/page.js",
                                        lineNumber: 221,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/transactions/page.js",
                                lineNumber: 210,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/transactions/page.js",
                        lineNumber: 208,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr 100px',
                            gap: '0.75rem',
                            marginBottom: '1rem',
                            alignItems: 'flex-end'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "form-group",
                                style: {
                                    marginBottom: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "product",
                                        style: {
                                            display: 'block',
                                            marginBottom: '0.35rem',
                                            fontSize: '0.875rem',
                                            fontWeight: 500
                                        },
                                        children: "Product"
                                    }, void 0, false, {
                                        fileName: "[project]/app/transactions/page.js",
                                        lineNumber: 236,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        id: "product",
                                        className: "input",
                                        value: currentProduct,
                                        onChange: (e)=>setCurrentProduct(e.target.value),
                                        style: {
                                            fontSize: '0.875rem',
                                            padding: '0.5rem 0.75rem',
                                            width: '100%'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "Select..."
                                            }, void 0, false, {
                                                fileName: "[project]/app/transactions/page.js",
                                                lineNumber: 244,
                                                columnNumber: 29
                                            }, this),
                                            transactionType === 'CHECKOUT' ? products.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: String(p.id),
                                                    children: [
                                                        p.name,
                                                        " (Available: ",
                                                        p.quantity,
                                                        ")"
                                                    ]
                                                }, p.id, true, {
                                                    fileName: "[project]/app/transactions/page.js",
                                                    lineNumber: 247,
                                                    columnNumber: 37
                                                }, this)) : outstanding && outstanding.length > 0 ? outstanding.map((o)=>{
                                                const product = products.find((p)=>p.id === o.product_id);
                                                if (!product) return null;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: String(o.product_id),
                                                    children: [
                                                        product.name,
                                                        " (Outstanding: ",
                                                        o.outstanding,
                                                        ")"
                                                    ]
                                                }, o.product_id, true, {
                                                    fileName: "[project]/app/transactions/page.js",
                                                    lineNumber: 256,
                                                    columnNumber: 45
                                                }, this);
                                            }) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                disabled: true,
                                                children: "No items to return"
                                            }, void 0, false, {
                                                fileName: "[project]/app/transactions/page.js",
                                                lineNumber: 261,
                                                columnNumber: 39
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/transactions/page.js",
                                        lineNumber: 237,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/transactions/page.js",
                                lineNumber: 235,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "form-group",
                                style: {
                                    marginBottom: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "quantity",
                                        style: {
                                            display: 'block',
                                            marginBottom: '0.35rem',
                                            fontSize: '0.875rem',
                                            fontWeight: 500
                                        },
                                        children: [
                                            "Quantity",
                                            transactionType === 'CHECKIN' && currentProduct && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: '0.75rem',
                                                    color: '#64748b',
                                                    marginLeft: '0.5rem'
                                                },
                                                children: [
                                                    "(Max: ",
                                                    getMaxReturnQuantity(currentProduct),
                                                    ")"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/transactions/page.js",
                                                lineNumber: 270,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/transactions/page.js",
                                        lineNumber: 267,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "quantity",
                                        type: "number",
                                        className: "input",
                                        min: "1",
                                        max: transactionType === 'CHECKIN' && currentProduct ? getMaxReturnQuantity(currentProduct) : undefined,
                                        value: currentQuantity,
                                        onChange: (e)=>setCurrentQuantity(Math.max(1, parseInt(e.target.value) || 1)),
                                        style: {
                                            fontSize: '0.875rem',
                                            padding: '0.5rem 0.75rem',
                                            width: '100%'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/transactions/page.js",
                                        lineNumber: 273,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/transactions/page.js",
                                lineNumber: 266,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: addBulkItem,
                                className: "btn btn-primary",
                                style: {
                                    padding: '0.5rem 1rem',
                                    fontSize: '0.875rem'
                                },
                                children: "Add Item"
                            }, void 0, false, {
                                fileName: "[project]/app/transactions/page.js",
                                lineNumber: 285,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/transactions/page.js",
                        lineNumber: 234,
                        columnNumber: 17
                    }, this),
                    transactionType === 'CHECKIN' && outstanding && outstanding.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: '1.5rem',
                            backgroundColor: '#eff6ff',
                            border: '1px solid #93c5fd',
                            borderRadius: 'var(--radius)',
                            padding: '1rem'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                style: {
                                    fontSize: '0.95rem',
                                    fontWeight: 600,
                                    marginBottom: '0.75rem',
                                    color: '#1e40af'
                                },
                                children: "📋 Products You Previously Took"
                            }, void 0, false, {
                                fileName: "[project]/app/transactions/page.js",
                                lineNumber: 297,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid gap-2",
                                children: outstanding.map((item)=>{
                                    const product = products.find((p)=>p.id === item.product_id);
                                    if (!product) return null;
                                    const alreadyInReturn = bulkItems.find((b)=>b.product_id === item.product_id);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '0.75rem',
                                            backgroundColor: '#ffffff',
                                            border: '1px solid #bfdbfe',
                                            borderRadius: '0.375rem'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontWeight: 600,
                                                            color: '#1e293b'
                                                        },
                                                        children: product.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/transactions/page.js",
                                                        lineNumber: 306,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            color: '#64748b',
                                                            marginLeft: '0.75rem',
                                                            fontSize: '0.875rem'
                                                        },
                                                        children: [
                                                            "Outstanding: ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontWeight: 600,
                                                                    color: '#2563eb'
                                                                },
                                                                children: item.outstanding
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/transactions/page.js",
                                                                lineNumber: 307,
                                                                columnNumber: 138
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/transactions/page.js",
                                                        lineNumber: 307,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/transactions/page.js",
                                                lineNumber: 305,
                                                columnNumber: 41
                                            }, this),
                                            !alreadyInReturn ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>{
                                                    const productId = item.product_id;
                                                    const product = products.find((p)=>p.id === productId);
                                                    const existingIndex = bulkItems.findIndex((b)=>b.product_id === productId);
                                                    const existingQty = existingIndex >= 0 ? bulkItems[existingIndex].quantity : 0;
                                                    const requestedTotal = existingQty + 1;
                                                    const maxQty = item.outstanding;
                                                    if (requestedTotal > maxQty) {
                                                        setError(`Cannot return ${requestedTotal} units. You only have ${maxQty} unit(s) outstanding for ${product.name}.`);
                                                        return;
                                                    }
                                                    if (existingIndex >= 0) {
                                                        // Update quantity if already exists
                                                        const newBulkItems = [
                                                            ...bulkItems
                                                        ];
                                                        newBulkItems[existingIndex].quantity = requestedTotal;
                                                        setBulkItems(newBulkItems);
                                                    } else {
                                                        // Add new item with quantity 1
                                                        setBulkItems([
                                                            ...bulkItems,
                                                            {
                                                                product_id: productId,
                                                                product_name: product.name,
                                                                product_image: product.image_url,
                                                                quantity: 1
                                                            }
                                                        ]);
                                                    }
                                                    setError('');
                                                },
                                                className: "btn",
                                                style: {
                                                    backgroundColor: '#dbeafe',
                                                    color: '#1e40af',
                                                    border: 'none',
                                                    fontSize: '0.75rem',
                                                    padding: '0.35rem 0.75rem'
                                                },
                                                children: "Quick Add"
                                            }, void 0, false, {
                                                fileName: "[project]/app/transactions/page.js",
                                                lineNumber: 310,
                                                columnNumber: 45
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: '0.75rem',
                                                    color: '#059669',
                                                    fontWeight: 600
                                                },
                                                children: "✅ Added"
                                            }, void 0, false, {
                                                fileName: "[project]/app/transactions/page.js",
                                                lineNumber: 345,
                                                columnNumber: 45
                                            }, this)
                                        ]
                                    }, item.product_id, true, {
                                        fileName: "[project]/app/transactions/page.js",
                                        lineNumber: 304,
                                        columnNumber: 37
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/app/transactions/page.js",
                                lineNumber: 298,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/transactions/page.js",
                        lineNumber: 296,
                        columnNumber: 21
                    }, this),
                    bulkItems.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: '1.5rem',
                            backgroundColor: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            borderRadius: 'var(--radius)',
                            padding: '1rem'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                style: {
                                    fontSize: '0.95rem',
                                    fontWeight: 600,
                                    marginBottom: '1rem',
                                    color: '#1e293b'
                                },
                                children: [
                                    "Items to ",
                                    transactionType === 'CHECKOUT' ? 'Take' : 'Return',
                                    " (",
                                    bulkItems.length,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/transactions/page.js",
                                lineNumber: 356,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid gap-2",
                                children: bulkItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '0.75rem',
                                            backgroundColor: '#ffffff',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '0.375rem'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.75rem'
                                                },
                                                children: [
                                                    item.product_image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: item.product_image,
                                                        alt: item.product_name,
                                                        style: {
                                                            width: '40px',
                                                            height: '40px',
                                                            objectFit: 'cover',
                                                            borderRadius: '0.5rem',
                                                            cursor: 'pointer',
                                                            flexShrink: 0
                                                        },
                                                        onClick: ()=>setImagePreview(item.product_image)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/transactions/page.js",
                                                        lineNumber: 362,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontWeight: 600,
                                                                    color: '#1e293b'
                                                                },
                                                                children: [
                                                                    item.quantity,
                                                                    "x"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/transactions/page.js",
                                                                lineNumber: 377,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    color: '#475569',
                                                                    marginLeft: '0.5rem'
                                                                },
                                                                children: item.product_name
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/transactions/page.js",
                                                                lineNumber: 378,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/transactions/page.js",
                                                        lineNumber: 376,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/transactions/page.js",
                                                lineNumber: 360,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>removeBulkItem(item.product_id),
                                                className: "btn",
                                                style: {
                                                    backgroundColor: '#fee2e2',
                                                    color: '#991b1b',
                                                    border: 'none',
                                                    fontSize: '0.75rem',
                                                    padding: '0.35rem 0.75rem',
                                                    width: 'auto',
                                                    minWidth: 'auto'
                                                },
                                                children: "Remove"
                                            }, void 0, false, {
                                                fileName: "[project]/app/transactions/page.js",
                                                lineNumber: 381,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, item.product_id, true, {
                                        fileName: "[project]/app/transactions/page.js",
                                        lineNumber: 359,
                                        columnNumber: 33
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/transactions/page.js",
                                lineNumber: 357,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/transactions/page.js",
                        lineNumber: 355,
                        columnNumber: 21
                    }, this),
                    imagePreview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'fixed',
                            inset: 0,
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1100
                        },
                        onClick: ()=>setImagePreview(''),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                backgroundColor: '#fff',
                                padding: '1rem',
                                borderRadius: '0.75rem',
                                maxWidth: '90vw',
                                maxHeight: '90vh',
                                boxShadow: 'var(--shadow-lg)'
                            },
                            onClick: (e)=>e.stopPropagation(),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: imagePreview,
                                alt: "Product image",
                                style: {
                                    maxWidth: '80vw',
                                    maxHeight: '80vh',
                                    objectFit: 'contain',
                                    display: 'block'
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/transactions/page.js",
                                lineNumber: 428,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/transactions/page.js",
                            lineNumber: 417,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/transactions/page.js",
                        lineNumber: 405,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        className: "btn btn-primary",
                        onClick: handleSubmit,
                        disabled: bulkItems.length === 0,
                        style: {
                            width: '100%',
                            opacity: bulkItems.length === 0 ? 0.5 : 1,
                            cursor: bulkItems.length === 0 ? 'not-allowed' : 'pointer'
                        },
                        children: [
                            "Complete ",
                            transactionType === 'CHECKOUT' ? 'Checkout' : 'Return',
                            " (",
                            bulkItems.length,
                            " items)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/transactions/page.js",
                        lineNumber: 437,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/transactions/page.js",
                lineNumber: 154,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/transactions/page.js",
        lineNumber: 151,
        columnNumber: 9
    }, this);
}
}),
];

//# sourceMappingURL=app_transactions_page_6debc816.js.map