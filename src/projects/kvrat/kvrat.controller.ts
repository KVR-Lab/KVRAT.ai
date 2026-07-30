import { Controller, Get, Post } from "@nestjs/common";
import { KvratService } from "./kvrat.service";

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