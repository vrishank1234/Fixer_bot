const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const callGeminiFixer = async (code, language) => {
    const prompt = `You are a code-fixing assistant. Please fix the following ${language} code and explain the issues and the fixes.

Code:
${code}`;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const content = response.text();

    console.log(content);

    return {
        fixedCode: content, // May contain both fixed code + explanation
    };
};

module.exports = { callGeminiFixer };
