import { Module } from '@nestjs/common';
import { SupplyChainOSService } from './supplychain-os.service';

@Module({
 providers:[SupplyChainOSService],
 exports:[SupplyChainOSService]
})
export class SupplyChainOSModule {}