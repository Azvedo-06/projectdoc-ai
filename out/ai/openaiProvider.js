"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.askAI = askAI;
const openai_1 = __importDefault(require("openai"));
async function askAI(prompt) {
    if (!process.env.OPENAI_API_KEY) {
        throw new Error("OPENAI_API_KEY não encontrada");
    }
    const client = new openai_1.default({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const response = await client.responses.create({
        model: "gpt-5",
        input: prompt,
    });
    return response.output_text;
}
//# sourceMappingURL=openaiProvider.js.map