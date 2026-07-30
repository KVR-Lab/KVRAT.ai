import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly ai: AiService) {}

  @Post("ask")
  ask(@Body() body: { prompt: string }) {
    return this.ai.ask(body.prompt);
  }

  @Post("execute")
  execute(@Body() body: { command: string }) {
    return this.ai.execute(body.command);
  }
}