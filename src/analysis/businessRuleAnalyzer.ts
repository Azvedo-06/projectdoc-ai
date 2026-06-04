import * as fs from "fs";

export function extractBusinessRules(
  files: string[],
): string[] {

  const rules = new Set<string>();

  const serviceFiles = files.filter(file =>
    file.endsWith(".service.ts")
  );

  for (const file of serviceFiles) {

    const content = fs.readFileSync(
      file,
      "utf8",
    );

    // Controle de acesso
    if (
      content.includes("ForbiddenException")
    ) {
      rules.add(
        "Existem operações restritas por perfil de usuário."
      );
    }

    // Login obrigatório
    if (
      content.includes("UnauthorizedException")
    ) {
      rules.add(
        "Existem funcionalidades que exigem autenticação."
      );
    }

    // JWT
    if (
      content.includes("JwtService")
    ) {
      rules.add(
        "O sistema utiliza autenticação baseada em JWT."
      );
    }

    // Criptografia
    if (
      content.includes("bcrypt")
    ) {
      rules.add(
        "As senhas são armazenadas utilizando criptografia."
      );
    }

    // Cadastro de usuários
    if (
      content.toLowerCase().includes("createuser")
    ) {
      rules.add(
        "O sistema permite cadastro de usuários."
      );
    }

    // Eventos
    if (
      content.toLowerCase().includes("event")
    ) {
      rules.add(
        "O sistema possui gerenciamento de eventos."
      );
    }

    // Participantes
    if (
      content.toLowerCase().includes("participant")
    ) {
      rules.add(
        "Usuários podem participar de eventos."
      );
    }
  }

  return Array.from(rules);
}