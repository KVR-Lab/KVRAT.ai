import { Module } from '@nestjs/common';
import { MasterOSService } from './master-os.service';

@Module({
 providers:[MasterOSService],
 exports:[MasterOSService]
})
export class MasterOSModule {}