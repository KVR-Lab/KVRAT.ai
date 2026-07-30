import { Module } from '@nestjs/common';
import { DigitalIdentityOSService } from './digital-identity-os.service';

@Module({
 providers:[DigitalIdentityOSService],
 exports:[DigitalIdentityOSService]
})
export class DigitalIdentityOSModule {}