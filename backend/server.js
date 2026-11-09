require('dotenv').config();
const path = require('node:path');
const express = require('express');
const { generateContent } = require('./gemini');
const { saveSession } = require('./memory');

const app = express();
const port = Number(process.env.PORT || 3000);
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.post('/api/chat', async (req, res) => {
    try {
        const data = await generateContent(req.body);
        await saveSession({ at: new Date().toISOString(), request: req.body, response: data });
        res.json(data);
    } catch (error) {
        res.status(502).json({ error: { message: error.message } });
    }
});

app.get('*', (_req, res) => res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html')));
app.listen(port, () => console.log(`LOGOS ULTIMA: http://localhost:${port}`));
