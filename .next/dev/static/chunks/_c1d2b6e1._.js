(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/members/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MembersPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function MembersPage() {
    _s();
    const [users, setUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isAdmin, setIsAdmin] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [deletePassword, setDeletePassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [showDeleteModal, setShowDeleteModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [userToDelete, setUserToDelete] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [deleting, setDeleting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showAddModal, setShowAddModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [addFormData, setAddFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: '',
        student_id: '',
        password: ''
    });
    const [addingMember, setAddingMember] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MembersPage.useEffect": ()=>{
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            if (user.role !== 'admin') {
                router.push('/');
                return;
            }
            setIsAdmin(true);
            fetchUsers();
        }
    }["MembersPage.useEffect"], []);
    const fetchUsers = async ()=>{
        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const res = await fetch('/api/users', {
                headers: {
                    'Authorization': `Bearer ${user.id}`
                }
            });
            if (res.ok) {
                const data = await res.json();
                setUsers(data);
            } else {
                setError('Failed to fetch users');
            }
        } catch (err) {
            setError('Error fetching users');
        } finally{
            setLoading(false);
        }
    };
    const handleDeleteClick = (user)=>{
        setUserToDelete(user);
        setShowDeleteModal(true);
        setDeletePassword('');
    };
    const handleDeleteConfirm = async ()=>{
        if (!deletePassword) {
            setError('Please enter admin password');
            return;
        }
        setDeleting(true);
        setError('');
        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const res = await fetch('/api/users', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.id}`
                },
                body: JSON.stringify({
                    userId: userToDelete.id,
                    password: deletePassword
                })
            });
            if (res.ok) {
                setUsers(users.filter((u)=>u.id !== userToDelete.id));
                setShowDeleteModal(false);
                setUserToDelete(null);
                setDeletePassword('');
            } else {
                const data = await res.json();
                setError(data.error || 'Failed to delete user');
            }
        } catch (err) {
            setError('Error deleting user');
        } finally{
            setDeleting(false);
        }
    };
    const handleAddMember = async ()=>{
        if (!addFormData.name || !addFormData.student_id || !addFormData.password) {
            setError('Please fill in all fields');
            return;
        }
        setAddingMember(true);
        setError('');
        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const res = await fetch('/api/users/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.id}`
                },
                body: JSON.stringify({
                    name: addFormData.name,
                    student_id: addFormData.student_id,
                    password: addFormData.password
                })
            });
            if (res.ok) {
                const newUser = await res.json();
                setUsers([
                    ...users,
                    newUser
                ]);
                setShowAddModal(false);
                setAddFormData({
                    name: '',
                    student_id: '',
                    password: ''
                });
            } else {
                const data = await res.json();
                setError(data.error || 'Failed to add member');
            }
        } catch (err) {
            setError('Error adding member');
        } finally{
            setAddingMember(false);
        }
    };
    const adminCount = users.filter((u)=>u.role === 'admin').length;
    const memberCount = users.filter((u)=>u.role === 'member').length;
    if (!isAdmin) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "container",
        style: {
            padding: '2rem 1rem',
            maxWidth: '1200px'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: '2rem'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        style: {
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            marginBottom: '1rem'
                        },
                        children: "Members Management"
                    }, void 0, false, {
                        fileName: "[project]/app/members/page.js",
                        lineNumber: 151,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '1rem',
                            marginBottom: '2rem'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    backgroundColor: '#dbeafe',
                                    border: '2px solid #3b82f6',
                                    borderRadius: 'var(--radius)',
                                    padding: '1.5rem',
                                    textAlign: 'center'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: '2rem',
                                            fontWeight: 'bold',
                                            color: '#3b82f6'
                                        },
                                        children: adminCount
                                    }, void 0, false, {
                                        fileName: "[project]/app/members/page.js",
                                        lineNumber: 167,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            color: '#666',
                                            fontSize: '0.875rem',
                                            marginTop: '0.5rem'
                                        },
                                        children: "Admin Users"
                                    }, void 0, false, {
                                        fileName: "[project]/app/members/page.js",
                                        lineNumber: 170,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/members/page.js",
                                lineNumber: 160,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    backgroundColor: '#dcfce7',
                                    border: '2px solid #22c55e',
                                    borderRadius: 'var(--radius)',
                                    padding: '1.5rem',
                                    textAlign: 'center'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: '2rem',
                                            fontWeight: 'bold',
                                            color: '#22c55e'
                                        },
                                        children: memberCount
                                    }, void 0, false, {
                                        fileName: "[project]/app/members/page.js",
                                        lineNumber: 181,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            color: '#666',
                                            fontSize: '0.875rem',
                                            marginTop: '0.5rem'
                                        },
                                        children: "Member Users"
                                    }, void 0, false, {
                                        fileName: "[project]/app/members/page.js",
                                        lineNumber: 184,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/members/page.js",
                                lineNumber: 174,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    backgroundColor: '#f3e8ff',
                                    border: '2px solid #a855f7',
                                    borderRadius: 'var(--radius)',
                                    padding: '1.5rem',
                                    textAlign: 'center'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: '2rem',
                                            fontWeight: 'bold',
                                            color: '#a855f7'
                                        },
                                        children: users.length
                                    }, void 0, false, {
                                        fileName: "[project]/app/members/page.js",
                                        lineNumber: 195,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            color: '#666',
                                            fontSize: '0.875rem',
                                            marginTop: '0.5rem'
                                        },
                                        children: "Total Users"
                                    }, void 0, false, {
                                        fileName: "[project]/app/members/page.js",
                                        lineNumber: 198,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/members/page.js",
                                lineNumber: 188,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/members/page.js",
                        lineNumber: 154,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/members/page.js",
                lineNumber: 150,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: '2rem',
                    textAlign: 'center'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>setShowAddModal(true),
                    style: {
                        backgroundColor: '#22c55e',
                        color: '#fff',
                        border: 'none',
                        padding: '0.75rem 2rem',
                        borderRadius: 'var(--radius)',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: '600',
                        transition: 'background-color 0.2s'
                    },
                    onMouseOver: (e)=>e.target.style.backgroundColor = '#16a34a',
                    onMouseOut: (e)=>e.target.style.backgroundColor = '#22c55e',
                    children: "Add New Member"
                }, void 0, false, {
                    fileName: "[project]/app/members/page.js",
                    lineNumber: 207,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/members/page.js",
                lineNumber: 206,
                columnNumber: 13
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    backgroundColor: '#fee2e2',
                    border: '1px solid #fca5a5',
                    color: '#dc2626',
                    padding: '1rem',
                    borderRadius: 'var(--radius)',
                    marginBottom: '1rem'
                },
                children: error
            }, void 0, false, {
                fileName: "[project]/app/members/page.js",
                lineNumber: 228,
                columnNumber: 17
            }, this),
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    textAlign: 'center',
                    padding: '2rem'
                },
                children: "Loading..."
            }, void 0, false, {
                fileName: "[project]/app/members/page.js",
                lineNumber: 241,
                columnNumber: 17
            }, this) : users.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    textAlign: 'center',
                    padding: '2rem',
                    color: '#666'
                },
                children: "No users found"
            }, void 0, false, {
                fileName: "[project]/app/members/page.js",
                lineNumber: 243,
                columnNumber: 17
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    overflowX: 'auto'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    style: {
                        width: '100%',
                        borderCollapse: 'collapse',
                        backgroundColor: '#fff',
                        borderRadius: 'var(--radius)',
                        overflow: 'hidden',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                style: {
                                    backgroundColor: '#f3f4f6',
                                    borderBottom: '2px solid #e5e7eb'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: {
                                            padding: '1rem',
                                            textAlign: 'left',
                                            fontWeight: '600'
                                        },
                                        children: "Name"
                                    }, void 0, false, {
                                        fileName: "[project]/app/members/page.js",
                                        lineNumber: 258,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: {
                                            padding: '1rem',
                                            textAlign: 'left',
                                            fontWeight: '600'
                                        },
                                        children: "Roll Number"
                                    }, void 0, false, {
                                        fileName: "[project]/app/members/page.js",
                                        lineNumber: 259,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: {
                                            padding: '1rem',
                                            textAlign: 'left',
                                            fontWeight: '600'
                                        },
                                        children: "Role"
                                    }, void 0, false, {
                                        fileName: "[project]/app/members/page.js",
                                        lineNumber: 260,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: {
                                            padding: '1rem',
                                            textAlign: 'left',
                                            fontWeight: '600'
                                        },
                                        children: "Joined Date"
                                    }, void 0, false, {
                                        fileName: "[project]/app/members/page.js",
                                        lineNumber: 261,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: {
                                            padding: '1rem',
                                            textAlign: 'center',
                                            fontWeight: '600'
                                        },
                                        children: "Actions"
                                    }, void 0, false, {
                                        fileName: "[project]/app/members/page.js",
                                        lineNumber: 262,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/members/page.js",
                                lineNumber: 257,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/members/page.js",
                            lineNumber: 256,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: users.map((user)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    style: {
                                        borderBottom: '1px solid #e5e7eb'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                padding: '1rem'
                                            },
                                            children: user.name
                                        }, void 0, false, {
                                            fileName: "[project]/app/members/page.js",
                                            lineNumber: 268,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                padding: '1rem'
                                            },
                                            children: user.student_id
                                        }, void 0, false, {
                                            fileName: "[project]/app/members/page.js",
                                            lineNumber: 269,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                padding: '1rem'
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    display: 'inline-block',
                                                    padding: '0.25rem 0.75rem',
                                                    borderRadius: '999px',
                                                    fontSize: '0.875rem',
                                                    fontWeight: '600',
                                                    backgroundColor: user.role === 'admin' ? '#fef3c7' : '#dbeafe',
                                                    color: user.role === 'admin' ? '#b45309' : '#1e40af'
                                                },
                                                children: user.role === 'admin' ? 'Admin' : 'Member'
                                            }, void 0, false, {
                                                fileName: "[project]/app/members/page.js",
                                                lineNumber: 271,
                                                columnNumber: 41
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/members/page.js",
                                            lineNumber: 270,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                padding: '1rem',
                                                fontSize: '0.875rem'
                                            },
                                            children: new Date(user.created_at).toLocaleDateString('en-IN')
                                        }, void 0, false, {
                                            fileName: "[project]/app/members/page.js",
                                            lineNumber: 283,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                padding: '1rem',
                                                textAlign: 'center'
                                            },
                                            children: [
                                                user.role === 'member' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleDeleteClick(user),
                                                    style: {
                                                        backgroundColor: '#ef4444',
                                                        color: '#fff',
                                                        border: 'none',
                                                        padding: '0.5rem 1rem',
                                                        borderRadius: 'var(--radius)',
                                                        cursor: 'pointer',
                                                        fontSize: '0.875rem',
                                                        fontWeight: '500',
                                                        transition: 'background-color 0.2s'
                                                    },
                                                    onMouseOver: (e)=>e.target.style.backgroundColor = '#dc2626',
                                                    onMouseOut: (e)=>e.target.style.backgroundColor = '#ef4444',
                                                    children: "🗑️ Remove"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/members/page.js",
                                                    lineNumber: 288,
                                                    columnNumber: 45
                                                }, this),
                                                user.role === 'admin' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: '#999',
                                                        fontSize: '0.875rem'
                                                    },
                                                    children: "Cannot delete admin"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/members/page.js",
                                                    lineNumber: 308,
                                                    columnNumber: 45
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/members/page.js",
                                            lineNumber: 286,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, user.id, true, {
                                    fileName: "[project]/app/members/page.js",
                                    lineNumber: 267,
                                    columnNumber: 33
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/members/page.js",
                            lineNumber: 265,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/members/page.js",
                    lineNumber: 248,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/members/page.js",
                lineNumber: 247,
                columnNumber: 17
            }, this),
            showDeleteModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        backgroundColor: '#fff',
                        borderRadius: 'var(--radius)',
                        padding: '2rem',
                        maxWidth: '400px',
                        width: '90%',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            style: {
                                marginBottom: '1rem',
                                color: '#1f2937'
                            },
                            children: "Remove Member"
                        }, void 0, false, {
                            fileName: "[project]/app/members/page.js",
                            lineNumber: 342,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                color: '#666',
                                marginBottom: '1.5rem'
                            },
                            children: [
                                "Are you sure you want to remove ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: userToDelete?.name
                                }, void 0, false, {
                                    fileName: "[project]/app/members/page.js",
                                    lineNumber: 346,
                                    columnNumber: 61
                                }, this),
                                "? This action cannot be undone."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/members/page.js",
                            lineNumber: 345,
                            columnNumber: 25
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                backgroundColor: '#fee2e2',
                                border: '1px solid #fca5a5',
                                color: '#dc2626',
                                padding: '0.75rem 1rem',
                                borderRadius: 'var(--radius)',
                                marginBottom: '1rem',
                                fontSize: '0.875rem'
                            },
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/app/members/page.js",
                            lineNumber: 350,
                            columnNumber: 29
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginBottom: '1.5rem'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    style: {
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontWeight: '500'
                                    },
                                    children: "Admin Password:"
                                }, void 0, false, {
                                    fileName: "[project]/app/members/page.js",
                                    lineNumber: 364,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "password",
                                    value: deletePassword,
                                    onChange: (e)=>setDeletePassword(e.target.value),
                                    placeholder: "Enter admin password",
                                    disabled: deleting,
                                    style: {
                                        width: '100%',
                                        padding: '0.75rem',
                                        border: '1px solid #d1d5db',
                                        borderRadius: 'var(--radius)',
                                        fontSize: '1rem',
                                        boxSizing: 'border-box'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/members/page.js",
                                    lineNumber: 367,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/members/page.js",
                            lineNumber: 363,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                gap: '1rem',
                                justifyContent: 'flex-end'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowDeleteModal(false),
                                    disabled: deleting,
                                    style: {
                                        backgroundColor: '#e5e7eb',
                                        color: '#1f2937',
                                        border: 'none',
                                        padding: '0.75rem 1.5rem',
                                        borderRadius: 'var(--radius)',
                                        cursor: deleting ? 'not-allowed' : 'pointer',
                                        fontWeight: '500',
                                        opacity: deleting ? 0.6 : 1
                                    },
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/app/members/page.js",
                                    lineNumber: 385,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleDeleteConfirm,
                                    disabled: deleting,
                                    style: {
                                        backgroundColor: '#ef4444',
                                        color: '#fff',
                                        border: 'none',
                                        padding: '0.75rem 1.5rem',
                                        borderRadius: 'var(--radius)',
                                        cursor: deleting ? 'not-allowed' : 'pointer',
                                        fontWeight: '500',
                                        opacity: deleting ? 0.6 : 1
                                    },
                                    children: deleting ? 'Removing...' : 'Remove Member'
                                }, void 0, false, {
                                    fileName: "[project]/app/members/page.js",
                                    lineNumber: 401,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/members/page.js",
                            lineNumber: 384,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/members/page.js",
                    lineNumber: 334,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/members/page.js",
                lineNumber: 322,
                columnNumber: 17
            }, this),
            showAddModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        backgroundColor: '#fff',
                        borderRadius: 'var(--radius)',
                        padding: '2rem',
                        maxWidth: '400px',
                        width: '90%',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            style: {
                                marginBottom: '1rem',
                                color: '#1f2937'
                            },
                            children: "Add New Member"
                        }, void 0, false, {
                            fileName: "[project]/app/members/page.js",
                            lineNumber: 444,
                            columnNumber: 25
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                backgroundColor: '#fee2e2',
                                border: '1px solid #fca5a5',
                                color: '#dc2626',
                                padding: '0.75rem 1rem',
                                borderRadius: 'var(--radius)',
                                marginBottom: '1rem',
                                fontSize: '0.875rem'
                            },
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/app/members/page.js",
                            lineNumber: 450,
                            columnNumber: 29
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'grid',
                                gap: '1rem'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: {
                                                display: 'block',
                                                marginBottom: '0.5rem',
                                                fontWeight: '500'
                                            },
                                            children: "Name:"
                                        }, void 0, false, {
                                            fileName: "[project]/app/members/page.js",
                                            lineNumber: 465,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: addFormData.name,
                                            onChange: (e)=>setAddFormData({
                                                    ...addFormData,
                                                    name: e.target.value
                                                }),
                                            placeholder: "Enter member name",
                                            disabled: addingMember,
                                            style: {
                                                width: '100%',
                                                padding: '0.75rem',
                                                border: '1px solid #d1d5db',
                                                borderRadius: 'var(--radius)',
                                                fontSize: '1rem',
                                                boxSizing: 'border-box'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/members/page.js",
                                            lineNumber: 468,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/members/page.js",
                                    lineNumber: 464,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: {
                                                display: 'block',
                                                marginBottom: '0.5rem',
                                                fontWeight: '500'
                                            },
                                            children: "Roll Number:"
                                        }, void 0, false, {
                                            fileName: "[project]/app/members/page.js",
                                            lineNumber: 485,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: addFormData.student_id,
                                            onChange: (e)=>setAddFormData({
                                                    ...addFormData,
                                                    student_id: e.target.value
                                                }),
                                            placeholder: "Enter roll number",
                                            disabled: addingMember,
                                            style: {
                                                width: '100%',
                                                padding: '0.75rem',
                                                border: '1px solid #d1d5db',
                                                borderRadius: 'var(--radius)',
                                                fontSize: '1rem',
                                                boxSizing: 'border-box'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/members/page.js",
                                            lineNumber: 488,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/members/page.js",
                                    lineNumber: 484,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: {
                                                display: 'block',
                                                marginBottom: '0.5rem',
                                                fontWeight: '500'
                                            },
                                            children: "Password:"
                                        }, void 0, false, {
                                            fileName: "[project]/app/members/page.js",
                                            lineNumber: 505,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "password",
                                            value: addFormData.password,
                                            onChange: (e)=>setAddFormData({
                                                    ...addFormData,
                                                    password: e.target.value
                                                }),
                                            placeholder: "Enter password",
                                            disabled: addingMember,
                                            style: {
                                                width: '100%',
                                                padding: '0.75rem',
                                                border: '1px solid #d1d5db',
                                                borderRadius: 'var(--radius)',
                                                fontSize: '1rem',
                                                boxSizing: 'border-box'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/members/page.js",
                                            lineNumber: 508,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/members/page.js",
                                    lineNumber: 504,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/members/page.js",
                            lineNumber: 463,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                gap: '1rem',
                                justifyContent: 'flex-end',
                                marginTop: '1.5rem'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowAddModal(false),
                                    disabled: addingMember,
                                    style: {
                                        backgroundColor: '#e5e7eb',
                                        color: '#1f2937',
                                        border: 'none',
                                        padding: '0.75rem 1.5rem',
                                        borderRadius: 'var(--radius)',
                                        cursor: addingMember ? 'not-allowed' : 'pointer',
                                        fontWeight: '500',
                                        opacity: addingMember ? 0.6 : 1
                                    },
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/app/members/page.js",
                                    lineNumber: 527,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleAddMember,
                                    disabled: addingMember,
                                    style: {
                                        backgroundColor: '#22c55e',
                                        color: '#fff',
                                        border: 'none',
                                        padding: '0.75rem 1.5rem',
                                        borderRadius: 'var(--radius)',
                                        cursor: addingMember ? 'not-allowed' : 'pointer',
                                        fontWeight: '500',
                                        opacity: addingMember ? 0.6 : 1
                                    },
                                    children: addingMember ? 'Adding...' : 'Add Member'
                                }, void 0, false, {
                                    fileName: "[project]/app/members/page.js",
                                    lineNumber: 543,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/members/page.js",
                            lineNumber: 526,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/members/page.js",
                    lineNumber: 436,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/members/page.js",
                lineNumber: 424,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: '2rem'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "/access-logs",
                        style: {
                            color: '#3b82f6',
                            textDecoration: 'none',
                            fontWeight: '500',
                            marginRight: '2rem'
                        },
                        children: "→ View Access Logs"
                    }, void 0, false, {
                        fileName: "[project]/app/members/page.js",
                        lineNumber: 565,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "/",
                        style: {
                            color: '#3b82f6',
                            textDecoration: 'none',
                            fontWeight: '500'
                        },
                        children: "← Back to Dashboard"
                    }, void 0, false, {
                        fileName: "[project]/app/members/page.js",
                        lineNumber: 573,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/members/page.js",
                lineNumber: 564,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/members/page.js",
        lineNumber: 149,
        columnNumber: 9
    }, this);
}
_s(MembersPage, "52FHnE7wfFec6QoYgNUzHW/svCY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = MembersPage;
var _c;
__turbopack_context__.k.register(_c, "MembersPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_c1d2b6e1._.js.map