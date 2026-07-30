import { execSync } from "child_process";
import { Injectable } from "@nestjs/common";
import { KvratWorkspace } from "./kvrat.workspace";

@Injectable()
export class KvratAdapter {

    private workspace = new KvratWorkspace();

    status() {

        return {
            exists: this.workspace.exists(),
            root: this.workspace.root()
        };

    }

    run(command: string) {

        return execSync(command, {
            cwd: this.workspace.root(),
            encoding: "utf8"
        });

    }

}