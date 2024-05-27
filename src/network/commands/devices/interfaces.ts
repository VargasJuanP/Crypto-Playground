export interface Network {
    readonly address: string;
    readonly mask: string;
}

export interface Vlan {
    readonly name: string;
    readonly id: string;
}

export interface Dot1Q {
    readonly network: Network;
    readonly vlan: Vlan;
}
