param(
[Parameter(Mandatory=$true,Position=0)]
[ValidateSet("module","build","registry","index")]
[string]$Command,
[Parameter(Position=1)]
[string]$Name=""
)

$Root=Split-Path $MyInvocation.MyCommand.Path -Parent
$Builders=Join-Path $Root "builders"

switch($Command){
 "module"{
   if([string]::IsNullOrWhiteSpace($Name)){throw "Module name required."}
   & (Join-Path $Builders "module-builder.ps1") $Name
 }
 "registry"{ & (Join-Path $Builders "registry-builder.ps1") }
 "index"{ & (Join-Path $Builders "index-builder.ps1") }
 "build"{
   & (Join-Path $Builders "registry-builder.ps1")
   & (Join-Path $Builders "index-builder.ps1")
   pnpm build
   if($LASTEXITCODE -ne 0){ throw "Build failed."}
   Write-Host "KVR BUILD SUCCESS"
 }
}
