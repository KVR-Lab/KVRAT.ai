$ErrorActionPreference = "Stop"

$Root = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
$Services = Join-Path $Root "apps\kvr-web\src\services"

if (!(Test-Path $Services)) {
    New-Item -ItemType Directory -Force $Services | Out-Null
}

function Write-File {

    param(
        [string]$Name,
        [string]$Content
    )

    $Path = Join-Path $Services $Name

    [System.IO.File]::WriteAllText(
        $Path,
        $Content,
        [System.Text.UTF8Encoding]::new($false)
    )

    Write-Host "[OK] $Name"

}

Write-File "api.ts" @"
import axios from "axios";

export const api = axios.create({

    baseURL: "http://localhost:3001",

    timeout: 10000

});
"@

Write-File "runtime.service.ts" @"
import { api } from "./api";

export const RuntimeService = {

    status: () => api.get("/runtime/status"),

    process: () => api.post("/runtime/process")

};
"@

Write-File "chat.service.ts" @"
import { api } from "./api";

export const ChatService = {

    send: (message:string)=>
        api.post("/chat",{message})

};
"@

Write-File "project.service.ts" @"
import { api } from "./api";

export const ProjectService = {

    list:()=>api.get("/projects")

};
"@

Write-File "plugin.service.ts" @"
import { api } from "./api";

export const PluginService = {

    list:()=>api.get("/plugins")

};
"@

Write-File "monitor.service.ts" @"
import { api } from "./api";

export const MonitorService = {

    status:()=>api.get("/monitor/status")

};
"@

Write-Host ""
Write-Host "====================================="
Write-Host "      KVR API Generated"
Write-Host "====================================="