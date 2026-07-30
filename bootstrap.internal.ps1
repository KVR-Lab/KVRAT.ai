# ============================================
# K.V.R Bootstrap ALL
# Main Builder
# Version 1.0
# ============================================

$ErrorActionPreference = "Stop"

$Root = Get-Location

Write-Host ""
Write-Host "============================================"
Write-Host "        K.V.R Bootstrap ALL"
Write-Host "============================================"
Write-Host ""

Write-Host "[KVR] Root: $Root"
Write-Host ""

function Write-Step($Message)
{
    Write-Host "[KVR] $Message"
}

function Ensure-Folder($Path)
{
    if (!(Test-Path $Path))
    {
        New-Item -ItemType Directory -Path $Path | Out-Null
        Write-Host "[CREATE] $Path"
    }
    else
    {
        Write-Host "[EXIST]  $Path"
    }
}

Write-Step "Starting Bootstrap..."

Ensure-Folder ".\src"
Ensure-Folder ".\src\core"
Ensure-Folder ".\src\runtime"
Ensure-Folder ".\src\events"
Ensure-Folder ".\src\plugins"
Ensure-Folder ".\src\registry"

Write-Step "Base folders ready"# ============================================
# Core Structure
# ============================================

Write-Step "Creating Core structure..."

Ensure-Folder ".\src\core\contracts"
Ensure-Folder ".\src\core\interfaces"
Ensure-Folder ".\src\core\dto"
Ensure-Folder ".\src\core\constants"
Ensure-Folder ".\src\core\errors"

Write-Step "Core structure ready"


# ============================================
# Runtime Structure
# ============================================

Write-Step "Creating Runtime structure..."

Ensure-Folder ".\src\runtime\context"
Ensure-Folder ".\src\runtime\lifecycle"
Ensure-Folder ".\src\runtime\manager"

Write-Step "Runtime structure ready"


# ============================================
# Infrastructure Structure
# ============================================

Write-Step "Creating Infrastructure structure..."

Ensure-Folder ".\src\events\bus"
Ensure-Folder ".\src\plugins\loader"
Ensure-Folder ".\src\registry\store"

Write-Step "Infrastructure structure ready"
# ============================================
# Create Core Base Files
# ============================================

Write-Step "Creating Core base files..."


$coreFiles = @{

".\src\core\interfaces\engine.interface.ts" = @"
export interface KvrEngine {

    readonly name:string;

    boot():Promise<void> | void;

}
"@


".\src\core\contracts\message.contract.ts" = @"
export interface KvrMessage {

    id:string;

    role:string;

    content:string;

    createdAt:Date;

}
"@


".\src\core\dto\command.dto.ts" = @"
export class CommandDto {

    command:string;

}
"@


".\src\core\constants\kvr.constants.ts" = @"
export const KVR_VERSION = '1.0.0';

export const KVR_NAME = 'K.V.R';

"@


".\src\core\errors\kvr.error.ts" = @"
export class KvrError extends Error {

    constructor(message:string){

        super(message);

        this.name='KvrError';

    }

}
"@

}


foreach($file in $coreFiles.Keys)
{
    if(!(Test-Path $file))
    {
        Set-Content `
        -Path $file `
        -Value $coreFiles[$file] `
        -Encoding UTF8

        Write-Host "[CREATE] $file"
    }
    else
    {
        Write-Host "[SKIP] $file"
    }
}


Write-Step "Core files ready"
# ============================================
# Create Runtime Base Files
# ============================================

Write-Step "Creating Runtime files..."


$runtimeFiles = @{

".\src\runtime\context\runtime.context.ts" = @"
export class RuntimeContext {

    private data = new Map<string, any>();


    set(key:string,value:any){

        this.data.set(key,value);

    }


    get(key:string){

        return this.data.get(key);

    }

}
"@


".\src\runtime\lifecycle\runtime.lifecycle.ts" = @"
export class RuntimeLifecycle {


    start(){

        return true;

    }


    stop(){

        return true;

    }


}
"@


".\src\runtime\manager\runtime.manager.ts" = @"
import { RuntimeContext } from '../context/runtime.context';


export class RuntimeManager {


    readonly context = new RuntimeContext();


    initialize(){

        return this.context;

    }


}
"@

}



foreach($file in $runtimeFiles.Keys)
{

    if(!(Test-Path $file))
    {

        Set-Content `
        -Path $file `
        -Value $runtimeFiles[$file] `
        -Encoding UTF8


        Write-Host "[CREATE] $file"

    }
    else
    {

        Write-Host "[SKIP] $file"

    }

}


Write-Step "Runtime files ready"
# ============================================
# Create Event System
# ============================================

Write-Step "Creating Event System..."


$eventFiles = @{

".\src\events\event.interface.ts" = @"
export interface KvrEvent {

    name:string;

    payload:any;

    createdAt:Date;

}
"@


".\src\events\bus\event.bus.ts" = @"
import { KvrEvent } from '../event.interface';


export class EventBus {


    private events:KvrEvent[] = [];


    publish(event:KvrEvent){

        this.events.push(event);

    }


    getEvents(){

        return this.events;

    }


}
"@

}



