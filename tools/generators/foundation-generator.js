#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const cp = require("child_process");

const ROOT = process.cwd();

const SRC = path.join(
    ROOT,
    "packages",
    "kvr",
    "src"
);

function ensure(dir){
    fs.mkdirSync(dir,{recursive:true});
}

function write(file,content){
    ensure(path.dirname(file));
    fs.writeFileSync(
        file,
        content.trimStart(),
        "utf8"
    );
    console.log(
        "✓",
        path.relative(ROOT,file)
    );
}

function exists(file){
    return fs.existsSync(file);
}

function pascal(name){

    return name
        .split("-")
        .map(v=>v.charAt(0).toUpperCase()+v.slice(1))
        .join("");

}

function createModule(os){

    const cls = pascal(os);

    write(
        path.join(
            SRC,
            os,
            `${os}.module.ts`
        ),

`
import { Module } from '@nestjs/common';
import { ${cls}Service } from './${os}.service';

@Module({
 providers:[${cls}Service],
 exports:[${cls}Service]
})
export class ${cls}Module {}
`
    );

}

function createService(os){

    const cls = pascal(os);

    write(
        path.join(
            SRC,
            os,
            `${os}.service.ts`
        ),

`
import { Injectable } from '@nestjs/common';

@Injectable()
export class ${cls}Service{

 execute(input:any){

  return{

   ok:true,
   system:"${os}",
   data:input

  };

 }

}
`
    );

}
function createEngine(os,engine){

    const cls = pascal(engine);

    write(
        path.join(
            SRC,
            os,
            `${engine}.engine.ts`
        ),

`
export class ${cls}Engine{

 execute(input:any){

  return{

   engine:"${engine}",
   success:true,
   data:input

  };

 }

}
`
    );

}

function createIndex(os,engines){

    const exports=[];

    exports.push(
`export * from './${os}.module';`
    );

    exports.push(
`export * from './${os}.service';`
    );

    engines.forEach(engine=>{

        exports.push(
`export * from './${engine}.engine';`
        );

    });

    write(

        path.join(
            SRC,
            os,
            "index.ts"
        ),

        exports.join("\n")

    );

}

const SYSTEMS = [
{
    name:"brain-os",
    engines:[
        "reasoning",
        "planning",
        "memory",
        "decision",
        "learning"
    ]
},

{
    name:"knowledge-os",
    engines:[
        "graph",
        "search",
        "context",
        "index",
        "storage"
    ]
},

{
    name:"runtime-os",
    engines:[
        "runtime",
        "scheduler",
        "executor",
        "pipeline",
        "monitor"
    ]
},

{
    name:"agent-os",
    engines:[
        "manager",
        "communication",
        "collaboration",
        "evaluation",
        "autonomy"
    ]
},

{
    name:"developer-os",
    engines:[
        "code",
        "review",
        "refactor",
        "test",
        "documentation"
    ]
},

{
    name:"security-os",
    engines:[
        "authentication",
        "authorization",
        "encryption",
        "audit",
        "policy"
    ]
},
{
    name:"commerce-os",
    engines:[
        "catalog",
        "pricing",
        "order",
        "payment",
        "invoice"
    ]
},

{
    name:"marketplace-os",
    engines:[
        "listing",
        "seller",
        "buyer",
        "transaction",
        "commission"
    ]
},

{
    name:"finance-os",
    engines:[
        "budget",
        "accounting",
        "forecast",
        "cashflow",
        "ledger"
    ]
},

{
    name:"logistics-os",
    engines:[
        "route",
        "tracking",
        "delivery",
        "fleet",
        "optimization"
    ]
},

{
    name:"supply-chain-os",
    engines:[
        "supplier",
        "warehouse",
        "inventory",
        "procurement",
        "distribution"
    ]
},

{
    name:"analytics-os",
    engines:[
        "metrics",
        "dashboard",
        "reporting",
        "prediction",
        "insights"
    ]
},
{
    name:"identity-os",
    engines:[
        "identity",
        "profile",
        "permission",
        "role",
        "session"
    ]
},

{
    name:"communication-os",
    engines:[
        "email",
        "notification",
        "chat",
        "messaging",
        "broadcast"
    ]
},

{
    name:"automation-os",
    engines:[
        "workflow",
        "scheduler",
        "trigger",
        "executor",
        "pipeline"
    ]
},

{
    name:"integration-os",
    engines:[
        "api",
        "gateway",
        "connector",
        "webhook",
        "sync"
    ]
},

{
    name:"cloud-os",
    engines:[
        "deployment",
        "container",
        "cluster",
        "storage",
        "scaling"
    ]
},

{
    name:"kernel-os",
    engines:[
        "kernel",
        "boot",
        "lifecycle",
        "registry",
        "health"
    ]
},
{
    name:"learning-os",
    engines:[
        "training",
        "feedback",
        "adaptation",
        "optimization",
        "experience"
    ]
},

{
    name:"decision-os",
    engines:[
        "reasoning",
        "planning",
        "priority",
        "strategy",
        "evaluation"
    ]
},

{
    name:"mission-control-os",
    engines:[
        "mission",
        "objective",
        "coordination",
        "execution",
        "monitor"
    ]
},

{
    name:"self-improvement-os",
    engines:[
        "reflection",
        "optimization",
        "evolution",
        "feedback-loop",
        "improvement"
    ]
},

{
    name:"system-memory-os",
    engines:[
        "short-memory",
        "long-memory",
        "context",
        "recall",
        "memory-index"
    ]
},

{
    name:"system-orchestrator",
    engines:[
        "brain-orchestrator",
        "agent-orchestrator",
        "tool-orchestrator",
        "runtime-orchestrator",
        "workflow-orchestrator"
    ]
}
];
function generateSystem(system){

    const dir = path.join(
        SRC,
        system.name
    );

    ensure(dir);

    createModule(system.name);

    createService(system.name);

    system.engines.forEach(engine=>{

        createEngine(
            system.name,
            engine
        );

    });

    createIndex(
        system.name,
        system.engines
    );

}

function generateAll(){

    console.log("");
    console.log("================================");
    console.log("KVR FOUNDATION GENERATOR");
    console.log("================================");
    console.log("");

    SYSTEMS.forEach(system=>{

        console.log(
            "Generating:",
            system.name
        );

        generateSystem(system);

    });

}
function updateRootIndex(){

    const indexFile = path.join(
        SRC,
        "index.ts"
    );

    const exports = SYSTEMS
        .map(system =>
            `export * from './${system.name}';`
        )
        .join("\n");

    write(
        indexFile,
        exports + "\n"
    );

}

function printSummary(){

    const engines = SYSTEMS.reduce(
        (total, system) => total + system.engines.length,
        0
    );

    console.log("");
    console.log("================================");
    console.log("KVR FOUNDATION SUMMARY");
    console.log("================================");
    console.log("Systems :", SYSTEMS.length);
    console.log("Engines :", engines);
    console.log("");

}
function buildProject(){

    console.log("");
    console.log("================================");
    console.log("RUNNING BUILD");
    console.log("================================");
    console.log("");

    try{

        cp.execSync(
            "pnpm build",
            {
                stdio:"inherit"
            }
        );

        console.log("");
        console.log("================================");
        console.log("BUILD SUCCESS");
        console.log("================================");

    }
    catch(error){

        console.log("");
        console.log("================================");
        console.log("BUILD FAILED");
        console.log("================================");
        console.log(error.message);

    }

}
function main(){

    generateAll();

    updateRootIndex();

    printSummary();

    buildProject();

}

main();