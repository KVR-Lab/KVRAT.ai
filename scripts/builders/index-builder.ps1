$ErrorActionPreference="Stop"

$Root=(Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$Src=Join-Path $Root "src"
$Out=Join-Path $Src "bootstrap\generated"

New-Item -ItemType Directory -Force -Path $Out|Out-Null

$map=@{
"module"=@()
"service"=@()
"engine"=@()
"plugin"=@()
}

Get-ChildItem $Src -Recurse -File -Filter *.ts|ForEach-Object{
$n=$_.Name
foreach($k in $map.Keys){
 if($n -like "*.$k.ts"){
   $map[$k]+=($n -replace "\.$k\.ts$","")
 }
}
}

foreach($k in $map.Keys){
$const="${k}_registry"
$file=Join-Path $Out "$k.registry.ts"
$lines=@("export const $const = [")
($map[$k]|Sort-Object -Unique)|ForEach-Object{$lines+="    '$_',"}
$lines+="];"
[IO.File]::WriteAllLines($file,$lines,[Text.UTF8Encoding]::new($false))
Write-Host "[OK] $file"
}
