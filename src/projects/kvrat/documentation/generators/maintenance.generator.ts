import * as fs from "fs";
import * as path from "path";

export class MaintenanceGenerator {
  constructor(private readonly root: string) {}

  generate() {
    const checks = [
      { name: "package.json", file: "package.json" },
      { name: "README.md", file: "README.md" },
      { name: ".env", file: ".env" },
      { name: "Dockerfile", file: "Dockerfile" },
      { name: "pnpm-workspace.yaml", file: "pnpm-workspace.yaml" },
      { name: "apps", file: "apps" },
      { name: "src", file: "src" },
    ];

    const lines: string[] = [];

    lines.push("# Maintenance");
    lines.push("");
    lines.push(`Generated: ${new Date().toISOString()}`);
    lines.push("");
    lines.push("## Project Health");
    lines.push("");

    for (const check of checks) {
      const exists = fs.existsSync(path.join(this.root, check.file));

      lines.push(
        `- ${exists ? "✅" : "❌"} ${check.name}`
      );
    }

    lines.push("");
    lines.push("## Commands");
    lines.push("");
    lines.push("```");
    lines.push("pnpm install");
    lines.push("pnpm build");
    lines.push("pnpm start:dev");
    lines.push("```");

    fs.writeFileSync(
      path.join(this.root, "docs", "MAINTENANCE.md"),
      lines.join("\n"),
      "utf8",
    );

    return true;
  }
}