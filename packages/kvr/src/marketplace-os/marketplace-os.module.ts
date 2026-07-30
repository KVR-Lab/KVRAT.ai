import { Module } from '@nestjs/common';
import { MarketplaceOsService } from './marketplace-os.service';

@Module({
 providers:[MarketplaceOsService],
 exports:[MarketplaceOsService]
})
export class MarketplaceOsModule {}
