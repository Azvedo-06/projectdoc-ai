export function inferBusinessRules(
  techs: string[],
  modules: string[],
): string[] {

  const rules: string[] = [];

  if (techs.includes("JWT")) {
    rules.push(
      "Apenas usuários autenticados podem acessar recursos protegidos",
    );
  }

  if (modules.includes("events")) {
    rules.push(
      "Usuários podem participar de eventos cadastrados",
    );
  }

  if (modules.includes("admin")) {
    rules.push(
      "Administradores possuem permissões diferenciadas",
    );
  }

  return rules;
}