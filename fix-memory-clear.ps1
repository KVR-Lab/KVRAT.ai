$ErrorActionPreference="Stop"

Write-Host "[KVR] Adding Memory clear support"


$path = ".\src\memory\memory.service.ts"

$content = Get-Content $path -Raw


$content = $content.Replace(

"getAll()",

"clear()
{

this.memory = [];

return { cleared:true };

}


getAll()"

)


Set-Content $path $content -Encoding UTF8


Write-Host "[KVR] Memory clear added"