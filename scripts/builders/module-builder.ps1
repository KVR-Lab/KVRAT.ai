$ErrorActionPreference="Stop"

$Root=(Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$Src=Join-Path $Root "src"

Get-ChildItem $Src -Directory -Recurse | ForEach-Object{

    $Exports=@()

    Get-ChildItem $_.FullName -File -Filter *.ts |
    Where-Object{
        $_.Name -ne "index.ts" -and
        $_.Name -notmatch "\.spec\.ts$"
    } |
    Sort-Object Name |
    ForEach-Object{
        $Exports += "export * from './$($_.BaseName)';"
    }

    if($Exports.Count -gt 0){
        $Index=Join-Path $_.FullName "index.ts"
        [System.IO.File]::WriteAllLines(
            $Index,
            $Exports,
            [System.Text.UTF8Encoding]::new($false)
        )
        Write-Host "[OK] $Index"
    }
}

Write-Host ""
Write-Host "Index generation completed."
