import { Injectable } from '@nestjs/common';
import { BuildService } from '../build/build.service';

@Injectable()
export class ExecutorService {
  constructor(
    private readonly build: BuildService,
  ) {}

  status() {
    return {
      service: 'executor',
      ready: true,
    };
  }

  async execute(plan: any) {
    if (!plan) {
      return null;
    }

    const results: any[] = [];

    if (Array.isArray(plan.steps)) {
      for (const step of plan.steps) {
        switch (step.action) {
          case 'write':
            if (step.file) {
              await this.build.write(
                step.file,
                step.content ?? '',
              );
            }

            results.push({
              step: step.action,
              status: 'done',
            });
            break;

          case 'analyze':
          case 'execute':
            results.push({
              step: step.action,
              status: 'done',
            });
            break;

          default:
            results.push({
              step: step.action,
              status: 'skipped',
            });
        }
      }
    }

    return {
      success: true,
      executed: results.length,
      results,
      plan,
    };
  }
}