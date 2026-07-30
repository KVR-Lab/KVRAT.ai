import { Module } from '@nestjs/common';
import { ExecutionOSService } from './execution-os.service';

@Module({
 providers:[ExecutionOSService],
 exports:[ExecutionOSService]
})
export class ExecutionOSModule {}