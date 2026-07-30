$ErrorActionPreference = "Stop"

$Root = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
$Components = Join-Path $Root "apps\kvr-web\src\components"

$Items = @(
"layout/Header",
"layout/Sidebar",
"layout/Footer",
"dashboard/DashboardCard",
"chat/ChatWindow",
"terminal/Terminal",
"editor/Editor",
"common/Loader",
"common/PageTitle"
)

foreach($Item in $Items){

    $File = Join-Path $Components ($Item + ".tsx")
    $Dir  = Split-Path $File

    if(!(Test-Path $Dir)){
        New-Item -ItemType Directory -Force $Dir | Out-Null
    }

    $Name = Split-Path $Item -Leaf

@"
export default function $Name() {

    return (

        <div style={{padding:16}}>

            <h2>$Name</h2>

        </div>

    );

}
"@ | Set-Content $File -Encoding UTF8

    Write-Host "[OK] $File"

}

Write-Host ""
Write-Host "====================================="
Write-Host "   KVR Components Generated"
Write-Host "====================================="