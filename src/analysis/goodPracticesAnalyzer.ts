export function analyzeGoodPractices(
  architecture: string[],
  techs: string[],
): string[] {

  const practices: string[] = [];

  if (architecture.includes("DTOs")) {
    practices.push(
      "Uso de DTOs para transporte e validação de dados",
    );
  }

  if (architecture.includes("Services")) {
    practices.push(
      "Separação de responsabilidades entre Controllers e Services",
    );
  }

  if (techs.includes("JWT")) {
    practices.push(
      "Autenticação baseada em JWT",
    );
  }

  if (architecture.includes("Testes Unitários")) {
    practices.push(
      "Presença de testes unitários",
    );
  }

  return practices;
}