import { api } from "./api";

export const MonitorService = {

    status:()=>api.get("/monitor/status")

};