import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class FileTool {

  read(file: string) {
    return fs.readFileSync(file, "utf8");
  }

  write(file: string, content: string) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, content, "utf8");

    return {
      success: true,
      file,
    };
  }

  append(file: string, content: string) {
    fs.appendFileSync(file, content, "utf8");

    return {
      success: true,
      file,
    };
  }

  exists(file: string) {
    return fs.existsSync(file);
  }

  mkdir(dir: string) {
    fs.mkdirSync(dir, { recursive: true });

    return {
      success: true,
      dir,
    };
  }

  delete(file: string) {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }

    return {
      success: true,
      file,
    };
  }

  list(dir: string) {
    return fs.readdirSync(dir);
  }

}