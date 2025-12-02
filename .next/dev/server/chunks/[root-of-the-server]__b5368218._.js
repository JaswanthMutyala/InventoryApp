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
"[project]/app/api/users/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
;
const ADMIN_PASSWORD = 'Admin@123';
async function GET(request) {
    try {
        const authHeader = request.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Unauthorized'
            }, {
                status: 401
            });
        }
        const userId = authHeader.split(' ')[1];
        const requestingUser = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].prepare('SELECT role FROM users WHERE id = ?').get(userId);
        if (!requestingUser || requestingUser.role !== 'admin') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Forbidden'
            }, {
                status: 403
            });
        }
        const users = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].prepare('SELECT id, student_id, name, role, password, created_at FROM users ORDER BY role DESC, created_at ASC').all();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal Server Error'
        }, {
            status: 500
        });
    }
}
async function DELETE(request) {
    try {
        const authHeader = request.headers.get('authorization');
        const { password, userId } = await request.json();
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Unauthorized'
            }, {
                status: 401
            });
        }
        if (password !== ADMIN_PASSWORD) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Invalid admin password'
            }, {
                status: 403
            });
        }
        if (!userId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'User ID is required'
            }, {
                status: 400
            });
        }
        // Delete user's related data first to avoid foreign key issues
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].prepare('DELETE FROM transactions WHERE user_id = ?').run(userId);
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].prepare('DELETE FROM access_logs WHERE user_id = ?').run(userId);
        // Delete user
        const result = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].prepare('DELETE FROM users WHERE id = ?').run(userId);
        if (result.changes === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'User not found'
            }, {
                status: 404
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: 'User deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal Server Error'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__b5368218._.js.map