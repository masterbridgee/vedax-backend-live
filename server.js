const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config(); // API Key ని సరిగ్గా లోడ్ చేయడానికి

const app = express();

// 1. CORS setting
app.use(cors()); 
app.use(express.json());

// 2. Gemini API Initialization
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/generate', async (req, res) => {
    console.log("Request received for prompt:", req.body.prompt);
    try {
        const { prompt } = req.body;
        
        // Stable model: gemini-1.5-flash (చాలా ఫాస్ట్ గా ఉంటుంది)
        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
        
        // అప్‌డేట్ చేసిన ఇన్స్ట్రక్షన్స్ - Headline, Body, CTA ట్యాగ్స్ తో వస్తుంది
        const result = await model.generateContent(`
            Nuvvu 'VEDAX AI Smart Creator' vi. 
            User ki helpful ga, professional ga Business, Marketing, mariyu Side Hustles (WarriorPlus, Amazon FBA) gurinchi tips ivvu.
            
            Strictly follow this structure in your response:
            [HEADLINE] Catchy headline here [/HEADLINE]
            [BODY] Detailed points here [/BODY]
            [CTA] Motivational call to action here [/CTA]
            
            Answer simple Telugu mariyu English kalipi (Hinglish) ivvu.
            User Question: ${prompt}`);

        const response = await result.response;
        const text = response.text();
        
        console.log("AI Response with Pro-Formatting generated!");
        res.json({ output: text });
        
    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ output: "Backend Error: API Key leda Network check chey boss!" });
    }
});

// 3. Port Setting (Crucial for Render)
const PORT = process.env.PORT || 10000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`========================================`);
    console.log(`🚀 VEDAX AI Brain Port ${PORT} lo ready!`);
    console.log(`========================================`);
});