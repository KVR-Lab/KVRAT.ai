import { Injectable } from '@nestjs/common';
import { AgentPipeline } from './agent.pipeline';

@Injectable()
export class AgentService {
  constructor(
    private readonly pipeline: AgentPipeline,
  ) {}

  async execute(task: any) {
    return this.pipeline.execute(task);
  }
}