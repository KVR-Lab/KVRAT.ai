import { Module } from '@nestjs/common';
import { CommerceOsService } from './commerce-os.service';

@Module({
 providers:[CommerceOsService],
 exports:[CommerceOsService]
})
export class CommerceOsModule {}
