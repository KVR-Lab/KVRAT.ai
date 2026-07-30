import { Module } from '@nestjs/common';
import { FinanceOsService } from './finance-os.service';

@Module({
 providers:[FinanceOsService],
 exports:[FinanceOsService]
})
export class FinanceOsModule {}
