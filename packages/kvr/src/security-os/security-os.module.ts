import { Module } from '@nestjs/common';
import { SecurityOsService } from './security-os.service';

@Module({
 providers:[SecurityOsService],
 exports:[SecurityOsService]
})
export class SecurityOsModule {}
