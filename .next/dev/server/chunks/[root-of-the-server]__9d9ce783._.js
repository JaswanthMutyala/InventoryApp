module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/better-sqlite3 [external] (better-sqlite3, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("better-sqlite3", () => require("better-sqlite3"));

module.exports = mod;
}),
"[project]/lib/db.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const path = __turbopack_context__.r("[externals]/path [external] (path, cjs)");
let db;
if ("TURBOPACK compile-time truthy", 1) {
    // Only load better-sqlite3 in Node.js environment (server-side)
    const Database = __turbopack_context__.r("[externals]/better-sqlite3 [external] (better-sqlite3, cjs)");
    const dbPath = path.join(process.cwd(), 'inventory.db');
    db = new Database(dbPath);
}
// Initialize database with tables
const initDb = ()=>{
    // Users table
    db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      role TEXT DEFAULT 'member' CHECK(role IN ('admin', 'member')),
      password TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `).run();
    // Add role column if it doesn't exist (migration for existing databases)
    try {
        db.prepare('ALTER TABLE users ADD COLUMN role TEXT DEFAULT "member" CHECK(role IN ("admin", "member"))').run();
    } catch (err) {
    // Column already exists, ignore error
    }
    // Add password column if it doesn't exist (migration for existing databases)
    try {
        db.prepare('ALTER TABLE users ADD COLUMN password TEXT').run();
    } catch (err) {
    // Column already exists, ignore error
    }
    // Products table
    db.prepare(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      quantity INTEGER DEFAULT 0,
      image_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `).run();
    // Transactions table (Logs)
    db.prepare(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      type TEXT CHECK(type IN ('CHECKOUT', 'CHECKIN')) NOT NULL,
      quantity INTEGER NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (product_id) REFERENCES products (id),
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `).run();
    // Access logs table
    db.prepare(`
    CREATE TABLE IF NOT EXISTS access_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      student_id TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      accessed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `).run();
};
// Clear all data functions
const clearAllData = ()=>{
    try {
        db.prepare('DELETE FROM transactions').run();
        db.prepare('DELETE FROM products').run();
        console.log('✅ All history and inventory cleared');
    } catch (err) {
        console.error('Error clearing data:', err);
    }
};
// Get user statistics
const getUserStats = ()=>{
    try {
        const admins = db.prepare('SELECT COUNT(*) as count FROM users WHERE role = "admin"').get();
        const members = db.prepare('SELECT COUNT(*) as count FROM users WHERE role = "member"').get();
        return {
            adminCount: admins?.count || 0,
            memberCount: members?.count || 0
        };
    } catch (err) {
        console.error('Error getting user stats:', err);
        return {
            adminCount: 0,
            memberCount: 0
        };
    }
};
// Get all users
const getAllUsers = ()=>{
    try {
        return db.prepare('SELECT id, student_id, name, role, password, created_at FROM users ORDER BY role DESC, created_at ASC').all();
    } catch (err) {
        console.error('Error getting all users:', err);
        return [];
    }
};
// Delete user
const deleteUser = (userId)=>{
    try {
        // Delete user's transactions first
        db.prepare('DELETE FROM transactions WHERE user_id = ?').run(userId);
        // Delete user
        db.prepare('DELETE FROM users WHERE id = ?').run(userId);
        return true;
    } catch (err) {
        console.error('Error deleting user:', err);
        return false;
    }
};
// Log user access
const logUserAccess = (userId, studentId, name, role)=>{
    try {
        db.prepare('INSERT INTO access_logs (user_id, student_id, name, role) VALUES (?, ?, ?, ?)').run(userId, studentId, name, role);
        return true;
    } catch (err) {
        console.error('Error logging access:', err);
        return false;
    }
};
// Get all access logs
const getAccessLogs = ()=>{
    try {
        return db.prepare('SELECT id, user_id, student_id, name, role, accessed_at FROM access_logs ORDER BY accessed_at DESC').all();
    } catch (err) {
        console.error('Error getting access logs:', err);
        return [];
    }
};
initDb();
// Default export for backward compatibility
module.exports = db;
// Named exports
module.exports.clearAllData = clearAllData;
module.exports.getUserStats = getUserStats;
module.exports.getAllUsers = getAllUsers;
module.exports.deleteUser = deleteUser;
module.exports.logUserAccess = logUserAccess;
module.exports.getAccessLogs = getAccessLogs;
module.exports.db = db;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/api/products/[id]/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "PUT",
    ()=>PUT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
;
async function PUT(request, { params }) {
    try {
        const id = (await params).id;
        const { name, description, quantity, image_url, user_id } = await request.json();
        if (!user_id) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'user_id is required'
            }, {
                status: 400
            });
        }
        // Check if user is admin
        const user = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].prepare('SELECT role FROM users WHERE id = ?').get(user_id);
        if (!user || user.role !== 'admin') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Only admins can update products'
            }, {
                status: 403
            });
        }
        const result = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].prepare('UPDATE products SET name = ?, description = ?, quantity = ?, image_url = ? WHERE id = ?').run(name, description, quantity, image_url, id);
        if (result.changes === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Product not found'
            }, {
                status: 404
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            id,
            name,
            description,
            quantity,
            image_url
        });
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to update product'
        }, {
            status: 500
        });
    }
}
async function DELETE(request, { params }) {
    try {
        const id = (await params).id;
        const body = await request.json();
        const user_id = body?.user_id;
        if (!user_id) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'user_id is required'
            }, {
                status: 400
            });
        }
        // Check if user is admin
        const user = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].prepare('SELECT role FROM users WHERE id = ?').get(user_id);
        if (!user || user.role !== 'admin') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Only admins can delete products'
            }, {
                status: 403
            });
        }
        console.log(`Attempting to delete product with id: ${id}`);
        // First, delete all transactions related to this product
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].prepare('DELETE FROM transactions WHERE product_id = ?').run(id);
        console.log(`Deleted transactions for product ${id}`);
        // Then delete the product
        const result = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].prepare('DELETE FROM products WHERE id = ?').run(id);
        console.log(`Delete result:`, result);
        if (result.changes === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Product not found'
            }, {
                status: 404
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: 'Product deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting product:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to delete product',
            details: error.message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__9d9ce783._.js.map