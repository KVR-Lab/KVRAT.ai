import { Injectable } from "@nestjs/common";
import * as fs from "fs";

import { KvratIndexer } from "./indexer";

import { KvratReport } from "./report/kvrat.report";
import { KvratReportWriter } from "./report/kvrat.report.writer";

import { DocumentationEngine } from "./documentation/documentation.engine";

@Injectable()
export class KvratService {

  private readonly root = "D:\\KVRAT.ai";

  private readonly indexer = new KvratIndexer();

  private readonly docsEngine = new DocumentationEngine(this.root);

  constructor(
    private readonly reportEngine: KvratReport,
    private readonly reportWriter: KvratReportWriter,
  ) {}

  status() {
    return {
      exists: fs.existsSync(this.root),
      root: this.root,
    };
  }

  index() {
    return this.indexer.scan();
  }

  report() {
    return this.reportEngine.generate();
  }

  writeReport() {
    return this.reportWriter.generateFiles();
  }

  docs() {
    return this.docsEngine.generate();
  }

  writeDocs() {
    return this.docsEngine.generate();
  }

  install() {
    return {
      success: true,
      project: "KVRAT.ai",
    };
  }

  build() {
    return {
      success: true,
      command: "pnpm build",
    };
  }

  dev() {
    return {
      success: true,
      command: "pnpm dev",
    };
  }

  command(command: string) {
    return {
      success: true,
      executed: command,
    };
  }
}