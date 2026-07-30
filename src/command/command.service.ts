import { Injectable } from '@nestjs/common';
import { execSync } from 'child_process';

@Injectable()
export class CommandService {
  private readonly workspace = 'D:\\KVRAT.ai';

  execute(command: string) {
    try {
      const output = execSync(command, {
        cwd: this.workspace,
        encoding: 'utf8',
        shell: 'powershell.exe',
      });

      return {
        success: true,
        command,
        output,
        timestamp: new Date().toISOString(),
      };
    } catch (error: any) {
      return {
        success: false,
        command,
        output: error?.stdout?.toString() ?? '',
        error: error?.stderr?.toString() ?? error.message,
        timestamp: new Date().toISOString(),
      };
    }
  }

  build() {
    return this.execute('pnpm build');
  }

  dev() {
    return this.execute('pnpm dev');
  }

  install() {
    return this.execute('pnpm install');
  }

  start() {
    return this.execute('pnpm start');
  }

  lint() {
    return this.execute('pnpm lint');
  }

  test() {
    return this.execute('pnpm test');
  }

  gitStatus() {
    return this.execute('git status');
  }

  gitPull() {
    return this.execute('git pull');
  }

  gitFetch() {
    return this.execute('git fetch');
  }

  gitLog() {
    return this.execute('git log --oneline -10');
  }

  powershell(command: string) {
    return this.execute(command);
  }
}