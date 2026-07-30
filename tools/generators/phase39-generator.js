const fs = require("fs");
const path = require("path");

const base = path.join(
    process.cwd(),
    "packages",
    "kvr",
    "src",
    "platform-os"
);

function write(file, content) {
    const target = path.join(base, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, content.trim());
    console.log(`✓ ${file}`);
}

const files = {

"platform-os.module.ts": `
import { Module } from '@nestjs/common';
import { PlatformOSService } from './platform-os.service';

@Module({
 providers:[PlatformOSService],
 exports:[PlatformOSService]
})
export class PlatformOSModule {}
`,

"platform-os.service.ts": `
import { Injectable } from '@nestjs/common';

@Injectable()
export class PlatformOSService {

 operate(platform:any){

  return {
   platform:true,
   platform
  };

 }

}
`,

"app.engine.ts": `
export class AppEngine {

 manage(app:any){

  return {
   managed:true,
   app
  };

 }

}
`,

"tenant.engine.ts": `
export class TenantEngine {

 create(tenant:any){

  return {
   created:true,
   tenant
  };

 }

}
`,

"service.engine.ts": `
export class PlatformServiceEngine {

 register(service:any){

  return {
   registered:true,
   service
  };

 }

}
`,

"extension.engine.ts": `
export class ExtensionEngine {

 extend(module:any){

  return {
   extended:true,
   module
  };

 }

}
`,

"gateway.engine.ts": `
export class GatewayEngine {

 route(request:any){

  return {
   routed:true,
   request
  };

 }

}
`,

"index.ts": `
export * from './platform-os.module';
export * from './platform-os.service';
export * from './app.engine';
export * from './tenant.engine';
export * from './service.engine';
export * from './extension.engine';
export * from './gateway.engine';
`
};

Object.entries(files).forEach(([file,content])=>{
 write(file,content);
});

console.log("");
console.log("====================================");
console.log("KVR PHASE 39 GENERATED");
console.log("====================================");
console.log("✓ Platform OS");
console.log("✓ App Engine");
console.log("✓ Tenant Engine");
console.log("✓ Service Engine");
console.log("✓ Extension Engine");
console.log("✓ Gateway Engine");