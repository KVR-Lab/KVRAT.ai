$modules = Get-ChildItem .\src -Directory | Sort-Object Name

$out = foreach($m in $modules){

    $index = Join-Path $m.FullName "index.ts"

    if(Test-Path $index){

        "export * from '../../$($m.Name)';"

    }

}

$out | Set-Content .\src\bootstrap\generated\module.registry.ts -Encoding UTF8

Write-Host "Registry rebuilt."
