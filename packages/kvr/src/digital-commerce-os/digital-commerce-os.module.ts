import { Module } from '@nestjs/common';
import { DigitalCommerceOSService } from './digital-commerce-os.service';

@Module({
 providers:[DigitalCommerceOSService],
 exports:[DigitalCommerceOSService]
})
export class DigitalCommerceOSModule {}