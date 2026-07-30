param(
    [Parameter(Mandatory = $true)]
    [string]$Name,

    [string]$Version = "1.0.0",

    [switch]$Force
)

$ErrorActionPreference = "Stop"

$Root = (Resolve-Path ".").Path
$Packages = Join-Path $Root "packages"

New-Item `
    -ItemType Directory `
    -Force `
    -Path $Packages | Out-Null

$Package = $Name.ToLower()
$Folder = Join-Path $Packages $Package

if ((Test-Path $Folder) -and !$Force) {
    throw "Package already exists: $Folder"
}

New-Item -ItemType Directory -Force -Path $Folder | Out-Null

@(
    "src",
    "src/contracts",
    "src/interfaces",
    "src/models",
    "src/utils",
    "test"
) | ForEach-Object {

    New-Item `
        -ItemType Directory `
        -Force `
        -Path (Join-Path $Folder $_) | Out-Null
}

$PackageJson = @"
{
  "name": "@kvr/$Package",
  "version": "$Version",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "private": false,
  "scripts": {
    "build": "tsc",
    "test": "jest"
  }
}
"@

$TsConfig = @"
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "dist",
    "declaration": true
  },
  "include": [
    "src/**/*"
  ]
}
"@

$Index = @"
export * from './contracts';
export * from './interfaces';
export * from './models';
export * from './utils';
"@

[System.IO.File]::WriteAllText(
    (Join-Path $Folder "package.json"),
    $PackageJson,
    [System.Text.UTF8Encoding]::new($false)
)

[System.IO.File]::WriteAllText(
    (Join-Path $Folder "tsconfig.json"),
    $TsConfig,
    [System.Text.UTF8Encoding]::new($false)
)

[System.IO.File]::WriteAllText(
    (Join-Path $Folder "src\index.ts"),
    $Index,
    [System.Text.UTF8Encoding]::new($false)
)

Write-Host ""
Write-Host "========================================="
Write-Host " Package Generated Successfully"
Write-Host "========================================="
Write-Host "Package : @kvr/$Package"
Write-Host "Version : $Version"
Write-Host "Path    : $Folder"
Write-Host ""
Write-Host "[OK] package.json"
Write-Host "[OK] tsconfig.json"
Write-Host "[OK] src/index.ts"