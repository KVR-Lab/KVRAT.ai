import { create } from "zustand";

interface ProjectState {
    projects: string[];
    setProjects: (projects: string[]) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
    projects: [],
    setProjects: (projects) => set({ projects })
}));