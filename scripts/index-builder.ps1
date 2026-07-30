# ============================================
# KVR Index Builder
# ============================================

$ErrorActionPreference = "Stop"

$Root = (Get-Location).Path
$Src = Join-Path $Root "src"

Write-Host ""
Write-Host "====================================="
Write-Host "        KVR Index Builder"
Write-Host "====================================="
Write-Host ""

$Folders = Get-ChildItem $Src -Directory -Recurse

foreach($Folder in $Folders){

    $Exports = @()

    Get-ChildItem $Folder.FullName -File -Filter *.ts |

    Where-Object{

        $_.Name -ne "index.ts" -and
        $_.Name -notmatch "\.spec\.ts$"

    } |

    Sort-Object Name |

    ForEach-Object{

        $Name = $_.BaseName

        $Exports += "export * from './$Name';"

    }

    if($Exports.Count -gt 0){

        $Index = Join-Path $Folder.FullName "index.ts"

        [System.IO.File]::WriteAllLines(

            $Index,

            $Exports,

            [System.Text.UTF8Encoding]::new($false)

        )

        Write-Host "[OK] $Index"

    }

}

Write-Host ""
Write-Host "Index generation completed."