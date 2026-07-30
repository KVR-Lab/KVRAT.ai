import { Module } from '@nestjs/common';
import { GovernanceOSService } from './governance-os.service';

@Module({
 providers:[GovernanceOSService],
 exports:[GovernanceOSService]
})
export class GovernanceOSModule {}