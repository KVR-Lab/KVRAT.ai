import { Module } from '@nestjs/common';
import { SupplyChainOsService } from './supply-chain-os.service';

@Module({
 providers:[SupplyChainOsService],
 exports:[SupplyChainOsService]
})
export class SupplyChainOsModule {}
