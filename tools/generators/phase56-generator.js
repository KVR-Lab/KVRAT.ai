const fs = require("fs");
const path = require("path");

const base = path.join(
    process.cwd(),
    "packages",
    "kvr",
    "src",
    "execution-os"
);

function write(file, content) {
    const target = path.join(base, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, content.trim());
    console.log(`✓ ${file}`);
}

const files = {

"execution-os.module.ts": `
import { Module } from '@nestjs/common';
import { ExecutionOSService } from './execution-os.service';

@Module({
 providers:[ExecutionOSService],
 exports:[ExecutionOSService]
})
export class ExecutionOSModule {}
`,

"execution-os.service.ts": `
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExecutionOSService {

 execute(task:any){

  return {
   executed:true,
   task
  };

 }

}
`,

"planner.engine.ts": `
export class PlannerEngine {

 plan(goal:any){

  return {
   planned:true,
   goal
  };

 }
}
`,

"scheduler.engine.ts": `
export class SchedulerEngine {

 schedule(job:any){

  return {
   scheduled:true,
   job
  };

 }
}
`,

"executor.engine.ts": `
export class ExecutorEngine {

 run(task:any){

  return {
   running:true,
   task
  };

 }
}
`,

"pipeline.engine.ts": `
export class PipelineEngine {

 process(data:any){

  return {
   pipeline:true,
   data
  };

 }
}
`,

"report.engine.ts": `
export class ReportEngine {

 generate(result:any){

  return {
   reported:true,
   result
  };

 }
}
`,

"index.ts": `
export * from './execution-os.module';
export * from './execution-os.service';
export * from './planner.engine';
export * from './scheduler.engine';
export * from './executor.engine';
export * from './pipeline.engine';
export * from './report.engine';
`
};

Object.entries(files).forEach(([file,content])=>{
    write(file,content);
});

console.log("");
console.log("====================================");
console.log("KVR PHASE 56 GENERATED");
console.log("====================================");
console.log("✓ Execution OS");
console.log("✓ Planner Engine");
console.log("✓ Scheduler Engine");
console.log("✓ Executor Engine");
console.log("✓ Pipeline Engine");
console.log("✓ Report Engine");