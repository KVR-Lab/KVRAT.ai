import { Module } from '@nestjs/common';
import { EconomyOSService } from './economy-os.service';

@Module({
 providers:[EconomyOSService],
 exports:[EconomyOSService]
})
export class EconomyOSModule {}