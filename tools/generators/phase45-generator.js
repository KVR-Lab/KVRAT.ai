const fs = require("fs");
const path = require("path");

const base = path.join(
    process.cwd(),
    "packages",
    "kvr",
    "src",
    "logistics-os"
);

function write(file, content) {
    const target = path.join(base, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, content.trim());
    console.log(`✓ ${file}`);
}

const files = {

"logistics-os.module.ts": `
import { Module } from '@nestjs/common';
import { LogisticsOSService } from './logistics-os.service';

@Module({
 providers:[LogisticsOSService],
 exports:[LogisticsOSService]
})
export class LogisticsOSModule {}
`,

"logistics-os.service.ts": `
import { Injectable } from '@nestjs/common';

@Injectable()
export class LogisticsOSService {

 manage(shipment:any){

  return {
   logistics:true,
   shipment
  };

 }

}
`,

"route.engine.ts": `
export class RouteEngine {

 calculate(destination:any){

  return {
   route:true,
   destination
  };

 }

}
`,

"fleet.engine.ts": `
export class FleetEngine {

 manage(vehicles:any){

  return {
   fleet:true,
   vehicles
  };

 }

}
`,

"delivery.engine.ts": `
export class LogisticsDeliveryEngine {

 deliver(order:any){

  return {
   delivered:true,
   order
  };

 }

}
`,

"tracking.engine.ts": `
export class LogisticsTrackingEngine {

 track(item:any){

  return {
   tracked:true,
   item
  };

 }

}
`,

"optimization.engine.ts": `
export class LogisticsOptimizationEngine {

 optimize(data:any){

  return {
   optimized:true,
   data
  };

 }

}
`,

"index.ts": `
export * from './logistics-os.module';
export * from './logistics-os.service';
export * from './route.engine';
export * from './fleet.engine';
export * from './delivery.engine';
export * from './tracking.engine';
export * from './optimization.engine';
`
};

Object.entries(files).forEach(([file,content])=>{
 write(file,content);
});

console.log("");
console.log("====================================");
console.log("KVR PHASE 45 GENERATED");
console.log("====================================");
console.log("✓ Logistics OS");
console.log("✓ Route Engine");
console.log("✓ Fleet Engine");
console.log("✓ Delivery Engine");
console.log("✓ Tracking Engine");
console.log("✓ Optimization Engine");
