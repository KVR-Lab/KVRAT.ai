import { Controller, Get, Post } from "@nestjs/common";
import { RequireExecutionKey } from '../../security/execution-access.guard';
import { KvratService } from "./kvrat.service";

@RequireExecutionKey()
@Controller("projects/kvrat")
export class KvratController {

  constructor(
    private readonly service: KvratService,
  ) {}

  @Get("status")
  status() {
    return this.service.status();
  }

  @Get("docs")
  docs() {
    return this.service.writeReport();
  }

  @Post("docs/write")
  writeDocs() {
    return this.service.writeReport();
  }

}