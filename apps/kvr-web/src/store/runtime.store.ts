import { create } from "zustand";

interface RuntimeState {
    status: string;
    setStatus: (status: string) => void;
}

export const useRuntimeStore = create<RuntimeState>((set) => ({
    status: "idle",
    setStatus: (status) => set({ status })
}));