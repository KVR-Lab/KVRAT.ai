import * as fs from "fs";
import * as path from "path";
import * as yaml from "yaml";

export class KnowledgeLoader {

  private cache: Record<string, any> = {};

  load() {

    const root = "D:/kvr-core/knowledge/kvrat";

    const files = fs.readdirSync(root);

    for (const file of files) {

      const full = path.join(root, file);

      const text = fs.readFileSync(full, "utf8");

      if (file.endsWith(".yaml")) {

        this.cache[file] = yaml.parse(text);

      } else if (file.endsWith(".json")) {

        this.cache[file] = JSON.parse(text);

      } else {

        this.cache[file] = text;

      }

    }

    return this.cache;

  }

  get(name:string){

    return this.cache[name];

  }

}