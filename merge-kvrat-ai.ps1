$Source = "D:\KVRAT.ai\apps\backend\src\modules\ai-manager"

$Destination = "D:\kvr-core\src\ai"

Write-Host ""
Write-Host "===================================" -ForegroundColor Cyan
Write-Host " KVRAT AI Merge" -ForegroundColor Green
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""

$Folders = @(
    "brain",
    "brain\agents",
    "brain\engines",
    "brain\hybrid",
    "brain\memory",
    "brain\orchestrator",
    "brain\v2",
    "core",
    "dto"
)

foreach($Folder in $Folders){

    $From = Join-Path $Source $Folder
    $To   = Join-Path $Destination $Folder

    if(Test-Path $From){

        New-Item `
            -ItemType Directory `
            -Force `
            -Path $To | Out-Null

        Copy-Item `
            "$From\*" `
            $To `
            -Recurse `
            -Force

        Write-Host "[OK] $Folder"

    }
    else{

        Write-Host "[SKIP] $Folder"

    }

}

Write-Host ""
Write-Host "===================================" -ForegroundColor Cyan
Write-Host " Merge Completed" -ForegroundColor Green
Write-Host "===================================" -ForegroundColor Cyan