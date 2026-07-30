import { Module } from '@nestjs/common';
import { DeveloperOsService } from './developer-os.service';

@Module({
 providers:[DeveloperOsService],
 exports:[DeveloperOsService]
})
export class DeveloperOsModule {}
