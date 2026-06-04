import * as fs from "fs";
import * as path from "path";

export function generateMarkdown(
  rootPath: string,
  techs: string[],
  modules: string[],
  architecture: string[],
  businessRules: string[],
  aiAnalysis: string,
) {
  const content = `# Análise do Projeto

## Tecnologias

${techs.map((t) => `- ${t}`).join("\n")}

## Módulos

${modules.map((m) => `- ${m}`).join("\n")}

## Arquitetura

${architecture.map((a) => `- ${a}`).join("\n")}

## Regras de Negócio

${businessRules.map((rule) => `- ${rule}`).join("\n")}

## Análise com IA
${aiAnalysis}

`;

  const outputPath = path.join(rootPath, "project-analysis.md");

  fs.writeFileSync(outputPath, content);

  return outputPath;
}
