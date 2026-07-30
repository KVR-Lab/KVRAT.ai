import { Injectable } from "@nestjs/common";
import { execSync } from "child_process";

@Injectable()
export class TerminalTool {

  run(command: string) {

    try {

      const output = execSync(command, {
        encoding: "utf8",
        stdio: "pipe"
      });

      return {
        success: true,
        command,
        output
      };

    } catch (e: any) {

      return {
        success: false,
        command,
        error: e.message,
        output: e.stdout?.toString() ?? ""
      };

    }

  }

}