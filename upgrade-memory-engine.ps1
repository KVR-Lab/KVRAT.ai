# ============================================
# K.V.R Memory Engine Upgrade
# ============================================

$ErrorActionPreference = "Stop"


function Log($msg)
{
    Write-Host "[KVR] $msg"
}


Log "Starting Memory Engine Upgrade"


$path = ".\src\memory"


if(!(Test-Path $path))
{
    New-Item `
    -ItemType Directory `
    -Path $path `
    -Force | Out-Null
}


Log "Memory folder ready"
# ============================================
# Create Memory Store
# ============================================

Log "Creating Memory Store..."


$store = @"
import { Injectable } from '@nestjs/common';



@Injectable()
export class MemoryStore {



    private memories:any[] = [];




    save(
        item:any
    )
    {

        this.memories.push({

            ...item,

            createdAt:
            new Date()

        });

    }





    recall(
        query:string
    )
    {

        return this.memories.filter(

            memory =>

            JSON.stringify(memory)
            .toLowerCase()
            .includes(
                query.toLowerCase()
            )

        );

    }




    all()
    {

        return this.memories;

    }


}
"@


Set-Content `
-Path ".\src\memory\memory.store.ts" `
-Value $store `
-Encoding UTF8


Write-Host "[CREATE] src/memory/memory.store.ts"


Log "Memory Store ready"
# ============================================
# Create Memory Engine
# ============================================

Log "Creating Memory Engine..."


$engine = @"
import { Injectable } from '@nestjs/common';

import { MemoryStore } from './memory.store';



@Injectable()
export class MemoryEngine {



    constructor(

        private readonly store:MemoryStore

    ){}





    remember(
        data:any
    )
    {

        this.store.save(data);


        return {

            status:"memory.saved",

            data

        };

    }





    recall(
        query:string
    )
    {

        return this.store.recall(query);

    }





    context()
    {

        return this.store.all();

    }



}
"@


Set-Content `
-Path ".\src\memory\memory.engine.ts" `
-Value $engine `
-Encoding UTF8


Write-Host "[CREATE] src/memory/memory.engine.ts"


Log "Memory Engine ready"
# ============================================
# Update Memory Module
# ============================================

Log "Updating Memory Module..."


$module = @"
import { Module } from '@nestjs/common';


import { MemoryStore } from './memory.store';

import { MemoryEngine } from './memory.engine';



@Module({

    providers:[

        MemoryStore,

        MemoryEngine

    ],


    exports:[

        MemoryEngine

    ]

})
export class MemoryModule {}
"@


Set-Content `
-Path ".\src\memory\memory.module.ts" `
-Value $module `
-Encoding UTF8


Write-Host "[UPDATED] src/memory/memory.module.ts"



# ============================================
# Update Runtime Module
# ============================================

Log "Updating Runtime Module..."


$runtime = ".\src\runtime\runtime.module.ts"


$content = Get-Content $runtime -Raw


if($content -notmatch "MemoryModule")
{

$content = $content.Replace(

"import { ExecutorModule } from '../executor/executor.module';",

"import { ExecutorModule } from '../executor/executor.module';`nimport { MemoryModule } from '../memory/memory.module';"

)


$content = $content.Replace(

"ExecutorModule",

"ExecutorModule,`n        MemoryModule"

)


Set-Content `
-Path $runtime `
-Value $content `
-Encoding UTF8


Write-Host "[UPDATED] runtime.module.ts"

}


Log "Memory Engine Integration completed"


































