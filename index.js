import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

// CONFIGURANDO OPENAI
const openai = new OpenAI({
    apiKey: "SUA-API-KEY-AQUI", // ISSO NÃO É SEGURO
    organization: "ORG-ID-AQUI"
});

// CONFIGURAR ENDPOINT

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());


// CRIANDO ENDPOINT PARA ENVIAR MENSAGENS À API DO GPT/GEMINI E RETORNAR A RESPOSTA

app.post("/sendMessage", async (req, res) => {

    const { messages } = req.body;
    
    // ChatGPT
    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {"role": "system", "content": "Seja um professor de programação"},
            ...messages
        ]
    });

    res.json({
        chat_completion: chatCompletion.choices[0]
    })
});


// Gemini
app.post("/sendMessageGemini", async (req, res) => {

    const { messages } = req.body;
    console.log(messages);

    // Access your API key as an environment variable (see "Set up your API key" above)
    const genAI = new GoogleGenerativeAI("SUA-API-KEY-AQUI");

    // The Gemini 1.5 models are versatile and work with most use cases
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    const prompt = messages[0].parts[0].text;

    const result = await model.generateContent(prompt);
    const responseGoogle = await result.response;

    const text = responseGoogle.text();
    
    console.log(text);

    res.json({
        chat_completion: text
    })
})

app.listen(port, () => {
    console.log(`Exemplo de app consumindo http://localhost:${3000}`);
})











