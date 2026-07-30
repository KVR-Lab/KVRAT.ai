const fs = require("fs");
const path = require("path");

const base = path.join(
    process.cwd(),
    "packages",
    "kvr",
    "src",
    "communication-os"
);

function write(file, content) {
    const target = path.join(base, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, content.trim());
    console.log(`✓ ${file}`);
}

const files = {

"communication-os.module.ts": `
import { Module } from '@nestjs/common';
import { CommunicationOSService } from './communication-os.service';

@Module({
 providers:[CommunicationOSService],
 exports:[CommunicationOSService]
})
export class CommunicationOSModule {}
`,

"communication-os.service.ts": `
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommunicationOSService {

 communicate(message:any){

  return {
   delivered:true,
   message
  };

 }

}
`,

"message.engine.ts": `
export class MessageEngine {

 send(message:any){

  return {
   sent:true,
   message
  };

 }

}
`,

"event.engine.ts": `
export class CommunicationEventEngine {

 publish(event:any){

  return {
   published:true,
   event
  };

 }

}
`,

"notification.engine.ts": `
export class NotificationEngine {

 notify(data:any){

  return {
   notified:true,
   data
  };

 }

}
`,

"channel.engine.ts": `
export class ChannelEngine {

 route(channel:any){

  return {
   channel,
   routed:true
  };

 }

}
`,

"sync.engine.ts": `
export class SyncEngine {

 sync(data:any){

  return {
   synced:true,
   data
  };

 }

}
`,

"index.ts": `
export * from './communication-os.module';
export * from './communication-os.service';
export * from './message.engine';
export * from './event.engine';
export * from './notification.engine';
export * from './channel.engine';
export * from './sync.engine';
`
};

Object.entries(files).forEach(([file,content])=>{
    write(file,content);
});

console.log("");
console.log("====================================");
console.log("KVR PHASE 27 GENERATED");
console.log("====================================");
console.log("✓ Communication OS");
console.log("✓ Message Engine");
console.log("✓ Event Engine");
console.log("✓ Notification Engine");
console.log("✓ Channel Engine");
console.log("✓ Sync Engine");