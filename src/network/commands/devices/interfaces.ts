export interface Network {
    readonly address: string;
    readonly mask: string;
}

export interface Vlan {
    readonly name: string;
    readonly id: number;
}

export interface Dot1Q {
    readonly network: Network;
    readonly vlan: Vlan;
}
