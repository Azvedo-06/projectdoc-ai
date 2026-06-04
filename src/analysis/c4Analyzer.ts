export function generateC4Suggestion(
  modules: string[],
): string {

  const actors = [
    "Usuário",
    "Administrador",
  ];

  return `
## Sugestão de Diagramas C4

### Diagrama de Contexto

Atores:
${actors.map(actor => `- ${actor}`).join("\n")}

Sistema:
- Sistema analisado

### Diagrama de Componentes

Componentes:
${modules.map(module => `- ${module} Module`).join("\n")}

### Relacionamentos

- Usuário → Auth Module
- Usuário → Events Module
- Administrador → Admin Module
- Auth Module → Users Module
`;
}