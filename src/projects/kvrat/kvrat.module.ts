import { Module } from "@nestjs/common";

import { KvratController } from "./kvrat.controller";
import { KvratService } from "./kvrat.service";
import { KvratAdapter } from "./kvrat.adapter";

import { KvratReport } from "./report/kvrat.report";
import { KvratReportWriter } from "./report/kvrat.report.writer";

@Module({
  controllers: [
    KvratController,
  ],
  providers: [
    KvratService,
    KvratAdapter,
    KvratReport,
    KvratReportWriter,
  ],
  exports: [
    KvratService,
  ],
})
export class KvratModule {}