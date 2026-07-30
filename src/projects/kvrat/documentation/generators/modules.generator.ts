import * as fs from "fs";
import * as path from "path";

export class ModulesGenerator {
  constructor(private readonly root: string) {}

  generate() {
    const src = path.join(this.root, "src");
    const modules: string[] = [];

    const scan = (dir: string) => {
      if (!fs.existsSync(dir)) return;

      for (const item of fs.readdirSync(dir)) {
        const file = path.join(dir, item);

        if (fs.statSync(file).isDirectory()) {
          scan(file);
          continue;
        }

        if (
          item.endsWith(".module.ts") &&
          !item.endsWith(".module.spec.ts")
        ) {
          modules.push(path.relative(src, file));
        }
      }
    };

    scan(src);

    const lines: string[] = [];

    lines.push("# Modules Map");
    lines.push("");
    lines.push(`Generated: ${new Date().toISOString()}`);
    lines.push("");
    lines.push(`Total Modules: ${modules.length}`);
    lines.push("");

    for (const module of modules.sort()) {
      lines.push(`- ${module}`);
    }

    fs.writeFileSync(
      path.join(this.root, "docs", "MODULES_MAP.md"),
      lines.join("\n"),
      "utf8",
    );

    return {
      modules: modules.length,
    };
  }
}