import { create } from "zustand";

interface PluginState {
    plugins: string[];
    setPlugins: (plugins: string[]) => void;
}

export const usePluginStore = create<PluginState>((set) => ({
    plugins: [],
    setPlugins: (plugins) => set({ plugins })
}));