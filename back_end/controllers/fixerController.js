const { callGeminiFixer } = require("../services/geminiService");

const fixCode = async (req, res) => {
    const { code, language } = req.body;

    if (!code || !language) {
        return res
            .status(400)
            .json({ error: "Code and language are required." });
    }

    try {
        const result = await callGeminiFixer(code, language);
        res.json(result);
    } catch (error) {
        console.error("Gemini API Error:", error.message);
        res.status(500).json({ error: "Failed to fix the code." });
    }
};

module.exports = { fixCode };
