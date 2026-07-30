import { Injectable } from "@nestjs/common";
import { AgentService } from "../agent/agent.service";

@Injectable()
export class AgentManager {

    constructor(
        private readonly agent: AgentService
    ) {}

    execute(input: any) {
        return this.agent.execute(input);
    }

    ask(message: string) {

        return this.agent.execute({

            message,

            build: false

        });

    }

    build() {

        return this.agent.execute({

            message: "Build KVRAT",

            build: true

        });

    }

    shell(command: string) {

        return this.agent.execute({

            message: command,

            shell: command

        });

    }

    status() {

        return {

            agent: "ready",

            mode: "manager"

        };

    }

}