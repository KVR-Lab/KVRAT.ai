import { Module } from '@nestjs/common';
import { CloudOsService } from './cloud-os.service';

@Module({
 providers:[CloudOsService],
 exports:[CloudOsService]
})
export class CloudOsModule {}
