import { Injectable } from '@nestjs/common';

import { MemoryService } from '../memory/memory.service';
import { HybridBrainService } from '../hybrid/hybrid-brain.service';
import { SystemBrainService } from '../system-brain.service';

@Injectable()
export class BrainOrchestratorService {
  constructor(
    private readonly memory: MemoryService,
    private readonly hybrid: HybridBrainService,
    private readonly system: SystemBrainService,
  ) {}

  async handleMessage(message: string) {
    const memoryId = this.memory.save({
      input: message,
      agentsUsed: ['system'],
      createdAt: Date.now(),
    });

    const hybridResult = await this.hybrid.process({
      idea: message,
    });

    const systemResult = await this.system.process(message);

    const response = {
      hybrid: hybridResult,
      system: systemResult,
    };

    this.memory.save({
      parentId: memoryId,
      input: message,
      response,
      agentsUsed: ['system'],
      createdAt: Date.now(),
    });

    return {
      success: true,
      brain: 'system',
      response,
    };
  }
}