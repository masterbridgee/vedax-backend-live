const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

// 1. CORS setting: Frontend (3000) nunchi vachina requests ni allow chestundi
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// 2. Gemini API Initialization
const genAI = new GoogleGenerativeAI("AIzaSyCkF4FMIqCjONTaM-MLB09bYqui0GEl5eE");

app.post('/generate', async (req, res) => {
    console.log("Request received for prompt:", req.body.prompt); // CMD lo log kanipisthundi
    try {
        const { prompt } = req.body;
        
        // Stable model version vadutunnam
        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
        
        // AI Instructions - VEDAX Brand style
        const result = await model.generateContent(`
            Nuvvu 'VEDAX AI Smart Creator' vi. 
            User ki helpful ga, professional ga Business, Marketing, mariyu Side Hustles (WarriorPlus, Amazon FBA) gurinchi tips ivvu.
            Answer simple Telugu mariyu English kalipi (Hinglish) ivvu.
            User Question: ${prompt}`);

        const response = await result.response;
        const text = response.text();
        
        console.log("AI Response generated successfully!");
        res.json({ output: text });
        
    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ output: "Backend Error: API Key leda Network check chey boss!" });
    }
});

// Port 5000 lo server start avthundi
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`========================================`);
    console.log(`🚀 VEDAX AI Brain Port ${PORT} lo ready!`);
    console.log(`========================================`);
});