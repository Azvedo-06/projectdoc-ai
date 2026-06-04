import * as fs from "fs";
import * as path from "path";

export function detectTechnologies(root: string) {

    const packageJsonPath =
        path.join(root, "package.json");

    if (!fs.existsSync(packageJsonPath)) {
        return [];
    }

    const packageJson = JSON.parse(
        fs.readFileSync(packageJsonPath, "utf8")
    );

    const deps = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies
    };

    const technologies: string[] = [];

    if (deps["@nestjs/core"]) {
        technologies.push("NestJS");
    }

    if (deps["express"]) {
        technologies.push("Express");
    }

    if (deps["react"]) {
        technologies.push("React");
    }

    if (deps["prisma"]) {
        technologies.push("Prisma");
    }

    return technologies;
}