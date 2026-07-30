const fs = require("fs");
const path = require("path");

const base = path.join(
    process.cwd(),
    "packages",
    "kvr",
    "src",
    "kvrat-runtime"
);

function write(file, content) {
    const target = path.join(base, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, content.trim());
    console.log(`✓ ${file}`);
}

const files = {

"kvrat-runtime.module.ts": `
import { Module } from '@nestjs/common';
import { KVRATRuntimeService } from './kvrat-runtime.service';

@Module({
 providers:[KVRATRuntimeService],
 exports:[KVRATRuntimeService]
})
export class KVRATRuntimeModule {}
`,

"kvrat-runtime.service.ts": `
import { Injectable } from '@nestjs/common';

@Injectable()
export class KVRATRuntimeService {

 run(application:any){

  return {
   running:true,
   application
  };

 }

}
`,

"marketplace.engine.ts": `
export class MarketplaceEngine {

 manage(data:any){

  return {
   marketplace:true,
   data
  };

 }

}
`,

"supplier.engine.ts": `
export class SupplierEngine {

 manage(supplier:any){

  return {
   supplier:true,
   supplier
  };

 }

}
`,

"customer.engine.ts": `
export class CustomerEngine {

 manage(customer:any){

  return {
   customer:true,
   customer
  };

 }

}
`,

"commerce.engine.ts": `
export class CommerceEngine {

 process(order:any){

  return {
   commerce:true,
   order
  };

 }

}
`,

"logistics.engine.ts": `
export class RuntimeLogisticsEngine {

 process(shipment:any){

  return {
   logistics:true,
   shipment
  };

 }

}
`,

"analytics.engine.ts": `
export class RuntimeAnalyticsEngine {

 analyze(data:any){

  return {
   analytics:true,
   data
  };

 }

}
`,

"index.ts": `
export * from './kvrat-runtime.module';
export * from './kvrat-runtime.service';
export * from './marketplace.engine';
export * from './supplier.engine';
export * from './customer.engine';
export * from './commerce.engine';
export * from './logistics.engine';
export * from './analytics.engine';
`
};

Object.entries(files).forEach(([file,content])=>{
    write(file,content);
});

console.log("");
console.log("====================================");
console.log("KVR PHASE 48 GENERATED");
console.log("====================================");
console.log("✓ KVRAT Runtime");
console.log("✓ Marketplace Engine");
console.log("✓ Supplier Engine");
console.log("✓ Customer Engine");
console.log("✓ Commerce Engine");
console.log("✓ Logistics Engine");
console.log("✓ Analytics Engine");