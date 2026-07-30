const fs = require("fs");
const path = require("path");

const base = path.join(
    process.cwd(),
    "packages",
    "kvr",
    "src",
    "deployment"
);

function write(file, content) {
    const target = path.join(base, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, content.trim());
    console.log(`✓ ${file}`);
}

const files = {

"deployment.module.ts": `
import { Module } from '@nestjs/common';
import { DeploymentService } from './deployment.service';

@Module({
 providers:[
  DeploymentService
 ],
 exports:[
  DeploymentService
 ]
})
export class DeploymentModule {}
`,

"deployment.service.ts": `
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeploymentService {

 deploy(system:any){

  return {
   deployed:true,
   system
  };

 }

}
`,

"release.engine.ts": `
export class ReleaseEngine {

 release(version:any){

  return {
   released:true,
   version
  };

 }

}
`,

"environment.engine.ts": `
export class EnvironmentEngine {

 check(environment:any){

  return {
   ready:true,
   environment
  };

 }

}
`,

"configuration.engine.ts": `
export class ConfigurationEngine {

 load(config:any){

  return {
   loaded:true,
   config
  };

 }

}
`,

"scaling.engine.ts": `
export class ScalingEngine {

 scale(resources:any){

  return {
   scaled:true,
   resources
  };

 }

}
`,

"monitoring.engine.ts": `
export class MonitoringEngine {

 monitor(system:any){

  return {
   status:"running",
   system
  };

 }

}
`,

"rollback.engine.ts": `
export class RollbackEngine {

 rollback(version:any){

  return {
   rollback:true,
   version
  };

 }

}
`,

"index.ts": `
export * from './deployment.module';
export * from './deployment.service';
export * from './release.engine';
export * from './environment.engine';
export * from './configuration.engine';
export * from './scaling.engine';
export * from './monitoring.engine';
export * from './rollback.engine';
`
};

Object.entries(files).forEach(([file, content])=>{
    write(file, content);
});

console.log("");
console.log("====================================");
console.log("KVR PHASE 16 GENERATED");
console.log("====================================");
console.log("✓ Deployment Module");
console.log("✓ Release Engine");
console.log("✓ Environment Engine");
console.log("✓ Configuration Engine");
console.log("✓ Scaling Engine");
console.log("✓ Monitoring Engine");
console.log("✓ Rollback Engine");