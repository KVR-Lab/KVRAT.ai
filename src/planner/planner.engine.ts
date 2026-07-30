import { Injectable } from '@nestjs/common';
import { PlannerService } from './planner.service';



@Injectable()
export class PlannerEngine {



    constructor(
        private readonly planner:PlannerService
    ){}



    build(
        command:any
    )
    {

        return this.planner.createPlan(command);

    }



}
