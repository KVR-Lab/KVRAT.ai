import { Module } from '@nestjs/common';
import { NeuralOSService } from './neural-os.service';

@Module({
 providers:[NeuralOSService],
 exports:[NeuralOSService]
})
export class NeuralOSModule {}