foreach($file in $eventFiles.Keys)
{

    if(!(Test-Path $file))
    {

        Set-Content `
        -Path $file `
        -Value $eventFiles[$file] `
        -Encoding UTF8


        Write-Host "[CREATE] $file"

    }
    else
    {

        Write-Host "[SKIP] $file"

    }

}


Write-Step "Event System ready"
# ============================================
# Create Plugin System
# ============================================

Write-Step "Creating Plugin System..."


$pluginFiles = @{

".\src\plugins\plugin.interface.ts" = @"
export interface KvrPlugin {

    name:string;

    initialize():void;

}
"@


".\src\plugins\loader\plugin.loader.ts" = @"
import { KvrPlugin } from '../plugin.interface';


export class PluginLoader {


    private plugins:KvrPlugin[] = [];


    register(plugin:KvrPlugin){

        this.plugins.push(plugin);

    }


    list(){

        return this.plugins.map(p => p.name);

    }


}
"@

}



foreach($file in $pluginFiles.Keys)
{

    if(!(Test-Path $file))
    {

        Set-Content `
        -Path $file `
        -Value $pluginFiles[$file] `
        -Encoding UTF8


        Write-Host "[CREATE] $file"

    }
    else
    {

        Write-Host "[SKIP] $file"

    }

}


Write-Step "Plugin System ready"
# ============================================
# Create Registry System
# ============================================

Write-Step "Creating Registry System..."


$registryFiles = @{

".\src\registry\store\registry.store.ts" = @"
export class RegistryStore {


    private items = new Map<string,any>();


    register(
        name:string,
        value:any
    ){

        this.items.set(name,value);

    }


    resolve(name:string){

        return this.items.get(name);

    }


    list(){

        return Array.from(this.items.keys());

    }


}
"@


".\src\registry\registry.service.ts" = @"
import { RegistryStore } from './store/registry.store';


export class RegistryService {


    private readonly store =
        new RegistryStore();



    register(
        name:string,
        value:any
    ){

        this.store.register(
            name,
            value
        );

    }



    get(name:string){

        return this.store.resolve(name);

    }



    list(){

        return this.store.list();

    }


}
"@

}



foreach($file in $registryFiles.Keys)
{

    if(!(Test-Path $file))
    {

        Set-Content `
        -Path $file `
        -Value $registryFiles[$file] `
        -Encoding UTF8


        Write-Host "[CREATE] $file"

    }
    else
    {

        Write-Host "[SKIP] $file"

    }

}


Write-Step "Registry System ready"
# ============================================
# Create Chat Foundation
# ============================================

Write-Step "Creating Chat Foundation..."


$chatPath = ".\src\chat"


Ensure-Folder $chatPath


$chatFiles = @{

".\src\chat\message.interface.ts" = @"
export interface ChatMessage {

    id:string;

    role:'user' | 'kvr';

    content:string;

    createdAt:Date;

}
"@


".\src\chat\chat.context.ts" = @"
import { ChatMessage } from './message.interface';


export class ChatContext {


    private messages:ChatMessage[] = [];



    add(message:ChatMessage){

        this.messages.push(message);

    }



    history(){

        return this.messages;

    }


}
"@

}



foreach($file in $chatFiles.Keys)
{

    if(!(Test-Path $file))
    {

        Set-Content `
        -Path $file `
        -Value $chatFiles[$file] `
        -Encoding UTF8


        Write-Host "[CREATE] $file"

    }
    else
    {

        Write-Host "[SKIP] $file"

    }

}


Write-Step "Chat Foundation ready"
# ============================================
# Bootstrap Report
# ============================================

Write-Step "Creating Bootstrap Report..."


$report = @{

    name = "K.V.R"

    version = "1.0.0"

    created = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")

    modules = @(
        "Core",
        "Runtime",
        "Events",
        "Plugins",
        "Registry",
        "Chat"
    )

}



$report | ConvertTo-Json -Depth 5 |
Set-Content `
-Path ".\kvr-bootstrap-report.json" `
-Encoding UTF8


Write-Host "[CREATE] kvr-bootstrap-report.json"


Write-Step "Bootstrap structure completed"
# ============================================
# Validation
# ============================================

Write-Step "Running Validation..."


$requiredPaths = @(

".\src\core",

".\src\runtime",

".\src\events",

".\src\plugins",

".\src\registry",

".\src\chat"

)



$failed = $false


foreach($path in $requiredPaths)
{

    if(Test-Path $path)
    {

        Write-Host "[OK] $path"

    }
    else
    {

        Write-Host "[FAIL] $path"

        $failed = $true

    }

}



if($failed)
{

    Write-Host ""
    Write-Host "K.V.R Bootstrap failed"
    exit 1

}

 
# ============================================
# Run K.V.R Generator
# ============================================

Write-Step "Running K.V.R Generator..."


powershell `
-ExecutionPolicy Bypass `
-File ".\bootstrap-generator.ps1"


Write-Step "Generator completed"


Write-Host ""
Write-Host "============================================"
Write-Host "        K.V.R READY"
Write-Host "============================================"
Write-Host ""


Write-Host "Next step:"
Write-Host "pnpm build"