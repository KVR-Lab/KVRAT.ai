import { Module } from '@nestjs/common';
import { KVRATRuntimeService } from './kvrat-runtime.service';

@Module({
 providers:[KVRATRuntimeService],
 exports:[KVRATRuntimeService]
})
export class KVRATRuntimeModule {}