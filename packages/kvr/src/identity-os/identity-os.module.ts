import { Module } from '@nestjs/common';
import { IdentityOsService } from './identity-os.service';

@Module({
 providers:[IdentityOsService],
 exports:[IdentityOsService]
})
export class IdentityOsModule {}
