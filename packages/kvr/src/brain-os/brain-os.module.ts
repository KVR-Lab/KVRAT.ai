import { Module } from '@nestjs/common';
import { BrainOsService } from './brain-os.service';

@Module({
 providers:[BrainOsService],
 exports:[BrainOsService]
})
export class BrainOsModule {}
