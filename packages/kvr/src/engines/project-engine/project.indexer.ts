import * as path from "path";
import { ProjectScanner, ScanResult } from "./project.scanner";

export interface IndexedFile {

    name: string;

    path: string;

    extension: string;

    category: string;

}

export interface ProjectIndex {

    modules: IndexedFile[];

    controllers: IndexedFile[];

    services: IndexedFile[];

    entities: IndexedFile[];

    dto: IndexedFile[];

    interfaces: IndexedFile[];

    events: IndexedFile[];

    configs: IndexedFile[];

    tests: IndexedFile[];

    others: IndexedFile[];

}

export class ProjectIndexer {

    constructor(
        private readonly scanner = new ProjectScanner()
    ) {}

    build(root: string): ProjectIndex {

        const scan: ScanResult = this.scanner.scan(root);

        const index: ProjectIndex = {

            modules: [],
            controllers: [],
            services: [],
            entities: [],
            dto: [],
            interfaces: [],
            events: [],
            configs: [],
            tests: [],
            others: []

        };

        for (const file of scan.files) {

            const item: IndexedFile = {

                name: file.name,

                path: file.path,

                extension: file.extension,

                category: this.detect(file.path)

            };

            switch (item.category) {

                case "module":
                    index.modules.push(item);
                    break;

                case "controller":
                    index.controllers.push(item);
                    break;

                case "service":
                    index.services.push(item);
                    break;

                case "entity":
                    index.entities.push(item);
                    break;

                case "dto":
                    index.dto.push(item);
                    break;

                case "interface":
                    index.interfaces.push(item);
                    break;

                case "event":
                    index.events.push(item);
                    break;

                case "config":
                    index.configs.push(item);
                    break;

                case "test":
                    index.tests.push(item);
                    break;

                default:
                    index.others.push(item);

            }

        }

        return index;

    }

    private detect(file: string): string {

        const name = path.basename(file).toLowerCase();

        if (name.endsWith(".module.ts")) return "module";

        if (name.endsWith(".controller.ts")) return "controller";

        if (name.endsWith(".service.ts")) return "service";

        if (name.endsWith(".entity.ts")) return "entity";

        if (name.endsWith(".dto.ts")) return "dto";

        if (name.endsWith(".interface.ts")) return "interface";

        if (name.endsWith(".event.ts")) return "event";

        if (name.includes("config")) return "config";

        if (
            name.endsWith(".spec.ts") ||
            name.endsWith(".test.ts")
        ) {
            return "test";
        }

        return "other";

    }

}