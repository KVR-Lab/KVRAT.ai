import * as fs from "fs";
import * as path from "path";

export class KvratIndexer {

  readonly root = "D:\\KVRAT.ai";

  scan(dir: string = this.root) {

    let files = 0;
    let directories = 0;

    const apps: string[] = [];
    const packages: string[] = [];

    const walk = (current: string) => {

      if (!fs.existsSync(current)) return;

      for (const item of fs.readdirSync(current)) {

        const full = path.join(current, item);
        const stat = fs.statSync(full);

        if (stat.isDirectory()) {

          directories++;

          if (
            path.dirname(full) === path.join(this.root, "apps")
          ) {
            apps.push(item);
          }

          if (
            path.dirname(full) === path.join(this.root, "packages")
          ) {
            packages.push(item);
          }

          if (
            item === "node_modules" ||
            item === ".git" ||
            item === ".next" ||
            item === "dist" ||
            item === "build"
          ) {
            continue;
          }

          walk(full);

        } else {

          files++;

        }

      }

    };

    walk(dir);

    return {
      project: "KVRAT.ai",
      root: this.root,
      files,
      directories,
      sourceFiles: files,
      apps,
      packages,
      lastIndexed: new Date().toISOString()
    };

  }

}
