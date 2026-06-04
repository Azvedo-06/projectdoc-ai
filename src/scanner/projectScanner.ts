import * as fs from "fs";
import * as path from "path";

export async function scanProject(rootPath: string) {

    const files: string[] = [];

    function walk(dir: string) {

        const entries = fs.readdirSync(dir);

        for (const entry of entries) {

            const fullPath = path.join(dir, entry);

            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {

                if (
                    entry === "node_modules" ||
                    entry === ".git" ||
                    entry === "dist"
                ) {
                    continue;
                }

                walk(fullPath);

            } else {

                files.push(fullPath);

            }
        }
    }

    walk(rootPath);

    return files;
}