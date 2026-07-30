#!/usr/bin/env node

/**
 * ============================================================
 * KVR-Core
 * Phase 2 Generator
 *
 * Generates:
 *  - Project Engine
 *      project.scanner.ts
 *      project.indexer.ts
 *      project.analyzer.ts
 *      project.repository.ts
 *      project.graph.ts
 *
 * Version: 1.0
 * ============================================================
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const PROJECT_ENGINE = path.join(
    ROOT,
    "packages",
    "kvr",
    "src",
    "engines",
    "project-engine"
);

const FILES = [
    "project.scanner.ts",
    "project.indexer.ts",
    "project.analyzer.ts",
    "project.repository.ts",
    "project.graph.ts",
];

function ensure(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function generate(name) {

    const className = name
        .replace(".ts", "")
        .split(".")
        .map(v => v.charAt(0).toUpperCase() + v.slice(1))
        .join("");

    const content =
`/**
 * ------------------------------------------------------------
 * AUTO GENERATED
 * Phase 2 Generator
 * ------------------------------------------------------------
 */

export class ${className} {

    constructor() {}

}
`;

    fs.writeFileSync(
        path.join(PROJECT_ENGINE, name),
        content,
        "utf8"
    );

    console.log("✓", name);
}

ensure(PROJECT_ENGINE);

console.log("");
console.log("======================================");
console.log("KVR PHASE 2 GENERATOR");
console.log("======================================");
console.log("");

FILES.forEach(generate);

console.log("");
console.log("======================================");
console.log("PHASE 2 COMPLETED");
console.log("======================================");
console.log("");
