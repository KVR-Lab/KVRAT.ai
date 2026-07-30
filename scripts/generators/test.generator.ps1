param(
    [Parameter(Mandatory = $true)]
    [string]$Name,

    [switch]$Force
)

$ErrorActionPreference = "Stop"

$Root = (Resolve-Path ".").Path
$Tests = Join-Path $Root "test"

New-Item `
    -ItemType Directory `
    -Force `
    -Path $Tests | Out-Null

$Module = $Name.ToLower()
$Class  = (Get-Culture).TextInfo.ToTitleCase($Module)

$File = Join-Path $Tests "$Module.spec.ts"

if ((Test-Path $File) -and !$Force) {
    throw "Test already exists: $File"
}

$Content = @"
import { describe, expect, it } from '@jest/globals';

describe('${Class}', () => {

    it('should be defined', () => {

        expect(true).toBe(true);

    });

    it('should execute successfully', () => {

        const value = true;

        expect(value).toBeTruthy();

    });

});
"@

[System.IO.File]::WriteAllText(
    $File,
    $Content,
    [System.Text.UTF8Encoding]::new($false)
)

$JestConfig = Join-Path $Root "jest.config.js"

if (!(Test-Path $JestConfig)) {

    @"
module.exports = {
    testEnvironment: 'node',
    roots: ['<rootDir>/test'],
    moduleFileExtensions: ['ts','js'],
    transform: {
        '^.+\\.ts$': 'ts-jest'
    }
};
"@ | Set-Content $JestConfig
}

Write-Host ""
Write-Host "======================================="
Write-Host " Test Generator Finished"
Write-Host "======================================="
Write-Host "Test : $File"
Write-Host "[OK] Jest configuration verified."