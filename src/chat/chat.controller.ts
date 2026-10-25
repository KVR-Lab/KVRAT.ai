import { Body, Controller, Post } from '@nestjs/common';
import { RequireExecutionKey } from '../security/execution-access.guard';
import { ChatService } from './chat.service';

@RequireExecutionKey()
@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
  ) {}

  @Post()
  async send(
    @Body() body: { message: string },
  ) {
    return await this.chatService.send(
      body.message,
    );
  }
}