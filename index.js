import { GoogleGenerativeAI } from "@google/generative-ai";
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const genAI = new GoogleGenerativeAI("AIzaSyCqP-ECXVQGdoUAHlPmskxuBIdk_abu-PU");


const app = express();
app.use(express.json());
app.use(express.static(__dirname));


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


app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        const response = await generateResponse(message);
        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
}); 