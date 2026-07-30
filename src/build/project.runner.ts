import { Injectable } from "@nestjs/common";
import { ProjectSpecService } from "../build/project-spec.service";
import { PlannerService } from "../planner";
import { BrainService } from "../brain";
import { ExecutorService } from "../executor";

@Injectable()
export class ProjectRunner {

    constructor(
        private readonly spec: ProjectSpecService,
        private readonly planner: PlannerService,
        private readonly brain: BrainService,
        private readonly executor: ExecutorService
    ){}

    async run(file:string){

        const project = this.spec.load(file);

        const plan = this.planner.plan(project);

        const decision = await this.brain.think(plan);

        return await this.executor.execute(decision);

    }

}
