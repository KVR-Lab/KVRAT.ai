const fs = require("fs");
const path = require("path");

const base = path.join(
    process.cwd(),
    "packages",
    "kvr",
    "src",
    "integration"
);

function write(file, content) {
    const target = path.join(base, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, content.trim());
    console.log(`✓ ${file}`);
}

const files = {

"integration.module.ts": `
import { Module } from '@nestjs/common';
import { IntegrationService } from './integration.service';

@Module({
 providers:[
  IntegrationService
 ],
 exports:[
  IntegrationService
 ]
})
export class IntegrationModule {}
`,

"integration.service.ts": `
import { Injectable } from '@nestjs/common';

@Injectable()
export class IntegrationService {

 connect(source:any,target:any){

  return {
   connected:true,
   source,
   target
  };

 }

}
`,

"brain.connector.ts": `
export class BrainConnector {

 connect(brain:any){

  return {
   brain,
   status:"connected"
  };

 }

}
`,

"knowledge.connector.ts": `
export class KnowledgeConnector {

 connect(knowledge:any){

  return {
   knowledge,
   status:"connected"
  };

 }

}
`,

"runtime.connector.ts": `
export class RuntimeConnector {

 connect(runtime:any){

  return {
   runtime,
   status:"connected"
  };

 }

}
`,

"agent.connector.ts": `
export class AgentConnector {

 connect(agent:any){

  return {
   agent,
   status:"connected"
  };

 }

}
`,

"tool.connector.ts": `
export class ToolConnector {

 connect(tool:any){

  return {
   tool,
   status:"connected"
  };

 }

}
`,

"system.bridge.ts": `
export class SystemBridge {

 bridge(data:any){

  return {
   bridged:true,
   data
  };

 }

}
`,

"index.ts": `
export * from './integration.module';
export * from './integration.service';
export * from './brain.connector';
export * from './knowledge.connector';
export * from './runtime.connector';
export * from './agent.connector';
export * from './tool.connector';
export * from './system.bridge';
`
};

Object.entries(files).forEach(([file,content])=>{
    write(file,content);
});

console.log("");
console.log("====================================");
console.log("KVR PHASE 12 GENERATED");
console.log("====================================");
console.log("✓ Integration Module");
console.log("✓ Brain Connector");
console.log("✓ Knowledge Connector");
console.log("✓ Runtime Connector");
console.log("✓ Agent Connector");
console.log("✓ Tool Connector");
console.log("✓ System Bridge");