require('dotenv').config();
const OpenAI = require('openai');

async function testConnection() {
    console.log("--- Testing Groq Connection ---");
    console.log("API Key present:", !!process.env.OPENAI_API_KEY);
    console.log("Base URL:", process.env.OPENAI_API_BASE);
    console.log("Model:", process.env.OPENAI_MODEL);

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        baseURL: process.env.OPENAI_API_BASE,
    });

    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: "Hello, represent ontology!" }],
            model: process.env.OPENAI_MODEL || "llama3-8b-8192",
        });

        console.log("\n✅ SUCCESS!");
        console.log("Response:", completion.choices[0].message.content);
    } catch (error) {
        console.error("\n❌ FAILED");
        console.error("Error Status:", error.status);
        console.error("Error Message:", error.message);
        if (error.response) {
            console.error("Data:", error.response.data);
        }
    }
}

testConnection();
