import { Dot1Q, Network, Vlan } from "./interfaces";

export abstract class Interface {
    private _name: string;
    private _speed: string;
    private _duplex: string;
    private _description: string;
    private _status: string;
    private _commands: string[];

    get name() {
        return this._name;
    }

    get commands() {
        return this._commands;
    }

    constructor(config: any) {
        this._name = this.name;
        this._speed = config.speed;
        this._duplex = config.duplex;
        this._description = config.description;
        this._status = config.status;
        this._commands = [];
        this.setConfigCommands()
    }

    private setConfigCommands() {
        this.setInterfaceSpeed();
        this.setInterfaceDuplex();
        this.setInterfaceDescription();
        this.setInterfaceStatus();
    }

    private setInterfaceSpeed() {
        if (this._speed) {
            this._commands.push(`speed ${this._speed}`);
        }
    }

    private setInterfaceDuplex() {
        if (this._duplex) {
            this._commands.push(`duplex ${this._duplex}`);
        }
    }

    private setInterfaceDescription() {
        if (this._description) {
            this._commands.push(`description ${this._description}`);
        }
    }

    private setInterfaceStatus() {
        if (this._status == "on") {
            this._commands.push("no shutdown");
        }
        else if (this._status == "off") {
            this._commands.push("shutdown")
        }
    }
}

export class SwitchInterface extends Interface {
    private _mode: string;
    private _vlan: Vlan;

    get vlan() {
        return this._vlan;
    }

    constructor(config: any) {
        super(config);
        this._mode = config.mode;
        this._vlan = config.vlan;
        this.setSwitchInterfaceCommands();
    }

    private setSwitchInterfaceCommands() {
        this.setInterfaceMode();
    }

    private setInterfaceMode() {
        if (this._mode == "trunk") {
            this.commands.push("switchport mode trunk");
        } else if (this._mode == "access") {
            this.commands.push("switchport mode access");
            this.commands.push(`switchport access vlan ${this._vlan.id}`);
        }
    }
}

export class RouterInterface extends Interface {
    private _network: Network;

    constructor(config: any) {
        super(config);
        this._network = config.network;
        this.setRouterInterfaceCommands();

        config.dot1qSubInt.forEach((dot1q: Dot1Q) => {
            this.setSubIntCommands(dot1q);
        });
    }

    private setRouterInterfaceCommands() {
        this.setIpConfiguration();
    }

    private setIpConfiguration() {
        if (this._network) {
            this.commands.push(`ip address ${this._network.address} ${this._network.mask}`);
        }
    }

    private setSubIntCommands(dot1q: Dot1Q) {
        this.commands.push("exit");
        this.commands.push(`interface ${this.name}.${dot1q.vlan.id}`);
        this.commands.push(`encapsulation dot1Q ${dot1q.vlan.id}`);
        this.commands.push(`ip address ${dot1q.network.address} ${dot1q.network.mask}`);
    }
}
