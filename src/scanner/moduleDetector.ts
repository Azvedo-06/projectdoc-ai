import * as fs from "fs";
import * as path from "path";

export function detectModules(rootPath: string): string[] {
  const srcPath = path.join(rootPath, "src");

  if (!fs.existsSync(srcPath)) {
    return [];
  }

  const entries = fs.readdirSync(srcPath);

  const modules: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(srcPath, entry);

    if (!fs.statSync(fullPath).isDirectory()) {
      continue;
    }

    const moduleFile = path.join(
      fullPath,
      `${entry}.module.ts`
    );

    if (fs.existsSync(moduleFile)) {
      modules.push(entry);
    }
  }

  return modules;
}