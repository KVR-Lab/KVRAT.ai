import { Module } from '@nestjs/common';
import { EnterpriseOSService } from './enterprise-os.service';

@Module({
 providers:[EnterpriseOSService],
 exports:[EnterpriseOSService]
})
export class EnterpriseOSModule {}