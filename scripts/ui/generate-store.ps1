$ErrorActionPreference = "Stop"

$Root = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
$Store = Join-Path $Root "apps\kvr-web\src\store"

if (!(Test-Path $Store)) {
    New-Item -ItemType Directory -Force $Store | Out-Null
}

function Write-Store {

    param(
        [string]$Name,
        [string]$Content
    )

    $Path = Join-Path $Store $Name

    [System.IO.File]::WriteAllText(
        $Path,
        $Content,
        [System.Text.UTF8Encoding]::new($false)
    )

    Write-Host "[OK] $Name"
}

Write-Store "chat.store.ts" @'
import { create } from "zustand";

interface ChatState {
    messages: string[];
    addMessage: (message: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
    messages: [],
    addMessage: (message) =>
        set((state) => ({
            messages: [...state.messages, message]
        }))
}));
'@

Write-Store "runtime.store.ts" @'
import { create } from "zustand";

interface RuntimeState {
    status: string;
    setStatus: (status: string) => void;
}

export const useRuntimeStore = create<RuntimeState>((set) => ({
    status: "idle",
    setStatus: (status) => set({ status })
}));
'@

Write-Store "project.store.ts" @'
import { create } from "zustand";

interface ProjectState {
    projects: string[];
    setProjects: (projects: string[]) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
    projects: [],
    setProjects: (projects) => set({ projects })
}));
'@

Write-Store "plugin.store.ts" @'
import { create } from "zustand";

interface PluginState {
    plugins: string[];
    setPlugins: (plugins: string[]) => void;
}

export const usePluginStore = create<PluginState>((set) => ({
    plugins: [],
    setPlugins: (plugins) => set({ plugins })
}));
'@

Write-Store "index.ts" @'
export * from "./chat.store";
export * from "./runtime.store";
export * from "./project.store";
export * from "./plugin.store";
'@

Write-Host ""
Write-Host "====================================="
Write-Host "     KVR Store Generated"
Write-Host "====================================="