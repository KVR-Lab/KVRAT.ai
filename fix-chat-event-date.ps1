$file = ".\src\chat\chat.service.ts"

$content = Get-Content $file -Raw


$content = $content.Replace(
'new Date().toISOString()',
'new Date()'
)


Set-Content `
-Path $file `
-Value $content `
-Encoding UTF8


Write-Host "[UPDATED] chat.service.ts createdAt Date"