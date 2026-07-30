const fs = require("fs");
const path = require("path");

const base = path.join(
    process.cwd(),
    "packages",
    "kvr",
    "src",
    "enterprise-os"
);

function write(file, content) {
    const target = path.join(base, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, content.trim());
    console.log(`✓ ${file}`);
}

const files = {

"enterprise-os.module.ts": `
import { Module } from '@nestjs/common';
import { EnterpriseOSService } from './enterprise-os.service';

@Module({
 providers:[EnterpriseOSService],
 exports:[EnterpriseOSService]
})
export class EnterpriseOSModule {}
`,

"enterprise-os.service.ts": `
import { Injectable } from '@nestjs/common';

@Injectable()
export class EnterpriseOSService {

 manage(company:any){

  return {
   enterprise:true,
   company
  };

 }

}
`,

"organization.engine.ts": `
export class OrganizationEngine {

 manage(structure:any){

  return {
   organization:true,
   structure
  };

 }

}
`,

"workflow.engine.ts": `
export class WorkflowEngine {

 automate(flow:any){

  return {
   workflow:true,
   flow
  };

 }

}
`,

"resource.engine.ts": `
export class ResourceEngine {

 allocate(resource:any){

  return {
   allocated:true,
   resource
  };

 }

}
`,

"performance.engine.ts": `
export class PerformanceEngine {

 measure(data:any){

  return {
   performance:true,
   data
  };

 }

}
`,

"strategy.engine.ts": `
export class EnterpriseStrategyEngine {

 plan(goal:any){

  return {
   strategy:true,
   goal
  };

 }

}
`,

"index.ts": `
export * from './enterprise-os.module';
export * from './enterprise-os.service';
export * from './organization.engine';
export * from './workflow.engine';
export * from './resource.engine';
export * from './performance.engine';
export * from './strategy.engine';
`
};

Object.entries(files).forEach(([file,content])=>{
 write(file,content);
});

console.log("");
console.log("====================================");
console.log("KVR PHASE 55 GENERATED");
console.log("====================================");
console.log("✓ Enterprise OS");
console.log("✓ Organization Engine");
console.log("✓ Workflow Engine");
console.log("✓ Resource Engine");
console.log("✓ Performance Engine");
console.log("✓ Strategy Engine");