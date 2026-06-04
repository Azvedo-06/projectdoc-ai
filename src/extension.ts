import * as vscode from "vscode";
import * as fs from "fs";
import * as dotenv from "dotenv";
import * as path from "path";

import { scanProject } from "./scanner/projectScanner";
import { detectModules } from "./scanner/moduleDetector";
import { analyzeArchitecture } from "./analysis/architectureAnalyzer";
import { generateMarkdown } from "./generators/markdownGenerator";
import { extractBusinessRules } from "./analysis/businessRuleAnalyzer";
import { analyzeWithAI } from "./ai/aiBusinessAnalyzer";
import { generateC4Suggestion } from "./analysis/c4Analyzer";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

function identifyTechs(dependencies: any) {
  const techs: string[] = [];

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

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "projectdoc-ai.analyzeProject",
    async () => {
      console.log("OPENAI_API_KEY =", process.env.OPENAI_API_KEY);
      const workspaceFolder = vscode.workspace.workspaceFolders?.[0];

      if (!workspaceFolder) {
        vscode.window.showErrorMessage("Nenhum projeto aberto.");
        return;
      }

      const files = await scanProject(workspaceFolder.uri.fsPath);

      console.log("Arquivos encontrados:", files);

      const packageJsonFile = files.find((file) =>
        file.endsWith("package.json"),
      );

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

      const modules = detectModules(workspaceFolder.uri.fsPath);
      console.log("Módulos:", modules);

      const architecture = analyzeArchitecture(files);
      console.log("Arquitetura:", architecture);

      const businessRules = extractBusinessRules(files);
      console.log("Regras de negócio:", businessRules);

      const c4Suggestion = generateC4Suggestion(modules);
      console.log(c4Suggestion);

      let aiAnalysis = "";

      try {
        aiAnalysis = await analyzeWithAI(files);

        console.log("Análise IA:");
        console.log(aiAnalysis);
      } catch (error) {
        console.log("Análise IA indisponível. Continuando sem IA.");

        aiAnalysis = "Módulo de IA não disponível ou sem créditos.";
      }

      const reportPath = generateMarkdown(
        workspaceFolder.uri.fsPath,
        techs,
        modules,
        architecture,
        businessRules,
        c4Suggestion,
        aiAnalysis,
      );
      console.log("Relatório gerado:", reportPath);

      vscode.window.showInformationMessage(
        `Análise concluída! Relatório gerado com sucesso.`,
      );
    },
  );
  context.subscriptions.push(disposable);
}

export function deactivate() {}
