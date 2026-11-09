const fs = require('node:fs/promises');
const path = require('node:path');

const historyDir = path.join(__dirname, '..', 'data', 'history');

async function saveSession(session) {
    await fs.mkdir(historyDir, { recursive: true });
    const name = `session-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
    await fs.writeFile(path.join(historyDir, name), JSON.stringify(session, null, 2), 'utf8');
    return name;
}

module.exports = { saveSession };
