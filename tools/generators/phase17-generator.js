const fs = require("fs");
const path = require("path");

const base = path.join(
    process.cwd(),
    "packages",
    "kvr",
    "src",
    "marketplace"
);

function write(file, content) {
    const target = path.join(base, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, content.trim());
    console.log(`✓ ${file}`);
}

const files = {

"marketplace.module.ts": `
import { Module } from '@nestjs/common';
import { MarketplaceService } from './marketplace.service';

@Module({
 providers:[
  MarketplaceService
 ],
 exports:[
  MarketplaceService
 ]
})
export class MarketplaceModule {}
`,

"marketplace.service.ts": `
import { Injectable } from '@nestjs/common';

@Injectable()
export class MarketplaceService {

 manage(product:any){

  return {
   marketplace:true,
   product
  };

 }

}
`,

"product.engine.ts": `
export class ProductEngine {

 create(product:any){

  return {
   created:true,
   product
  };

 }

}
`,

"supplier.engine.ts": `
export class SupplierEngine {

 register(supplier:any){

  return {
   registered:true,
   supplier
  };

 }

}
`,

"order.engine.ts": `
export class OrderEngine {

 process(order:any){

  return {
   processed:true,
   order
  };

 }

}
`,

"pricing.engine.ts": `
export class PricingEngine {

 calculate(item:any){

  return {
   price:item
  };

 }

}
`,

"commission.engine.ts": `
export class CommissionEngine {

 calculate(sale:any){

  return {
   commission:true,
   sale
  };

 }

}
`,

"catalog.engine.ts": `
export class CatalogEngine {

 manage(products:any){

  return {
   catalog:products
  };

 }

}
`,

"index.ts": `
export * from './marketplace.module';
export * from './marketplace.service';
export * from './product.engine';
export * from './supplier.engine';
export * from './order.engine';
export * from './pricing.engine';
export * from './commission.engine';
export * from './catalog.engine';
`
};

Object.entries(files).forEach(([file, content])=>{
    write(file, content);
});

console.log("");
console.log("====================================");
console.log("KVR PHASE 17 GENERATED");
console.log("====================================");
console.log("✓ Marketplace Module");
console.log("✓ Product Engine");
console.log("✓ Supplier Engine");
console.log("✓ Order Engine");
console.log("✓ Pricing Engine");
console.log("✓ Commission Engine");
console.log("✓ Catalog Engine");