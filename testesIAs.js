// CONECTANDO NO CHATGPT -- OPENAI

import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: "SUA-API-KEY-AQUI", // ISSO NÃO É SEGURO
    organization: "ORG-ID-AQUI"
});

const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{"role": "user", "content": "Quem é você?"}]
})

// console.log(chatCompletion.choices);

/*

ERRO SEM PAGAR:
error: { message: 'You exceeded your current quota, please check your plan and billing details.

*/


// CONECTANDO NO GEMINI - GOOGLE AI

// const { GoogleGenerativeAI } = require("@google/generative-ai");
import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("SUA-API-KEY-AQUI");

// The Gemini 1.5 models are versatile and work with most use cases
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

const prompt = "Quem é você?";

const result = await model.generateContent(prompt);
const responseGoogle = await result.response;

const text = responseGoogle.text();
console.log(text);