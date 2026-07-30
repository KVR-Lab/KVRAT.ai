const fs = require("fs");
const path = require("path");

const base = path.join(
    process.cwd(),
    "packages",
    "kvr",
    "src",
    "project-os"
);

function write(file, content) {
    const target = path.join(base, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, content.trim());
    console.log(`✓ ${file}`);
}

const files = {

"project-os.module.ts": `
import { Module } from '@nestjs/common';
import { ProjectOSService } from './project-os.service';

@Module({
 providers:[ProjectOSService],
 exports:[ProjectOSService]
})
export class ProjectOSModule {}
`,

"project-os.service.ts": `
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectOSService {

 manage(project:any){

  return {
   project:true,
   data:project
  };

 }

}
`,

"planning.engine.ts": `
export class ProjectPlanningEngine {

 create(plan:any){

  return {
   planned:true,
   data:plan
  };

 }

}
`,

"milestone.engine.ts": `
export class MilestoneEngine {

 track(milestone:any){

  return {
   milestone:true,
   data:milestone
  };

 }

}
`,

"task.engine.ts": `
export class ProjectTaskEngine {

 assign(task:any){

  return {
   assigned:true,
   data:task
  };

 }

}
`,

"resource.engine.ts": `
export class ProjectResourceEngine {

 allocate(resource:any){

  return {
   allocated:true,
   data:resource
  };

 }

}
`,

"timeline.engine.ts": `
export class TimelineEngine {

 build(timeline:any){

  return {
   timeline:true,
   data:timeline
  };

 }

}
`,

"index.ts": `
export * from './project-os.module';
export * from './project-os.service';
export * from './planning.engine';
export * from './milestone.engine';
export * from './task.engine';
export * from './resource.engine';
export * from './timeline.engine';
`
};

Object.entries(files).forEach(([file,content])=>write(file,content));

console.log("");
console.log("====================================");
console.log("KVR PHASE 58 GENERATED");
console.log("====================================");
console.log("✓ Project OS");
console.log("✓ Planning Engine");
console.log("✓ Milestone Engine");
console.log("✓ Task Engine");
console.log("✓ Resource Engine");
console.log("✓ Timeline Engine");