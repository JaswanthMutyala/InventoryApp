import mysql from "mysql2/promise";

let pool;

// MySQL Connection Pool
export async function getDb() {
  if (!pool) {
    pool = mysql.createPool({
      host: "localhost",
      user: "inventory",
      password: "Mutyala@4",  // MySQL user password
      database: "inventory",       // Your MySQL DB name
      waitForConnections: true,
      connectionLimit: 10,
    });
  }
  return pool;
}

/* ------------------------------------------------------------------
   Database Functions (MySQL versions of your previous SQLite code)
------------------------------------------------------------------ */

// Clear all data (products + transactions ONLY, like before)
export async function clearAllData() {
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

// Get user statistics
export async function getUserStats() {
  const db = await getDb();

  try {
    const [[admins]] = await db.query(
      "SELECT COUNT(*) AS count FROM users WHERE role = 'admin'"
    );
    const [[members]] = await db.query(
      "SELECT COUNT(*) AS count FROM users WHERE role = 'member'"
    );

    return {
      adminCount: admins.count || 0,
      memberCount: members.count || 0,
    };
  } catch (err) {
    console.error("Error getting user stats:", err);
    return { adminCount: 0, memberCount: 0 };
  }
}

// Get all users
export async function getAllUsers() {
  const db = await getDb();

  try {
    const [rows] = await db.query(
      "SELECT id, student_id, name, role, password, created_at FROM users ORDER BY role DESC, created_at ASC"
    );
    return rows;
  } catch (err) {
    console.error("Error getting all users:", err);
    return [];
  }
}

// Delete user + their transactions
export async function deleteUser(userId) {
  const db = await getDb();

  try {
    await db.query("DELETE FROM transactions WHERE user_id = ?", [userId]);
    await db.query("DELETE FROM users WHERE id = ?", [userId]);
    return true;
  } catch (err) {
    console.error("Error deleting user:", err);
    return false;
  }
}

// Log user access
export async function logUserAccess(userId, studentId, name, role) {
  const db = await getDb();

  try {
    await db.query(
      "INSERT INTO access_logs (user_id, student_id, name, role) VALUES (?, ?, ?, ?)",
      [userId, studentId, name, role]
    );
    return true;
  } catch (err) {
    console.error("Error logging access:", err);
    return false;
  }
}

// Get all access logs
export async function getAccessLogs() {
  const db = await getDb();

  try {
    const [rows] = await db.query(
      "SELECT id, user_id, student_id, name, role, accessed_at FROM access_logs ORDER BY accessed_at DESC"
    );
    return rows;
  } catch (err) {
    console.error("Error getting access logs:", err);
    return [];
  }
}

// Default export (optional for compatibility)
export default {
  getDb,
  clearAllData,
  getUserStats,
  getAllUsers,
  deleteUser,
  logUserAccess,
  getAccessLogs,
};
