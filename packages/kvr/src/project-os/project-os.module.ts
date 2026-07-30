import { Module } from '@nestjs/common';
import { ProjectOSService } from './project-os.service';

@Module({
 providers:[ProjectOSService],
 exports:[ProjectOSService]
})
export class ProjectOSModule {}