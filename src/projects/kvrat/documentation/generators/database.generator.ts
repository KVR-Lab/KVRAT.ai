import * as fs from "fs";
import * as path from "path";

export class DatabaseGenerator {
  constructor(private readonly root: string) {}

  generate() {
    const prisma = path.join(this.root, "prisma", "schema.prisma");

    const lines: string[] = [];

    lines.push("# Database Map");
    lines.push("");
    lines.push(`Generated: ${new Date().toISOString()}`);
    lines.push("");

    if (!fs.existsSync(prisma)) {
      lines.push("Database not configured.");
    } else {
      const schema = fs.readFileSync(prisma, "utf8");

      const models = [...schema.matchAll(/^model\s+(\w+)/gm)].map(
        (m) => m[1],
      );

      const enums = [...schema.matchAll(/^enum\s+(\w+)/gm)].map(
        (m) => m[1],
      );

      lines.push("## Models");
      lines.push("");

      models.forEach((m) => lines.push(`- ${m}`));

      lines.push("");
      lines.push("## Enums");
      lines.push("");

      enums.forEach((e) => lines.push(`- ${e}`));
    }

    fs.writeFileSync(
      path.join(this.root, "docs", "DATABASE_MAP.md"),
      lines.join("\n"),
      "utf8",
    );

    return true;
  }
}