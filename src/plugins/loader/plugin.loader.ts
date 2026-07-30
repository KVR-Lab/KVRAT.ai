import { KvrPlugin } from '../plugin.interface';


export class PluginLoader {


    private plugins:KvrPlugin[] = [];


    register(plugin:KvrPlugin){

        this.plugins.push(plugin);

    }


    list(){

        return this.plugins.map(p => p.name);

    }


}
