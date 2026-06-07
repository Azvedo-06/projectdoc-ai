export function generateRecommendations(
  architecture: string[],
): string[] {

  const recommendations: string[] = [];

  if (!architecture.includes("Testes E2E")) {
    recommendations.push(
      "Implementar testes end-to-end",
    );
  }

  recommendations.push(
    "Avaliar uso de Swagger para documentação",
  );

  recommendations.push(
    "Implementar integração contínua (CI/CD)",
  );

  return recommendations;
}