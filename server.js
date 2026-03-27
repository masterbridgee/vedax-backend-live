const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

// 1. CORS setting: Manam live loki velthunnam kabatti, 
// ippudu local port 3000 matrame kadu, 
// andarini allow chese la setup chestunnam (leda specific Vercel URL ivvachu).
app.use(cors()); 

app.use(express.json());

// 2. Gemini API Initialization
// Security Rule: API Key ni direct ga code lo pettakudadu. 
// Deenini Render Environment Variables nunchi automatic ga teesukuntundi.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/generate', async (req, res) => {
    console.log("Request received for prompt:", req.body.prompt);
    try {
        const { prompt } = req.body;
        
        // Stable model version
        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
        
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

// 3. Port Setting (Crucial for Render)
// Render 'process.env.PORT' dwara dynamic ga port ni assign chestundi (usually 10000).
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
    console.log(`========================================`);
    console.log(`🚀 VEDAX AI Brain Port ${PORT} lo ready!`);
    console.log(`========================================`);
});