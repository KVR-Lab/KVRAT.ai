import { Module } from '@nestjs/common';
import { SingularityOSService } from './singularity-os.service';

@Module({
 providers:[SingularityOSService],
 exports:[SingularityOSService]
})
export class SingularityOSModule {}