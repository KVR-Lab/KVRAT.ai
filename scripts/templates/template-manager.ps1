param(
    [Parameter(Mandatory = $true)]
    [string]$Template,

    [Parameter(Mandatory = $true)]
    [string]$Output,

    [hashtable]$Variables = @{}
)

$ErrorActionPreference = "Stop"

if (!(Test-Path $Template)) {
    throw "Template not found: $Template"
}

$Content = Get-Content $Template -Raw

foreach ($Key in $Variables.Keys) {

    $Token = "{{" + $Key + "}}"

    $Content = $Content.Replace(
        $Token,
        [string]$Variables[$Key]
    )
}

$Folder = Split-Path $Output -Parent

if (!(Test-Path $Folder)) {
    New-Item `
        -ItemType Directory `
        -Path $Folder `
        -Force | Out-Null
}

[System.IO.File]::WriteAllText(
    $Output,
    $Content,
    [System.Text.UTF8Encoding]::new($false)
)

Write-Host ""
Write-Host "=============================="
Write-Host " Template Generated"
Write-Host "=============================="
Write-Host "Template : $Template"
Write-Host "Output   : $Output"