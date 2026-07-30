import { Module } from '@nestjs/common';
import { DigitalService } from './digital.service';

@Module({
 providers:[DigitalService],
 exports:[DigitalService]
})
export class DigitalModule {}