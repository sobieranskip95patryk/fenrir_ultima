const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent';

async function generateContent(payload) {
    if (!process.env.GEMINI_API_KEY) throw new Error('Brak GEMINI_API_KEY w pliku .env');
    const response = await fetch(`${API_URL}?key=${encodeURIComponent(process.env.GEMINI_API_KEY)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (!response.ok || data.error) throw new Error(data.error?.message || `Gemini HTTP ${response.status}`);
    return data;
}

module.exports = { generateContent };
