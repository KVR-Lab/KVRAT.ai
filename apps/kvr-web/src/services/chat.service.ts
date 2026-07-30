import { api } from "./api";

export const ChatService = {

    send: (message:string)=>
        api.post("/chat",{message})

};