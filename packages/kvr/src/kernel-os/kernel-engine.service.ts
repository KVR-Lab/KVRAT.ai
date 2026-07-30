import { Injectable, Logger } from '@nestjs/common';

export interface KVRModule {
  name: string;
  dependencies?: string[];

  onLoad?(): Promise<void>;
  onStart?(): Promise<void>;
  onStop?(): Promise<void>;
}

@Injectable()
export class KernelEngineService {
  private readonly logger = new Logger(KernelEngineService.name);

  private readonly modules = new Map<string, KVRModule>();

  register(module: KVRModule) {
    this.modules.set(module.name, module);
    this.logger.log(`Registered ${module.name}`);
  }

  async boot() {
    this.logger.log('Booting KVR Kernel...');

    for (const module of this.modules.values()) {
      if (module.onLoad) {
        await module.onLoad();
      }
    }

    for (const module of this.modules.values()) {
      if (module.onStart) {
        await module.onStart();
      }
    }

    this.logger.log(`Kernel started (${this.modules.size} modules)`);
  }

  async shutdown() {
    for (const module of [...this.modules.values()].reverse()) {
      if (module.onStop) {
        await module.onStop();
      }
    }

    this.logger.log('Kernel stopped');
  }

  getModules() {
    return [...this.modules.keys()];
  }
}