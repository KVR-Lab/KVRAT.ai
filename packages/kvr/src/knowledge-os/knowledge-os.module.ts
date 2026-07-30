import { Module } from '@nestjs/common';
import { KnowledgeOsService } from './knowledge-os.service';

@Module({
 providers:[KnowledgeOsService],
 exports:[KnowledgeOsService]
})
export class KnowledgeOsModule {}
