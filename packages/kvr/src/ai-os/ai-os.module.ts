import { Module } from '@nestjs/common';
import { AIOSService } from './ai-os.service';

@Module({
 providers:[AIOSService],
 exports:[AIOSService]
})
export class AIOSModule {}