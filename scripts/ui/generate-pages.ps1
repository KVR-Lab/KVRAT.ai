$ErrorActionPreference = "Stop"

$Root = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
$App = Join-Path $Root "apps\kvr-web\src\app"

$Pages = @(
"dashboard",
"chat",
"projects",
"workspace",
"runtime",
"memory",
"plugins",
"monitor",
"logs",
"settings"
)

foreach ($Page in $Pages) {

    $Folder = Join-Path $App $Page

    if (!(Test-Path $Folder)) {
        New-Item -ItemType Directory -Force $Folder | Out-Null
    }

    $File = Join-Path $Folder "page.tsx"

@"
export default function $(($Page.Substring(0,1).ToUpper()+$Page.Substring(1)))Page() {

    return (

        <main style={{padding:32}}>

            <h1>$Page</h1>

        </main>

    );

}
"@ | Set-Content $File -Encoding UTF8

    Write-Host "[OK] $File"

}

Write-Host ""
Write-Host "====================================="
Write-Host "      KVR Pages Generated"
Write-Host "====================================="