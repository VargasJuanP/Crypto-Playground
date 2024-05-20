import { Router, Switch } from "./devices/network-devices";

export class commands {
    private switchesCommands: string[];
    private routersCommands: string[];

    constructor(config: any) {
        this.switchesCommands = config.switches.map((switchConfig: any) => new Switch(switchConfig).commands);
        this.routersCommands = config.routers.map((routerConfig: any) => new Router(routerConfig).commands);
    }

}