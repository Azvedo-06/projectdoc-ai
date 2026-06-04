"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeWithAI = analyzeWithAI;
const openaiProvider_1 = require("./openaiProvider");
const contextBuilder_1 = require("./contextBuilder");
const businessRulePrompt_1 = require("./businessRulePrompt");
async function analyzeWithAI(files) {
    const context = (0, contextBuilder_1.buildContext)(files);
    const prompt = (0, businessRulePrompt_1.createPrompt)(context);
    return await (0, openaiProvider_1.askAI)(prompt);
}
//# sourceMappingURL=aiBusinessAnalyzer.js.map