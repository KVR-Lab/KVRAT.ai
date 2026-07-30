import { Injectable } from '@nestjs/common';
import { CommandService } from '../command/command.service';

@Injectable()
export class CommandCenter {
  constructor(
    private readonly commands: CommandService,
  ) {}

  overview() {
    return {
      system: 'KVR-Core',
      target: 'KVRAT.ai',
      status: 'online',
      workspace: 'D:\\KVRAT.ai',
      timestamp: new Date().toISOString(),
    };
  }

  build() {
    return this.commands.build();
  }

  dev() {
    return this.commands.dev();
  }

  install() {
    return this.commands.install();
  }

  start() {
    return this.commands.start();
  }

  lint() {
    return this.commands.lint();
  }

  test() {
    return this.commands.test();
  }

  gitStatus() {
    return this.commands.gitStatus();
  }

  gitPull() {
    return this.commands.gitPull();
  }

  gitFetch() {
    return this.commands.gitFetch();
  }

  gitLog() {
    return this.commands.gitLog();
  }

  shell(command: string) {
    return this.commands.powershell(command);
  }
}