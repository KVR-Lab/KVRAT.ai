import * as fs from "fs";
import * as path from "path";
import { Injectable } from "@nestjs/common";
import { KvratReport } from "./kvrat.report";

@Injectable()
export class KvratReportWriter {

  private readonly target = "D:\\KVRAT.ai\\docs";

  constructor(
    private readonly report: KvratReport
  ) {}


  generateFiles() {

    const data = this.report.generate();

    if (!fs.existsSync(this.target)) {
      fs.mkdirSync(this.target, {
        recursive: true
      });
    }


    const content = `# KVRAT.ai Project Status

Generated: ${data.generatedAt}

## Progress

${data.progress}

## Completed

${data.completed
  .map(item => `- ${item}`)
  .join("\n")}


## Missing

${data.missing
  .map(item => `- ${item}`)
  .join("\n")}


## Applications

${data.apps
  .map(item => `- ${item}`)
  .join("\n")}


## Checks

\`\`\`json
${JSON.stringify(data.checks, null, 2)}
\`\`\`
`;


    fs.writeFileSync(
      path.join(
        this.target,
        "PROJECT_STATUS.md"
      ),
      content,
      "utf8"
    );


    return {
      success: true,
      file:
        "D:\\KVRAT.ai\\docs\\PROJECT_STATUS.md"
    };

  }

}