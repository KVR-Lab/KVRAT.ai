param(
    [Parameter(Mandatory=$true)]
    [string]$Module
)

powershell -ExecutionPolicy Bypass -File "$PSScriptRoot\bootstrap-generator-v3.ps1" $Module

powershell -ExecutionPolicy Bypass -File "$PSScriptRoot\registry-builder.ps1"

powershell -ExecutionPolicy Bypass -File "$PSScriptRoot\index-builder.ps1"

pnpm build