const fs = require("fs");
const path = require("path");

const base = path.join(
    process.cwd(),
    "packages",
    "kvr",
    "src",
    "supplychain-os"
);

function write(file, content) {
    const target = path.join(base, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, content.trim());
    console.log(`✓ ${file}`);
}

const files = {

"supplychain-os.module.ts": `
import { Module } from '@nestjs/common';
import { SupplyChainOSService } from './supplychain-os.service';

@Module({
 providers:[SupplyChainOSService],
 exports:[SupplyChainOSService]
})
export class SupplyChainOSModule {}
`,

"supplychain-os.service.ts": `
import { Injectable } from '@nestjs/common';

@Injectable()
export class SupplyChainOSService {

 manage(chain:any){

  return {
   supplyChain:true,
   chain
  };

 }

}
`,

"inventory.engine.ts": `
export class InventoryEngine {

 track(items:any){

  return {
   inventory:true,
   items
  };

 }

}
`,

"warehouse.engine.ts": `
export class WarehouseEngine {

 manage(location:any){

  return {
   warehouse:true,
   location
  };

 }

}
`,

"sourcing.engine.ts": `
export class SourcingEngine {

 source(data:any){

  return {
   sourced:true,
   data
  };

 }

}
`,

"delivery.engine.ts": `
export class DeliveryEngine {

 deliver(order:any){

  return {
   delivered:true,
   order
  };

 }

}
`,

"tracking.engine.ts": `
export class TrackingEngine {

 track(shipment:any){

  return {
   tracking:true,
   shipment
  };

 }

}
`,

"index.ts": `
export * from './supplychain-os.module';
export * from './supplychain-os.service';
export * from './inventory.engine';
export * from './warehouse.engine';
export * from './sourcing.engine';
export * from './delivery.engine';
export * from './tracking.engine';
`
};

Object.entries(files).forEach(([file,content])=>{
 write(file,content);
});

console.log("");
console.log("====================================");
console.log("KVR PHASE 43 GENERATED");
console.log("====================================");
console.log("✓ Supply Chain OS");
console.log("✓ Inventory Engine");
console.log("✓ Warehouse Engine");
console.log("✓ Sourcing Engine");
console.log("✓ Delivery Engine");
console.log("✓ Tracking Engine");