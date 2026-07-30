param(
    [string]$AppName = "kvr-web"
)

$ErrorActionPreference = "Stop"

$Root = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
Set-Location $Root

Write-Host ""
Write-Host "======================================="
Write-Host "        KVR UI Bootstrap"
Write-Host "======================================="
Write-Host ""

if (!(Get-Command pnpm -ErrorAction SilentlyContinue)) {
    Write-Host "pnpm not found."
    exit 1
}

$Apps = Join-Path $Root "apps"

if (!(Test-Path $Apps)) {
    New-Item -ItemType Directory $Apps | Out-Null
}

Set-Location $Apps

if (!(Test-Path $AppName)) {

    pnpm create next-app@latest $AppName `
        --ts `
        --tailwind `
        --eslint `
        --app `
        --src-dir `
        --import-alias "@/*" `
        --use-pnpm `
        --yes

}

Set-Location (Join-Path $Apps $AppName)

pnpm add `
axios `
zustand `
@tanstack/react-query `
lucide-react `
react-hook-form `
zod `
framer-motion

Write-Host ""
Write-Host "======================================="
Write-Host "      KVR UI READY"
Write-Host "======================================="
Write-Host ""
Write-Host "Location:"
Write-Host (Get-Location)