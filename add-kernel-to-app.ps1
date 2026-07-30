$file = ".\src\app.module.ts"

$content = Get-Content $file -Raw


if($content -notmatch "KvrKernelModule")
{

$content = $content.Replace(
"import { AiModule } from './ai/ai.module';",
"import { AiModule } from './ai/ai.module';`nimport { KvrKernelModule } from './kernel/kernel.module';"
)


$content = $content.Replace(
"AiModule,",
"AiModule,`n    KvrKernelModule,"
)


Set-Content `
-Path $file `
-Value $content `
-Encoding UTF8


Write-Host "[UPDATED] app.module.ts"

}
else
{
    Write-Host "[SKIP] Kernel already exists"
}