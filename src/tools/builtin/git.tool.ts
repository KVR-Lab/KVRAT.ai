import { Injectable } from "@nestjs/common";
import { execSync } from "child_process";

@Injectable()
export class GitTool {

  run(command: string) {

    try {

      const output = execSync(
        `git ${command}`,
        {
          encoding: "utf8",
          stdio: "pipe"
        }
      );

      return {
        success: true,
        command,
        output
      };

    } catch (e:any) {

      return {
        success:false,
        command,
        error:e.message,
        output:e.stdout?.toString() ?? ""
      };

    }

  }


  status(){
    return this.run("status");
  }


  branch(){
    return this.run("branch");
  }


  log(){
    return this.run("log --oneline -5");
  }

}