import { api } from "./api";

export const RuntimeService = {

    status: () => api.get("/runtime/status"),

    process: () => api.post("/runtime/process")

};