import { Injectable } from '@nestjs/common';
import { RuntimeService } from '../runtime/runtime.service';

@Injectable()
export class RuntimeManager {
  constructor(
    private readonly runtime: RuntimeService,
  ) {}

  start() {
    return {
      success: true,
      runtime: this.runtime.status(),
    };
  }

  status() {
    return {
      success: true,
      state: 'running',
      runtime: this.runtime.status(),
      timestamp: new Date().toISOString(),
    };
  }

  health() {
    return {
      ok: true,
      runtime: this.runtime.status(),
    };
  }
}