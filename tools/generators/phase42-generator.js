const fs = require("fs");
const path = require("path");

const base = path.join(
    process.cwd(),
    "packages",
    "kvr",
    "src",
    "economy-os"
);

function write(file, content) {
    const target = path.join(base, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, content.trim());
    console.log(`✓ ${file}`);
}

const files = {

"economy-os.module.ts": `
import { Module } from '@nestjs/common';
import { EconomyOSService } from './economy-os.service';

@Module({
 providers:[EconomyOSService],
 exports:[EconomyOSService]
})
export class EconomyOSModule {}
`,

"economy-os.service.ts": `
import { Injectable } from '@nestjs/common';

@Injectable()
export class EconomyOSService {

 manage(data:any){

  return {
   economy:true,
   data
  };

 }

}
`,

"value.engine.ts": `
export class ValueEngine {

 calculate(data:any){

  return {
   value:true,
   data
  };

 }

}
`,

"market.engine.ts": `
export class MarketEngine {

 analyze(market:any){

  return {
   market:true,
   market
  };

 }

}
`,

"currency.engine.ts": `
export class CurrencyEngine {

 process(transaction:any){

  return {
   processed:true,
   transaction
  };

 }

}
`,

"growth.engine.ts": `
export class GrowthEngine {

 measure(data:any){

  return {
   growth:true,
   data
  };

 }

}
`,

"exchange.engine.ts": `
export class ExchangeEngine {

 exchange(data:any){

  return {
   exchanged:true,
   data
  };

 }

}
`,

"index.ts": `
export * from './economy-os.module';
export * from './economy-os.service';
export * from './value.engine';
export * from './market.engine';
export * from './currency.engine';
export * from './growth.engine';
export * from './exchange.engine';
`
};

Object.entries(files).forEach(([file,content])=>{
 write(file,content);
});

console.log("");
console.log("====================================");
console.log("KVR PHASE 42 GENERATED");
console.log("====================================");
console.log("✓ Economy OS");
console.log("✓ Value Engine");
console.log("✓ Market Engine");
console.log("✓ Currency Engine");
console.log("✓ Growth Engine");
console.log("✓ Exchange Engine");
