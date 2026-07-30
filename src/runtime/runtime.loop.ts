import { Injectable } from "@nestjs/common";

import { PlannerService } from "../planner";
import { ExecutorService } from "../executor";
import { OrchestratorService } from "../orchestrator/orchestrator.service";
import { Task } from "../contracts/task.contract";

@Injectable()
export class RuntimeLoop {

    private running = false;

    constructor(
        private readonly planner: PlannerService,
        private readonly orchestrator: OrchestratorService,
        private readonly executor: ExecutorService
    ) {}

    async start() {

        this.running = true;

        while (this.running) {

            const plan = await this.planner.next();

            if (plan) {

                const task: Task = {
                    id: Date.now().toString(),
                    type: "project",
                    payload: plan
                };

                const result = await this.orchestrator.dispatch(task);

                await this.executor.execute(result);

            }

            await new Promise(resolve => setTimeout(resolve, 500));

        }

    }

    stop() {
        this.running = false;
    }

}