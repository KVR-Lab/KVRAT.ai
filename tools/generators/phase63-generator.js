const fs = require("fs");
const path = require("path");

const base = path.join(
  process.cwd(),
  "packages",
  "kvr",
  "src",
  "platform-runtime"
);

function write(file, content) {
  const target = path.join(base, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content.trim());
  console.log(`✓ ${file}`);
}

const files = {

"platform-runtime.module.ts": `
import { Module } from '@nestjs/common';
import { PlatformRuntimeService } from './platform-runtime.service';

@Module({
 providers:[PlatformRuntimeService],
 exports:[PlatformRuntimeService]
})
export class PlatformRuntimeModule {}
`,

"platform-runtime.service.ts": `
import { Injectable } from '@nestjs/common';

@Injectable()
export class PlatformRuntimeService{

 run(runtime:any){

  return{
   runtime:true,
   data:runtime
  };

 }

}
`,

"startup.engine.ts": `
export class StartupEngine{

 start(config:any){

  return{
   started:true,
   data:config
  };

 }

}
`,

"shutdown.engine.ts": `
export class ShutdownEngine{

 stop(state:any){

  return{
   stopped:true,
   data:state
  };

 }

}
`,

"resource-manager.engine.ts": `
export class ResourceManagerEngine{

 allocate(resource:any){

  return{
   allocated:true,
   data:resource
  };

 }

}
`,

"runtime-monitor.engine.ts": `
export class RuntimeMonitorEngine{

 monitor(runtime:any){

  return{
   monitoring:true,
   data:runtime
  };

 }

}
`,

"event-bus.engine.ts": `
export class EventBusEngine{

 publish(event:any){

  return{
   published:true,
   data:event
  };

 }

}
`,

"index.ts": `
export * from './platform-runtime.module';
export * from './platform-runtime.service';
export * from './startup.engine';
export * from './shutdown.engine';
export * from './resource-manager.engine';
export * from './runtime-monitor.engine';
export * from './event-bus.engine';
`
};

Object.entries(files).forEach(([file,content])=>write(file,content));

console.log("");
console.log("====================================");
console.log("KVR PHASE 63 GENERATED");
console.log("====================================");
console.log("✓ Platform Runtime");
console.log("✓ Startup Engine");
console.log("✓ Shutdown Engine");
console.log("✓ Resource Manager");
console.log("✓ Runtime Monitor");
console.log("✓ Event Bus");