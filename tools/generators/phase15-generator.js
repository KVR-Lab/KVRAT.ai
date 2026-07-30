const fs = require("fs");
const path = require("path");

const base = path.join(
    process.cwd(),
    "packages",
    "kvr",
    "src",
    "ecosystem"
);

function write(file, content) {
    const target = path.join(base, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, content.trim());
    console.log(`✓ ${file}`);
}

const files = {

"ecosystem.module.ts": `
import { Module } from '@nestjs/common';
import { EcosystemService } from './ecosystem.service';

@Module({
 providers:[
  EcosystemService
 ],
 exports:[
  EcosystemService
 ]
})
export class EcosystemModule {}
`,

"ecosystem.service.ts": `
import { Injectable } from '@nestjs/common';

@Injectable()
export class EcosystemService {

 manage(system:any){

  return {
   managed:true,
   system
  };

 }

}
`,

"component.engine.ts": `
export class ComponentEngine {

 register(component:any){

  return {
   registered:true,
   component
  };

 }

}
`,

"network.engine.ts": `
export class NetworkEngine {

 connect(nodes:any){

  return {
   connected:true,
   nodes
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

"service.engine.ts": `
export class ServiceEngine {

 provide(service:any){

  return {
   provided:true,
   service
  };

 }

}
`,

"communication.engine.ts": `
export class CommunicationEngine {

 send(message:any){

  return {
   sent:true,
   message
  };

 }

}
`,

"registry.engine.ts": `
export class RegistryEngine {

 register(item:any){

  return {
   registered:true,
   item
  };

 }

}
`,

"index.ts": `
export * from './ecosystem.module';
export * from './ecosystem.service';
export * from './component.engine';
export * from './network.engine';
export * from './resource.engine';
export * from './service.engine';
export * from './communication.engine';
export * from './registry.engine';
`
};

Object.entries(files).forEach(([file, content])=>{
    write(file, content);
});

console.log("");
console.log("====================================");
console.log("KVR PHASE 15 GENERATED");
console.log("====================================");
console.log("✓ Ecosystem Module");
console.log("✓ Component Engine");
console.log("✓ Network Engine");
console.log("✓ Resource Engine");
console.log("✓ Service Engine");
console.log("✓ Communication Engine");
console.log("✓ Registry Engine");