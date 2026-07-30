import * as fs from "fs";
import * as path from "path";

export interface ProjectFile {

    name: string;

    path: string;

    extension: string;

    size: number;

}

export interface ProjectDirectory {

    name: string;

    path: string;

}

export interface ScanResult {

    root: string;

    files: ProjectFile[];

    directories: ProjectDirectory[];

}

export class ProjectScanner {

    scan(root: string): ScanResult {

        const result: ScanResult = {

            root,

            files: [],

            directories: []

        };

        this.walk(root, result);

        return result;

    }

    private walk(current: string, result: ScanResult): void {

        const entries = fs.readdirSync(current, {

            withFileTypes: true

        });

        for (const entry of entries) {

            const fullPath = path.join(current, entry.name);

            if (entry.isDirectory()) {

                result.directories.push({

                    name: entry.name,

                    path: fullPath

                });

                this.walk(fullPath, result);

            } else {

                const stat = fs.statSync(fullPath);

                result.files.push({

                    name: entry.name,

                    path: fullPath,

                    extension: path.extname(entry.name),

                    size: stat.size

                });

            }

        }

    }

}