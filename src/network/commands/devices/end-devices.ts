import { Network } from "./interfaces";

export class PC {
    private _network: Network;
    private _gateway: string;
    private _commands: string[];

    get commands() {
        return this._commands
    }

    constructor(config: any) {
        this._network = config.network;
        this._gateway = config._gateway;
        this._commands = []

        this.setIpConfig()
    }

    private setIpConfig() {
        this._commands.push(`ipconfig ${this._network.address} ${this._network.mask} ${this._gateway}`)
    }

}
