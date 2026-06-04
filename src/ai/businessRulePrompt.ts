export function createPrompt(
  context: string,
) {
  return `
Você é um arquiteto de software.

Analise os arquivos fornecidos.

Identifique:

1. Regras de negócio explícitas
2. Regras de negócio inferidas
3. Fluxos principais
4. Restrições de acesso
5. Responsabilidades dos módulos

Retorne em Markdown.

Contexto:

${context}
`;
}