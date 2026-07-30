import { Module } from '@nestjs/common';
import { RuntimeOsService } from './runtime-os.service';

@Module({
 providers:[RuntimeOsService],
 exports:[RuntimeOsService]
})
export class RuntimeOsModule {}
