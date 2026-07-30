import { Module } from '@nestjs/common';
import { CommunicationOsService } from './communication-os.service';

@Module({
 providers:[CommunicationOsService],
 exports:[CommunicationOsService]
})
export class CommunicationOsModule {}
