param(
    [Parameter(Mandatory = $true)]
    [string]$Name,

    [switch]$Force
)

$ErrorActionPreference = "Stop"

$Root = (Resolve-Path ".").Path
$Pipelines = Join-Path $Root "src\pipelines"

New-Item `
    -ItemType Directory `
    -Force `
    -Path $Pipelines | Out-Null

$Pipeline = $Name.ToLower()
$Class = (Get-Culture).TextInfo.ToTitleCase($Pipeline)

$Folder = Join-Path $Pipelines $Pipeline

New-Item `
    -ItemType Directory `
    -Force `
    -Path $Folder | Out-Null

function Write-KVRFile {
    param(
        [string]$Path,
        [string]$Content
    )

    if ((Test-Path $Path) -and !$Force) {
        return
    }

    [System.IO.File]::WriteAllText(
        $Path,
        $Content,
        [System.Text.UTF8Encoding]::new($false)
    )

    Write-Host "[OK] $Path"
}

$PipelineCode = @"
export interface PipelineContext {

    data: unknown;

}

export interface PipelineStep {

    execute(
        context: PipelineContext
    ): Promise<PipelineContext>;

}

export class ${Class}Pipeline {

    private readonly steps: PipelineStep[] = [];

    add(step: PipelineStep): ${Class}Pipeline {

        this.steps.push(step);

        return this;

    }

    async execute(
        context: PipelineContext
    ): Promise<PipelineContext> {

        let current = context;

        for (const step of this.steps) {

            current = await step.execute(current);

        }

        return current;

    }

}
"@

$Index = @"
export * from './$Pipeline.pipeline';
"@

Write-KVRFile `
    -Path (Join-Path $Folder "$Pipeline.pipeline.ts") `
    -Content $PipelineCode

Write-KVRFile `
    -Path (Join-Path $Folder "index.ts") `
    -Content $Index

Write-Host ""
Write-Host "======================================="
Write-Host " Pipeline Generated Successfully"
Write-Host "======================================="
Write-Host "Pipeline : $Class"
Write-Host "Path     : $Folder"