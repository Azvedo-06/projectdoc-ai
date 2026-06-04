export function analyzeArchitecture(
  files: string[],
): string[] {

  const patterns: string[] = [];

  if (
    files.some(file =>
      file.endsWith(".controller.ts")
    )
  ) {
    patterns.push("Controllers");
  }

  if (
    files.some(file =>
      file.endsWith(".service.ts")
    )
  ) {
    patterns.push("Services");
  }

  if (
    files.some(file =>
      file.includes("\\dto\\")
    )
  ) {
    patterns.push("DTOs");
  }

  if (
    files.some(file =>
      file.includes("\\guards\\")
    )
  ) {
    patterns.push("Guards");
  }

  if (
    files.some(file =>
      file.includes("\\decorators\\")
    )
  ) {
    patterns.push("Decorators");
  }

  if (
    files.some(file =>
      file.endsWith(".spec.ts")
    )
  ) {
    patterns.push("Testes Unitários");
  }

  if (
    files.some(file =>
      file.includes("\\test\\")
    )
  ) {
    patterns.push("Testes E2E");
  }

  return patterns;
}