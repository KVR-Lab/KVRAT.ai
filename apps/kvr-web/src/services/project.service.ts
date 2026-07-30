import { api } from "./api";

export const ProjectService = {

    list:()=>api.get("/projects")

};