import * as fs from "fs";
import * as path from "path";

export class ApiGenerator {
  constructor(private readonly root: string) {}

  generate() {
    const src = path.join(this.root, "src");
    const apis: string[] = [];

    const scan = (dir: string) => {
      if (!fs.existsSync(dir)) return;

      for (const item of fs.readdirSync(dir)) {
        const file = path.join(dir, item);

        if (fs.statSync(file).isDirectory()) {
          scan(file);
          continue;
        }

        if (!item.endsWith(".controller.ts")) continue;

        const text = fs.readFileSync(file, "utf8");

        const controller =
          text.match(/@Controller\((.*?)\)/)?.[1]
            ?.replace(/['"`]/g, "")
            .trim() ?? "";

        const methods = [
          ...text.matchAll(
            /@(Get|Post|Put|Patch|Delete)\((.*?)\)/g,
          ),
        ];

        for (const m of methods) {
          const verb = m[1].toUpperCase();

          const route = m[2]
            .replace(/['"`]/g, "")
            .trim();

          apis.push(
            `${verb} /${controller}${route ? "/" + route : ""}`,
          );
        }
      }
    };

    scan(src);

    const lines: string[] = [];

    lines.push("# API Map");
    lines.push("");
    lines.push(`Generated: ${new Date().toISOString()}`);
    lines.push("");
    lines.push(`Total Endpoints: ${apis.length}`);
    lines.push("");

    apis.sort().forEach((x) => lines.push(`- ${x}`));

    fs.writeFileSync(
      path.join(this.root, "docs", "API_MAP.md"),
      lines.join("\n"),
      "utf8",
    );

    return {
      endpoints: apis.length,
    };
  }
}