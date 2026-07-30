import { Injectable } from '@nestjs/common';

@Injectable()
export class PlannerService {
  private readonly queue: any[] = [];

  async next() {
    if (this.queue.length === 0) {
      return null;
    }

    return this.queue.shift();
  }

  plan(command: any) {
    const plan = this.createPlan(command);
    this.queue.push(plan);
    return plan;
  }

  createPlan(command: any) {
    return {
      id: Date.now().toString(),
      command,
      status: 'pending',
      currentStep: 0,
      steps: [
        {
          id: 'analyze',
          action: 'analyze',
          status: 'pending',
        },
        {
          id: 'execute',
          action: 'execute',
          status: 'pending',
        },
      ],
      createdAt: new Date(),
    };
  }

  clear() {
    this.queue.length = 0;
  }

  size() {
    return this.queue.length;
  }
}