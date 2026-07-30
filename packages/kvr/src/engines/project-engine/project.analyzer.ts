import * as fs from "fs";
import { ProjectIndexer } from "./project.indexer";

export interface ModuleRelation {

    module: string;

    imports: string[];

    providers: string[];

    controllers: string[];

}

export interface ServiceRelation {

    service: string;

    dependencies: string[];

}

export interface ControllerRelation {

    controller: string;

    services: string[];

}

export interface AnalysisResult {

    modules: ModuleRelation[];

    services: ServiceRelation[];

    controllers: ControllerRelation[];

}

export class ProjectAnalyzer {

    constructor(
        private readonly indexer = new ProjectIndexer()
    ) {}

    analyze(root: string): AnalysisResult {

        const index = this.indexer.build(root);

        const result: AnalysisResult = {

            modules: [],

            services: [],

            controllers: []

        };

        for (const moduleFile of index.modules) {

            const code = fs.readFileSync(moduleFile.path, "utf8");

            result.modules.push({

                module: moduleFile.name,

                imports: this.extractArray(code, "imports"),

                providers: this.extractArray(code, "providers"),

                controllers: this.extractArray(code, "controllers")

            });

        }

        for (const serviceFile of index.services) {

            const code = fs.readFileSync(serviceFile.path, "utf8");

            result.services.push({

                service: serviceFile.name,

                dependencies: this.extractConstructorDependencies(code)

            });

        }

        for (const controllerFile of index.controllers) {

            const code = fs.readFileSync(controllerFile.path, "utf8");

            result.controllers.push({

                controller: controllerFile.name,

                services: this.extractConstructorDependencies(code)

            });

        }

        return result;

    }

    private extractArray(code: string, key: string): string[] {

        const regex = new RegExp(`${key}\\s*:\\s*\\[(.*?)\\]`, "s");

        const match = code.match(regex);

        if (!match) {

            return [];

        }

        return match[1]

            .split(",")

            .map(v => v.trim())

            .filter(Boolean);

    }

    private extractConstructorDependencies(code: string): string[] {

        const regex = /constructor\s*\(([\s\S]*?)\)/m;

        const match = code.match(regex);

        if (!match) {

            return [];

        }

        return match[1]

            .split(",")

            .map(line => {

                const parts = line.split(":");

                return parts.length > 1

                    ? parts[1].trim()

                    : "";

            })

            .filter(Boolean);

    }

}