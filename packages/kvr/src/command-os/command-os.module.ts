import { Module } from '@nestjs/common';
import { CommandOSService } from './command-os.service';

@Module({
 providers:[CommandOSService],
 exports:[CommandOSService]
})
export class CommandOSModule {}