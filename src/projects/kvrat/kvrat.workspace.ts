import { existsSync } from "fs";
import { KVRAT_CONFIG } from "./kvrat.config";

export class KvratWorkspace {

    exists() {
        return existsSync(KVRAT_CONFIG.root);
    }

    root() {
        return KVRAT_CONFIG.root;
    }

    frontend() {
        return KVRAT_CONFIG.frontend;
    }

    backend() {
        return KVRAT_CONFIG.backend;
    }

    mobile() {
        return KVRAT_CONFIG.mobile;
    }

}