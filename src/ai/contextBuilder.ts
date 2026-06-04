import * as fs from "fs";

export function buildContext(
  files: string[],
): string {

  const serviceFiles = files.filter(
    file =>
      file.endsWith(".service.ts") ||
      file.endsWith(".controller.ts")
  );

  let context = "";

  for (const file of serviceFiles) {

    const content = fs.readFileSync(
      file,
      "utf8",
    );

    context += `

ARQUIVO:
${file}

CODIGO:

${content}

`;
  }

  return context;
}