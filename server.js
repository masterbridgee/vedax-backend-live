const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
// 1. dotenv ని యాడ్ చేశాను - ఇది API Key ని చదవడానికి ముఖ్యం
require('dotenv').config(); 

const app = express();

// 2. CORS setting: అందరినీ allow చేసేలా సింపుల్ గా ఉంచాను
app.use(cors()); 
app.use(express.json());

// 3. Gemini API Initialization
// Render Environment Variables నుంచి GEMINI_API_KEY ని తీసుకుంటుంది
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Root route: సర్వర్ పని చేస్తుందో లేదో చెక్ చేయడానికి
app.get('/', (req, res) => {
    res.send("🚀 VEDAX AI Backend is Live and Running!");
});

app.post('/generate', async (req, res) => {
    console.log("Request received for prompt:", req.body.prompt);
    try {
        const { prompt } = req.body;
        
        if (!prompt) {
            return res.status(400).json({ output: "Prompt missing boss!" });
        }
        
        // Stable model version: gemini-1.5-flash (చాలా స్పీడ్ గా ఉంటుంది)
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const result = await model.generateContent(`
            Nuvvu 'VEDAX AI Smart Creator' vi. 
            User ki helpful ga, professional ga Business, Marketing, mariyu Side Hustles (WarriorPlus, Amazon FBA) gurinchi tips ivvu.
            Answer simple Telugu mariyu English kalipi (Telugu-English) ivvu.
            User Question: ${prompt}`);

        const response = await result.response;
        const text = response.text();
        
        console.log("AI Response generated successfully!");
        res.json({ output: text });
        
    } catch (error) {
        console.error("Gemini API Error:", error);
        // ఎర్రర్ వస్తే ఈ మెసేజ్ కనిపిస్తుంది
        res.status(500).json({ output: "Backend Error: API Key leda Network check chey boss!" });
    }
});

// 4. Port Setting (Crucial for Render)
const PORT = process.env.PORT || 10000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`========================================`);
    console.log(`🚀 VEDAX AI Brain Port ${PORT} lo ready!`);
    console.log(`========================================`);
});