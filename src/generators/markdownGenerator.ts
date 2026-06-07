import * as fs from "fs";
import * as path from "path";
import { analyzeGoodPractices } from "../analysis/goodPracticesAnalyzer";
import { inferBusinessRules } from "../analysis/inferredBusinessRules";
import { generateRecommendations } from "../analysis/recommendationAnalyzer";

export function generateMarkdown(
  rootPath: string,
  techs: string[],
  modules: string[],
  architecture: string[],
  businessRules: string[],
  c4Suggestion: string,
  aiAnalysis: string,
) {
  const goodPractices = analyzeGoodPractices(architecture, techs);
  const inferredRules = inferBusinessRules(techs, modules);
  const recommendations = generateRecommendations(architecture);
  const content = `# Análise do Projeto

## Tecnologias

${techs.map((t) => `- ${t}`).join("\n")}

## Módulos

${modules.map((m) => `- ${m}`).join("\n")}

## Arquitetura

${architecture.map((a) => `- ${a}`).join("\n")}

## Regras de Negócio

${businessRules.map((rule) => `- ${rule}`).join("\n")}

## Regras de Negócio Inferidas

${inferredRules.map((rule) => `- ${rule}`).join("\n")}

## Boas Práticas Identificadas

${goodPractices.map((practice) => `- ${practice}`).join("\n")}

${c4Suggestion}

## Recomendações Técnicas

${recommendations.map((rec) => `- ${rec}`).join("\n")}

## Análise com IA

${aiAnalysis}

## Conclusão Técnica da Análise

O projeto apresenta uma arquitetura modular baseada nas tecnologias identificadas durante a análise.

Foram detectados ${modules.length} módulos principais e ${techs.length} tecnologias relevantes.

A estrutura demonstra separação de responsabilidades e organização compatível com boas práticas de desenvolvimento de software.

A documentação gerada automaticamente auxilia na compreensão, manutenção e evolução futura do sistema.
`;
  `
}

`;

  const outputPath = path.join(rootPath, "project-analysis.md");

  fs.writeFileSync(outputPath, content);

  return outputPath;
}
