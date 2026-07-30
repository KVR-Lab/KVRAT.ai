$templates = @(
'module',
'engine',
'plugin',
'tool',
'api',
'scheduler',
'pipeline',
'workspace',
'project'
)

New-Item .\templates -ItemType Directory -Force | Out-Null

foreach($t in $templates){

New-Item ".\templates\$t" -ItemType Directory -Force | Out-Null

@"
$template = '$t'
$name = '$NAME$'
"@ | Set-Content ".\templates\$t\template.kvr"

}

Write-Host ""
Write-Host "Templates Installed:"
$templates
