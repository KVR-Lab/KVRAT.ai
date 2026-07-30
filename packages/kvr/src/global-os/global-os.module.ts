import { Module } from '@nestjs/common';
import { GlobalOSService } from './global-os.service';

@Module({
 providers:[GlobalOSService],
 exports:[GlobalOSService]
})
export class GlobalOSModule {}