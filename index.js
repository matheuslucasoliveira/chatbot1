import { GoogleGenerativeAI } from "@google/generative-ai";
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure the API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Create Express app
const app = express();

// Configurar CORS
app.use(cors({
    origin: ['https://chatbot-2zn1.onrender.com', 'http://localhost:3000'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());
app.use(express.static(__dirname));

// System instruction that defines the chatbot's personality
const SYSTEM_INSTRUCTION = `Você é um assistente amigável e prestativo chamado GeminiBot. 
Sua personalidade é:
- Amigável e acolhedor
- Respostas concisas e diretas
- Usa linguagem simples e acessível
- Mantém um tom profissional mas descontraído
- Sempre tenta ajudar da melhor forma possível`;

async function generateResponse(prompt) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024,
            },
        });
        
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Erro ao processar a mensagem:", error);
        throw new Error("Erro ao processar a mensagem");
    }
}

// Chat endpoint
app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        const response = await generateResponse(message);
        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
}); 