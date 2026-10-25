import { Body, Controller, Get, Post } from '@nestjs/common';
import { RequireExecutionKey } from '../security/execution-access.guard';
import { PlannerService } from './planner.service';

@RequireExecutionKey()
@Controller('planner')
export class PlannerController {
  constructor(
    private readonly planner: PlannerService,
  ) {}

  @Get()
  status() {
    return {
      queue: this.planner.size(),
    };
  }

  @Post("plan")
  plan(@Body() body: any) {
    return this.planner.plan(body.command);
  }
}