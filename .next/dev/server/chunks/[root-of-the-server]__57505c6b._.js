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
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/process [external] (process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("process", () => require("process"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/timers [external] (timers, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("timers", () => require("timers"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/string_decoder [external] (string_decoder, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("string_decoder", () => require("string_decoder"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[project]/lib/db.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearAllData",
    ()=>clearAllData,
    "default",
    ()=>__TURBOPACK__default__export__,
    "deleteUser",
    ()=>deleteUser,
    "getAccessLogs",
    ()=>getAccessLogs,
    "getAllUsers",
    ()=>getAllUsers,
    "getDb",
    ()=>getDb,
    "getUserStats",
    ()=>getUserStats,
    "logUserAccess",
    ()=>logUserAccess
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mysql2$2f$promise$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mysql2/promise.js [app-route] (ecmascript)");
;
let pool;
async function getDb() {
    if (!pool) {
        pool = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mysql2$2f$promise$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].createPool({
            host: "localhost",
            user: "inventory",
            password: "Mutyala@4",
            database: "inventory",
            waitForConnections: true,
            connectionLimit: 10
        });
    }
    return pool;
}
async function clearAllData() {
    const db = await getDb();
    try {
        await db.query("DELETE FROM transactions");
        await db.query("DELETE FROM products");
        return true;
    } catch (err) {
        console.error("Error clearing data:", err);
        return false;
    }
}
async function getUserStats() {
    const db = await getDb();
    try {
        const [[admins]] = await db.query("SELECT COUNT(*) AS count FROM users WHERE role = 'admin'");
        const [[members]] = await db.query("SELECT COUNT(*) AS count FROM users WHERE role = 'member'");
        return {
            adminCount: admins.count || 0,
            memberCount: members.count || 0
        };
    } catch (err) {
        console.error("Error getting user stats:", err);
        return {
            adminCount: 0,
            memberCount: 0
        };
    }
}
async function getAllUsers() {
    const db = await getDb();
    try {
        const [rows] = await db.query("SELECT id, student_id, name, role, password, created_at FROM users ORDER BY role DESC, created_at ASC");
        return rows;
    } catch (err) {
        console.error("Error getting all users:", err);
        return [];
    }
}
async function deleteUser(userId) {
    const db = await getDb();
    try {
        await db.query("DELETE FROM transactions WHERE user_id = ?", [
            userId
        ]);
        await db.query("DELETE FROM users WHERE id = ?", [
            userId
        ]);
        return true;
    } catch (err) {
        console.error("Error deleting user:", err);
        return false;
    }
}
async function logUserAccess(userId, studentId, name, role) {
    const db = await getDb();
    try {
        await db.query("INSERT INTO access_logs (user_id, student_id, name, role) VALUES (?, ?, ?, ?)", [
            userId,
            studentId,
            name,
            role
        ]);
        return true;
    } catch (err) {
        console.error("Error logging access:", err);
        return false;
    }
}
async function getAccessLogs() {
    const db = await getDb();
    try {
        const [rows] = await db.query("SELECT id, user_id, student_id, name, role, accessed_at FROM access_logs ORDER BY accessed_at DESC");
        return rows;
    } catch (err) {
        console.error("Error getting access logs:", err);
        return [];
    }
}
const __TURBOPACK__default__export__ = {
    getDb,
    clearAllData,
    getUserStats,
    getAllUsers,
    deleteUser,
    logUserAccess,
    getAccessLogs
};
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/api/transactions/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
;
async function GET() {
    try {
        const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
        const [transactions] = await db.query(`
      SELECT t.*, p.name as product_name, u.name as user_name
      FROM transactions t
      JOIN products p ON t.product_id = p.id
      JOIN users u ON t.user_id = u.id
      ORDER BY t.timestamp DESC
    `);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(transactions);
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to fetch transactions'
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const { product_id, user_id, type, quantity } = await request.json();
        if (!product_id || !user_id || !type || !quantity) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Missing required fields'
        }, {
            status: 400
        });
        const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
        // Get product
        const [productRows] = await db.query('SELECT quantity FROM products WHERE id = ?', [
            product_id
        ]);
        const product = productRows[0];
        if (!product) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Product not found'
        }, {
            status: 404
        });
        let newQuantity = product.quantity;
        if (type === 'CHECKOUT') {
            if (product.quantity < quantity) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: `Insufficient quantity. Available: ${product.quantity}`
            }, {
                status: 400
            });
            newQuantity -= quantity;
        } else if (type === 'CHECKIN') {
            const [checkedOut] = await db.query(`
        SELECT SUM(quantity) as total_checked_out FROM transactions
        WHERE user_id = ? AND product_id = ? AND type='CHECKOUT'
      `, [
                user_id,
                product_id
            ]);
            const [checkedIn] = await db.query(`
        SELECT SUM(quantity) as total_checked_in FROM transactions
        WHERE user_id = ? AND product_id = ? AND type='CHECKIN'
      `, [
                user_id,
                product_id
            ]);
            const outstanding = (checkedOut[0]?.total_checked_out || 0) - (checkedIn[0]?.total_checked_in || 0);
            if (quantity > outstanding) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: `You can return only ${outstanding} units`
            }, {
                status: 400
            });
            newQuantity += quantity;
        } else {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Invalid transaction type'
            }, {
                status: 400
            });
        }
        await db.query('UPDATE products SET quantity = ? WHERE id = ?', [
            newQuantity,
            product_id
        ]);
        const [result] = await db.query('INSERT INTO transactions (product_id, user_id, type, quantity) VALUES (?, ?, ?, ?)', [
            product_id,
            user_id,
            type,
            quantity
        ]);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            id: result.insertId,
            product_id,
            user_id,
            type,
            quantity,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message || 'Transaction failed'
        }, {
            status: 400
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__57505c6b._.js.map