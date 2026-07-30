param(
    [Parameter(Mandatory = $true)]
    [string]$Name,

    [switch]$Force
)

$ErrorActionPreference = "Stop"

$Root = (Resolve-Path ".").Path
$Contracts = Join-Path $Root "packages\contracts\src"

New-Item `
    -ItemType Directory `
    -Force `
    -Path $Contracts | Out-Null

$Contract = $Name.ToLower()
$Class = (Get-Culture).TextInfo.ToTitleCase($Contract)

$File = Join-Path $Contracts "$Contract.contract.ts"

if ((Test-Path $File) -and !$Force) {
    throw "Contract already exists: $File"
}

$Content = @"
export interface I${Class}Contract {

    readonly id: string;

    readonly name: string;

    initialize(): Promise<void>;

    execute(input: unknown): Promise<unknown>;

    dispose(): Promise<void>;

}
"@

[System.IO.File]::WriteAllText(
    $File,
    $Content,
    [System.Text.UTF8Encoding]::new($false)
)

$Index = Join-Path $Contracts "index.ts"

if (!(Test-Path $Index)) {
    New-Item -ItemType File -Path $Index | Out-Null
}

Add-Content $Index "export * from './$Contract.contract';"

Write-Host ""
Write-Host "======================================="
Write-Host " Contract Generated Successfully"
Write-Host "======================================="
Write-Host "Contract : I${Class}Contract"
Write-Host "File     : $File"
Write-Host "[OK] index.ts updated"