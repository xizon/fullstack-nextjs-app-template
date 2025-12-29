const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');
const __APP_KEYS_FILE_DIR = 'my/db'; 

// 1. check and create directory
const targetFilesFolderPath = path.resolve(__dirname, `../../../../${__APP_KEYS_FILE_DIR}`);
if (!fs.existsSync(targetFilesFolderPath)){
    fs.mkdirSync(targetFilesFolderPath, { recursive: true });
}

// 2. initialize database connection
const dbPath = path.join(targetFilesFolderPath, 'auth.db');
const db = new Database(dbPath);

// 3. initialize database schema
db.exec(`
    CREATE TABLE IF NOT EXISTS api_keys (
        key TEXT PRIMARY KEY, 
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

/**
 * check if a key exists
 * @param {string} key
 */
const verifyKeyExists = (key) => {
    if (!key) return false;
    const row = db.prepare('SELECT 1 FROM api_keys WHERE key = ?').get(key);
    return !!row;
};


/**
 * Save keys
 * @param {Array} dataArray - such as [{"key":"9d4b..."}, ...]
 */
const saveKeys = db.transaction((dataArray) => {
    const insert = db.prepare('INSERT OR IGNORE INTO api_keys (key) VALUES (?)');

    for (const item of dataArray) {
        if (item.key) {
            insert.run(item.key);
        }
    }
    return dataArray.length;
});

/**
 * Delete keys
 * @param {Array|string} input - It can be an array [{"key":"..."}], or a single string
 */
const deleteKeys = db.transaction((input) => {
    const deleteStmt = db.prepare('DELETE FROM api_keys WHERE key = ?');
    let count = 0;

    if (Array.isArray(input)) {
        // 
        for (const item of input) {
            const keyToDelete = typeof item === 'object' ? item.key : item;
            if (keyToDelete) {
                const info = deleteStmt.run(keyToDelete);
                count += info.changes;
            }
        }
    } else {
        // 
        const info = deleteStmt.run(input);
        count = info.changes;
    }
    
    return count;
});

/**
 * Full update key: Empty first, then insert
 * @param {Array} dataArray - [{"key":"..."}]
 */
const syncAllKeys = db.transaction((dataArray) => {
    // 1. clean all
    db.prepare('DELETE FROM api_keys').run();

    // 2. insert
    const insert = db.prepare('INSERT INTO api_keys (key) VALUES (?)');

    // 3. insert loop
    for (const item of dataArray) {
        if (item.key) {
            insert.run(item.key);
        }
    }
    
    return dataArray.length;
});


/**
 * get all Keys
 */
const getAllKeys = () => {
    return db.prepare('SELECT * FROM api_keys').all();
};

module.exports = {
    db,
    saveKeys,
    deleteKeys,
    verifyKeyExists,
    syncAllKeys,
    getAllKeys
};