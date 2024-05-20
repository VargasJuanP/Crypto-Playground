import { Interface, RouterInterface, SwitchInterface } from "./network-interfaces";

abstract class NetworkDevice {
    private _hostname: string;
    private _motd: string;
    private _commands: string[];
    protected interfaces: Interface[];

    get commands() {
        return this._commands;
    }

    constructor(config: any) {
        this._hostname = config.hostname;
        this._motd = config.motd;
        this._commands = [];
        this.interfaces = [];
        this.enterEnable();
        this.enterConfigureTerminal();
        this.setHostname();
        this.setMotd();
    }

    protected enterEnable() {
        this._commands.push("enable");
    }

    protected enterConfigureTerminal() {
        this._commands.push("configure terminal");
    }

    protected enterInterface(interfaceName: string) {
        this._commands.push(`interface ${interfaceName}`);
    }

    protected enterInterfaceRange(range: string) {
        this._commands.push(`interface range ${range}`);
    }

    protected copyRunningConfig() {
        this._commands.push("copy running-config startup-config");
    }

    protected exit() {
        this._commands.push("exit");
    }

    protected end() {
        this._commands.push("end");
    }

    protected summarizeInterfacesCommands(): any {
        const commandInterfaces: { [command: string]: string[] } = {};

        this.interfaces.forEach((switchInterface: Interface) => {
            switchInterface.commands.forEach((command: string) => {

                if (!commandInterfaces[command]) {
                    commandInterfaces[command] = [];
                }

                commandInterfaces[command].push(switchInterface.name);
            });
        });

        const summarizedCommands: { [range: string]: string[] } = {};

        for (const [command, interfaces] of Object.entries(commandInterfaces)) {

            if (interfaces.length === 1) {
                this.enterInterface(interfaces[0]);
                this.commands.push(command);
                this.exit();
                continue;
            }

            const range = this.buildInterfaceRange(interfaces);

            if (!summarizedCommands[range]) {
                summarizedCommands[range] = [];
            }

            summarizedCommands[range].push(command);
        }

        for (const [range, commands] of Object.entries(summarizedCommands)) {
            this.enterInterfaceRange(range);

            commands.forEach(command => {
                this.commands.push(command);
            });

            this.exit();
        }
    }

    private setHostname() {
        if (this._hostname) {
            this._commands.push(`hostname ${this._hostname}`);
        }
    }

    private setMotd() {
        if (this._motd) {
            this._commands.push(`banner motd #${this._motd}#`);
        }
    }

    private buildInterfaceRange(interfaces: string[]): string {
        const interfaceMap: { [interfaceType: string]: number[] } = {};

        interfaces.forEach((interfaceName: string) => {
            const lastSlashIndex = interfaceName.lastIndexOf('/');

            const interfaceType = interfaceName.substring(0, lastSlashIndex);
            const interfaceNumber = interfaceName.substring(lastSlashIndex + 1);

            if (!interfaceMap[interfaceType]) {
                interfaceMap[interfaceType] = [];
            }

            interfaceMap[interfaceType].push(parseInt(interfaceNumber));
        });

        const ranges: string[] = [];

        for (const [interfaceType, interfaces] of Object.entries(interfaceMap)) {
            const numbers = interfaces.sort((a, b) => a - b);
            const typeRanges: string[] = [];

            let start = numbers[0];
            let end = start;

            for (let i = 1; i < numbers.length; i++) {

                if (end + 1 ===  numbers[i]) {
                    end = numbers[i];

                } else {
                    typeRanges.push(`${interfaceType}/${start === end ? start : start + '-' + end}`);
                    start = numbers[i];
                    end = start;
                }
            }

            typeRanges.push(`${interfaceType}/${start === end ? start : start + '-' + end}`);

            ranges.push(...typeRanges);
        }

        return ranges.join(', ');
    }
}

export class Switch extends NetworkDevice {
    interfaces: SwitchInterface[];

    constructor(switchConfig: any) {
        super(switchConfig);

        this.interfaces = switchConfig.interfaces.map((interfaceConfig: any) => new SwitchInterface(interfaceConfig));

        this.setVlans();
        this.summarizeInterfacesCommands();
        this.end();
        this.copyRunningConfig();
    }

    private setVlans() {
        const vlans: { [name: string]: number } = {};

        this.interfaces.forEach((switchInterface: SwitchInterface) => {
            vlans[switchInterface.vlan.name] = switchInterface.vlan.id;
        });

        for (const [name, id] of Object.entries(vlans)) {
            this.commands.push(`vlan ${id}`);
            this.commands.push(`name ${name}`);
            this.exit();
        }
    }
}

export class Router extends NetworkDevice {
    interfaces: RouterInterface[];

    constructor(routerConfig: any) {
        super(routerConfig);

        this.interfaces = routerConfig.interfaces.map((interfaceConfig: any) => new RouterInterface(interfaceConfig));

        this.summarizeInterfacesCommands();
        this.setRoutes(routerConfig.routes);
        this.end();
        this.copyRunningConfig()
    }

    private setRoutes(routes: any) {
        this.commands.push("router rip");

        routes.forEach((network: string) => {
            this.commands.push(`network ${network}`);
        });

        this.exit();
    }
}
