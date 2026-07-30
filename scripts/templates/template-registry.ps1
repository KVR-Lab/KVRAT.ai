param(
    [string]$Root = (Join-Path $PSScriptRoot "..\templates")
)

$ErrorActionPreference = "Stop"

if (!(Test-Path $Root)) {
    New-Item `
        -ItemType Directory `
        -Path $Root `
        -Force | Out-Null
}

$Registry = @()

Get-ChildItem `
    -Path $Root `
    -Recurse `
    -File |
ForEach-Object {

    $Registry += [PSCustomObject]@{

        Name = $_.BaseName

        File = $_.FullName

        Relative = $_.FullName.Replace($Root, "").TrimStart("\")

        Extension = $_.Extension

        Size = $_.Length

        LastWrite = $_.LastWriteTime

    }

}

$Output = Join-Path $Root "template.registry.json"

$Registry |
ConvertTo-Json -Depth 5 |
Set-Content `
    -Path $Output `
    -Encoding UTF8

Write-Host ""
Write-Host "================================="
Write-Host " Template Registry Generated"
Write-Host "================================="
Write-Host "Templates : $($Registry.Count)"
Write-Host "Output    : $Output"
Write-Host ""

$Registry | Format-Table Name, Extension, Relative -AutoSize