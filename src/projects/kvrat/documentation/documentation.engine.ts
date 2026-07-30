import * as fs from "fs";
import * as path from "path";

import { ArchitectureGenerator } from "./generators/architecture.generator";
import { ModulesGenerator } from "./generators/modules.generator";
import { ApiGenerator } from "./generators/api.generator";
import { DatabaseGenerator } from "./generators/database.generator";
import { MaintenanceGenerator } from "./generators/maintenance.generator";

export class DocumentationEngine {
  constructor(private readonly root: string) {}

  generate() {
    const docs = path.join(this.root, "docs");

    fs.mkdirSync(docs, { recursive: true });

    new ArchitectureGenerator(this.root).generate();
    new ModulesGenerator(this.root).generate();
    new ApiGenerator(this.root).generate();
    new DatabaseGenerator(this.root).generate();
    new MaintenanceGenerator(this.root).generate();

    return {
      success: true,
      output: docs,
      generated: [
        "ARCHITECTURE.md",
        "MODULES_MAP.md",
        "API_MAP.md",
        "DATABASE_MAP.md",
        "MAINTENANCE.md",
      ],
    };
  }
}