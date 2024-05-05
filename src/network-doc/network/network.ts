export interface Vlan {
    name: string;
    number: number;
};

export interface Network {
    name: string;
    address: string;
    mask: string;
    vlan: Vlan;
};

export interface Port {
    name: string;
    address: string;
    network: Network;
    connectedTo: device;
};

export interface device {
    name: string;
    ports: Port[];
};

export interface Computer extends device {
    name: string;
    address: string;
    network: Network;
    port: Port;
};








