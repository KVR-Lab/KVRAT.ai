import { Module } from '@nestjs/common';
import { QuantumOSService } from './quantum-os.service';

@Module({
 providers:[QuantumOSService],
 exports:[QuantumOSService]
})
export class QuantumOSModule {}