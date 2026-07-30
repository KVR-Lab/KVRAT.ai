import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { MemoryModule } from '../memory/memory.module';

@Module({
  imports:[
    MemoryModule
  ],
  controllers:[
    ChatController
  ],
  providers:[
    ChatService
  ]
})
export class ChatModule {}