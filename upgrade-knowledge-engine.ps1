# ============================================
# K.V.R Knowledge Engine Upgrade
# ============================================

$ErrorActionPreference = "Stop"


function Log($msg)
{
    Write-Host "[KVR] $msg"
}


Log "Starting Knowledge Engine Upgrade"


$path = ".\src\knowledge"


if(!(Test-Path $path))
{
    New-Item `
    -ItemType Directory `
    -Path $path `
    -Force | Out-Null
}


Log "Knowledge folder ready"
# ============================================
# Create Knowledge Store
# ============================================

Log "Creating Knowledge Store..."


$store = @"
import { Injectable } from '@nestjs/common';


@Injectable()
export class KnowledgeStore {



    private documents:any[] = [];



    add(
        document:any
    )
    {

        this.documents.push(document);

    }



    search(
        query:string
    )
    {

        return this.documents.filter(

            doc =>
            JSON.stringify(doc)
            .toLowerCase()
            .includes(
                query.toLowerCase()
            )

        );

    }



    all()
    {

        return this.documents;

    }


}
"@


Set-Content `
-Path ".\src\knowledge\knowledge.store.ts" `
-Value $store `
-Encoding UTF8


Write-Host "[CREATE] src/knowledge/knowledge.store.ts"


Log "Knowledge Store ready"
# ============================================
# Create Knowledge Engine
# ============================================

Log "Creating Knowledge Engine..."


$engine = @"
import { Injectable } from '@nestjs/common';

import { KnowledgeStore } from './knowledge.store';



@Injectable()
export class KnowledgeEngine {



    constructor(

        private readonly store:KnowledgeStore

    ){}




    remember(
        data:any
    )
    {

        this.store.add(data);


        return {

            status:"stored",

            data

        };

    }




    search(
        query:string
    )
    {

        return this.store.search(query);

    }




}
"@


Set-Content `
-Path ".\src\knowledge\knowledge.engine.ts" `
-Value $engine `
-Encoding UTF8


Write-Host "[CREATE] src/knowledge/knowledge.engine.ts"


Log "Knowledge Engine ready"
# ============================================
# Update Knowledge Module
# ============================================

Log "Updating Knowledge Module..."


$module = @"
import { Module } from '@nestjs/common';


import { KnowledgeStore } from './knowledge.store';

import { KnowledgeEngine } from './knowledge.engine';



@Module({

    providers:[

        KnowledgeStore,

        KnowledgeEngine

    ],


    exports:[

        KnowledgeEngine

    ]

})
export class KnowledgeModule {}
"@


Set-Content `
-Path ".\src\knowledge\knowledge.module.ts" `
-Value $module `
-Encoding UTF8


Write-Host "[UPDATED] src/knowledge/knowledge.module.ts"



# ============================================
# Update Planner Module
# ============================================

Log "Updating Planner Module..."


$planner = ".\src\planner\planner.module.ts"


$content = Get-Content $planner -Raw


if($content -notmatch "KnowledgeModule")
{

$content = $content.Replace(

"import { Module } from '@nestjs/common';",

"import { Module } from '@nestjs/common';`nimport { KnowledgeModule } from '../knowledge/knowledge.module';"

)


$content = $content.Replace(

"@Module({",

"@Module({`n`n    imports:[`n        KnowledgeModule`n    ],"

)


Set-Content `
-Path $planner `
-Value $content `
-Encoding UTF8


Write-Host "[UPDATED] planner.module.ts"

}


Log "Knowledge Engine Integration completed"




















