
Write-Host ""
Write-Host "==============================="
Write-Host "      KVR POST BUILD"
Write-Host "==============================="
Write-Host ""

.\scripts\build-registry.ps1

if(Test-Path .\scripts\build-index.ps1){

    .\scripts\build-index.ps1

}

pnpm build

if($LASTEXITCODE -eq 0){

    Write-Host ""
    Write-Host "KVR Build OK"

}else{

    Write-Host ""
    Write-Host "KVR Build Failed"

}
