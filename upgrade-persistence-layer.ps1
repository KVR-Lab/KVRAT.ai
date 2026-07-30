# ============================================
# K.V.R Persistence Layer Generator
# ============================================

$ErrorActionPreference = "Stop"


function Log($msg)
{
    Write-Host "[KVR] $msg"
}


Log "Starting Persistence Layer Upgrade"



$path = ".\src\storage"


if(!(Test-Path $path))
{
    New-Item `
    -ItemType Directory `
    -Path $path `
    -Force | Out-Null
}


Log "Storage folder ready"



# ============================================
# Storage Service
# ============================================

$storage = @"
import { Injectable } from '@nestjs/common';



@Injectable()
export class StorageService {



private data:any[] = [];



save(
item:any
)
{

this.data.push({

...item,

savedAt:new Date()

});

}




all()
{

return this.data;

}




clear()
{

this.data = [];

}



}
"@


Set-Content `
-Path ".\src\storage\storage.service.ts" `
-Value $storage `
-Encoding UTF8


Write-Host "[CREATE] storage.service.ts"



# ============================================
# Snapshot Service
# ============================================

$snapshot = @"
import { Injectable } from '@nestjs/common';

import { StorageService } from './storage.service';



@Injectable()
export class SnapshotService {



constructor(

private readonly storage:StorageService

){}



create()
{

return {

snapshot:

this.storage.all(),

createdAt:new Date()

};


}



}
"@


Set-Content `
-Path ".\src\storage\snapshot.service.ts" `
-Value $snapshot `
-Encoding UTF8


Write-Host "[CREATE] snapshot.service.ts"



# ============================================
# Storage Module
# ============================================

$module = @"
import { Module } from '@nestjs/common';


import { StorageService } from './storage.service';

import { SnapshotService } from './snapshot.service';



@Module({

providers:[

StorageService,

SnapshotService

],


exports:[

StorageService,

SnapshotService

]


})
export class StorageModule {}
"@


Set-Content `
-Path ".\src\storage\storage.module.ts" `
-Value $module `
-Encoding UTF8


Write-Host "[CREATE] storage.module.ts"



# ============================================
# Register App Module
# ============================================

$app = ".\src\app.module.ts"


$content = Get-Content $app -Raw


if($content -notmatch "StorageModule")
{

$content = $content.Replace(

"import { GatewayModule } from './gateway/gateway.module';",

"import { GatewayModule } from './gateway/gateway.module';`nimport { StorageModule } from './storage/storage.module';"

)


$content = $content.Replace(

"GatewayModule,",

"GatewayModule,`n    StorageModule,"

)


Set-Content `
-Path $app `
-Value $content `
-Encoding UTF8


Write-Host "[UPDATED] app.module.ts"

}



Log "Persistence Layer completed"



Write-Host ""
Write-Host "============================================"
Write-Host " K.V.R STORAGE READY "
Write-Host "============================================"