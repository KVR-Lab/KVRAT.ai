import { api } from "./api";

export const PluginService = {

    list:()=>api.get("/plugins")

};