// backend/services/geminiService.js
const fetch = (...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args));

const callGeminiFixer = async (code, language) => {
    const prompt = `You are a code-fixing assistant. Please fix the following ${language} code and explain what you changed:\n\n${code}`;

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const body = {
        contents: [
            {
                parts: [{ text: prompt }],
            },
        ],
    };

    const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Gemini API Error: ${errText}`);
    }

    const data = await response.json();

    return {
        fixedCode: data?.candidates?.[0]?.content || "No response from Gemini",
    };
};

module.exports = { callGeminiFixer };
