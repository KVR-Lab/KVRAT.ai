import { Module } from '@nestjs/common';
import { MetaOSService } from './meta-os.service';

@Module({
 providers:[MetaOSService],
 exports:[MetaOSService]
})
export class MetaOSModule {}