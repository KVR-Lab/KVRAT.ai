import * as fs from "fs";
import * as path from "path";

export class KvratReport {

  private readonly root = "D:\\KVRAT.ai";

  generate() {

    const exists = (p: string) =>
      fs.existsSync(path.join(this.root, p));

    const apps = [
      "backend",
      "kvrat-landing",
      "web",
      "mobile"
    ].filter(app =>
      exists(`apps\\${app}`)
    );

    const checks = {
      backend: exists("apps\\backend"),
      landing: exists("apps\\kvrat-landing"),
      web: exists("apps\\web"),
      mobile: exists("apps\\mobile"),
      packages: exists("packages"),
      docker: exists("docker-compose.yml"),
      workspace: exists("pnpm-workspace.yaml"),
      env: exists(".env.example"),
      readme: exists("README.md"),
      git: exists(".git")
    };


    const completed: string[] = [];
    const missing: string[] = [];


    if (checks.backend)
      completed.push("NestJS Backend");

    else
      missing.push("Backend");


    if (checks.landing)
      completed.push("Landing Application");

    else
      missing.push("Landing");


    if (checks.web)
      completed.push("Web Application");

    else
      missing.push("Web Application");


    if (checks.mobile)
      completed.push("Mobile Application");

    else
      missing.push("Mobile Application");


    if (checks.packages)
      completed.push("Shared Packages");

    else
      missing.push("Shared Packages");


    if (checks.docker)
      completed.push("Docker Environment");

    else
      missing.push("Docker");


    if (checks.workspace)
      completed.push("Monorepo Workspace");

    else
      missing.push("Workspace Configuration");


    if (checks.env)
      completed.push("Environment Configuration");

    else
      missing.push(".env Configuration");


    const total = Object.keys(checks).length;
    const done = Object.values(checks)
      .filter(Boolean).length;


    return {

      project: "KVRAT.ai",

      root: this.root,

      progress:
        Math.round((done / total) * 100) + "%",

      apps,

      completed,

      missing,

      checks,

      generatedAt:
        new Date().toISOString()

    };

  }

}