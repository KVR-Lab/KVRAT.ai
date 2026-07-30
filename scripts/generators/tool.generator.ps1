param(
[Parameter(Mandatory=$true)][string]$Name,
[switch]$Force
)

$Root=(Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
$Tools=Join-Path $Root "src\tools"
New-Item -ItemType Directory -Force -Path $Tools|Out-Null

$slug=$Name.ToLower()
$class=(Get-Culture).TextInfo.ToTitleCase($slug)
$dir=Join-Path $Tools $slug
New-Item -ItemType Directory -Force -Path $dir|Out-Null

function Write-KVRFile($Path,$Content){
 if((Test-Path $Path)-and !$Force){return}
 [IO.File]::WriteAllText($Path,$Content,[Text.UTF8Encoding]::new($false))
}

$tool=@"
export class ${class}Tool {
    readonly name = '$slug';
    execute(input:any){
        return input;
    }
}
"@

Write-KVRFile (Join-Path $dir "$slug.tool.ts") $tool
Write-KVRFile (Join-Path $dir "index.ts") "export * from './$slug.tool';`n"
Write-Host "Tool generated: $class"
