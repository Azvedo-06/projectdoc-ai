export function generateC4(
  modules: string[],
): string {

  return `
## Sugestão de Diagramas C4

### Diagrama de Contexto

Atores:
- Usuário
- Administrador

Sistema:
- Sistema Analisado

### Diagrama de Componentes

${modules.map(m => `- ${m} Module`).join("\n")}
`;
}