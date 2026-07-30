import { Module } from '@nestjs/common';
import { MissionControlOsService } from './mission-control-os.service';

@Module({
 providers:[MissionControlOsService],
 exports:[MissionControlOsService]
})
export class MissionControlOsModule {}
