import { Module } from '@nestjs/common';
import { IntegrationOsService } from './integration-os.service';

@Module({
 providers:[IntegrationOsService],
 exports:[IntegrationOsService]
})
export class IntegrationOsModule {}
