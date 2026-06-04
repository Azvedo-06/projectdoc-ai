"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs"));
const dotenv = __importStar(require("dotenv"));
const path = __importStar(require("path"));
const projectScanner_1 = require("./scanner/projectScanner");
const moduleDetector_1 = require("./scanner/moduleDetector");
const architectureAnalyzer_1 = require("./analysis/architectureAnalyzer");
const markdownGenerator_1 = require("./generators/markdownGenerator");
const businessRuleAnalyzer_1 = require("./analysis/businessRuleAnalyzer");
const aiBusinessAnalyzer_1 = require("./ai/aiBusinessAnalyzer");
dotenv.config({
    path: path.resolve(__dirname, "../.env"),
});
function identifyTechs(dependencies) {
    const techs = [];
    if (dependencies["@nestjs/core"]) {
        techs.push("NestJS");
    }
    if (dependencies["sequelize"]) {
        techs.push("Sequelize");
    }
    if (dependencies["@nestjs/jwt"]) {
        techs.push("JWT");
    }
    if (dependencies["bcrypt"]) {
        techs.push("Bcrypt");
    }
    if (dependencies["passport"]) {
        techs.push("Passport");
    }
    return techs;
}
function activate(context) {
    const disposable = vscode.commands.registerCommand("projectdoc-ai.analyzeProject", async () => {
        console.log("OPENAI_API_KEY =", process.env.OPENAI_API_KEY);
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            vscode.window.showErrorMessage("Nenhum projeto aberto.");
            return;
        }
        const files = await (0, projectScanner_1.scanProject)(workspaceFolder.uri.fsPath);
        console.log("Arquivos encontrados:", files);
        const packageJsonFile = files.find((file) => file.endsWith("package.json"));
        if (!packageJsonFile) {
            vscode.window.showErrorMessage("package.json não encontrado.");
            return;
        }
        const packageJson = JSON.parse(fs.readFileSync(packageJsonFile, "utf8"));
        const dependencies = {
            ...packageJson.dependencies,
            ...packageJson.devDependencies,
        };
        const techs = identifyTechs(dependencies);
        console.log("Tecnologias:", techs);
        const modules = (0, moduleDetector_1.detectModules)(workspaceFolder.uri.fsPath);
        console.log("Módulos:", modules);
        const architecture = (0, architectureAnalyzer_1.analyzeArchitecture)(files);
        console.log("Arquitetura:", architecture);
        const businessRules = (0, businessRuleAnalyzer_1.extractBusinessRules)(files);
        console.log("Regras de negócio:", businessRules);
        let aiAnalysis = "";
        try {
            aiAnalysis = await (0, aiBusinessAnalyzer_1.analyzeWithAI)(files);
            console.log("Análise IA:");
            console.log(aiAnalysis);
        }
        catch (error) {
            console.log("Análise IA indisponível. Continuando sem IA.");
            aiAnalysis = "Módulo de IA não disponível ou sem créditos.";
        }
        const reportPath = (0, markdownGenerator_1.generateMarkdown)(workspaceFolder.uri.fsPath, techs, modules, architecture, businessRules, aiAnalysis);
        console.log("Relatório gerado:", reportPath);
        vscode.window.showInformationMessage(`Análise concluída! Relatório gerado com sucesso.`);
    });
    context.subscriptions.push(disposable);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map