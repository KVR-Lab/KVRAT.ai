import * as fs from "fs";
import * as path from "path";

export class ArchitectureGenerator {
  constructor(private readonly root: string) {}

  generate() {
    const apps = path.join(this.root, "apps");

    const output = [
      "# KVRAT.ai Architecture",
      "",
      `Generated: ${new Date().toISOString()}`,
      "",
      "## Applications",
      "",
    ];

    if (fs.existsSync(apps)) {
      const list = fs
        .readdirSync(apps)
        .filter((x) =>
          fs.statSync(path.join(apps, x)).isDirectory(),
        );

      list.forEach((app) => output.push(`- ${app}`));
    } else {
      output.push("No applications found.");
    }

    fs.writeFileSync(
      path.join(this.root, "docs", "ARCHITECTURE.md"),
      output.join("\n"),
      "utf8",
    );

    return true;
  }
}