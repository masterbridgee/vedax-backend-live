const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config(); // API Key ని సురక్షితంగా చదవడానికి

const app = express();

// 1. CORS setting: అందరినీ అనుమతించేలా setup
app.use(cors()); 
app.use(express.json());

// 2. Gemini API Initialization
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/generate', async (req, res) => {
    console.log("Request received for prompt:", req.body.prompt);
    try {
        const { prompt } = req.body;
        
        // Stable model version: gemini-1.5-flash
        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
        
        // AI కి స్పష్టమైన ఫార్మాట్ ఇన్స్ట్రక్షన్స్ ఇస్తున్నాము
        const result = await model.generateContent(`
            Nuvvu 'VEDAX AI Smart Creator' vi. 
            User ki Business, Marketing, mariyu Side Hustles (WarriorPlus, Amazon FBA) gurinchi tips ivvu.
            
            Strictly provide the response in this structure:
            [HEADLINE] Catchy title for the answer [/HEADLINE]
            [BODY] Detailed points and explanation [/BODY]
            [CTA] A final motivational call to action or step [/CTA]
            
            Answer simple Telugu mariyu English kalipi (Hinglish) ivvu.
            User Question: ${prompt}`);

        const response = await result.response;
        const text = response.text();
        
        console.log("AI Response with formatting generated!");
        res.json({ output: text });
        
    } catch (error) {
        console.error("Gemini API Error:", error);
        // ఎర్రర్ వస్తే పాత లాగ్స్ ప్రకారం ఈ మెసేజ్ వెళ్తుంది
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