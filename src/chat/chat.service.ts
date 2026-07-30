import { Injectable } from '@nestjs/common';

import { ChatStore } from './chat.store';
import { EventBus } from '../events/bus/event.bus';
import { CommandParser } from '../command/command.parser';
import { AgentService } from '../agent/agent.service';
import { MemoryService } from '../memory/memory.service';

@Injectable()
export class ChatService {
  constructor(
    private readonly store: ChatStore,
    private readonly eventBus: EventBus,
    private readonly parser: CommandParser,
    private readonly agent: AgentService,
  ) {}

  async send(
    message: string,
    sessionId: string = 'default',
  ) {
    this.store.add(sessionId, message);

    const command = this.parser.parse(message);

    this.eventBus.emit({
      name: 'chat.message',
      payload: command,
      createdAt: new Date(),
    });

    const task: any = {
      message,
      command,
      build: false,
      shell: null,
    };

    if (message.startsWith('/build')) {
      task.build = true;
    }

    if (message.startsWith('/ps ')) {
      task.shell = message.substring(4).trim();
    }

    if (message.startsWith('/dev')) {
      task.command = 'dev';
    }

    if (message.startsWith('/install')) {
      task.command = 'install';
    }

    if (message.startsWith('/status')) {
      task.command = 'status';
    }

    const response = await this.agent.execute(task);

    return {
      ok: true,
      role: 'KVR',
      sessionId,
      response,
      history: this.store.get(sessionId),
      timestamp: new Date().toISOString(),
    };
  }
}