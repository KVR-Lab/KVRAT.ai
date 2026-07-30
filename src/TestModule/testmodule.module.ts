import { Module } from '@nestjs/common';
import { TestModuleService } from './testmodule.service';

@Module({
  providers:[TestModuleService],
  exports:[TestModuleService]
})
export class TestModuleModule{}
