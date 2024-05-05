type Vlans = Record<string, number>;

interface Network {
  address: string;
  mask: string;
  vlan: string;
}

type Networks = Record<string, Network>;

interface Computer {
  network: string;
  address: string;
}

type Computers = Record<string, Computer>;

interface SwitchConnections {
  [interfaceName: string]: {
    connectedTo: string;
  };
}

type Switches = Record<string, SwitchConnections>;

interface RouterConnections {
  [interfaceName: string]: {
    connectedTo: string;
  };
}

type Routers = Record<string, RouterConnections>;

interface CanCommunicate {
  [network: string]: string[];
}

interface NetworkConfiguration {
  vlans: Vlans;
  networks: Networks;
  computers: Computers;
  switches: Switches;
  routers: Routers;
  canCommunicate: CanCommunicate;
}

const jsonData: NetworkConfiguration = {
    vlans: {
      vlan1: 10,
      vlan2: 20
    },
    networks: {
      red1: {
        address: "172.168.1.0",
        mask: "255.255.255.0",
        vlan: "vlan1"
      },
      red2: {
        address: "172.168.0.0",
        mask: "255.255.255.0",
        vlan: "vlan2"
      }
    },
    computers: {
      PC1: {
        network: "red1",
        address: "AUTO"
      },
      PC2: {
        network: "red2",
        address: "AUTO"
      }
    },
    switches: {
      SW1: {
        "FastEthernet0/1": {
          connectedTo: "PC1"
        },
        "FastEthernet0/2": {
          connectedTo: "PC2"
        },
        "GigabitEthernet0/1": {
          connectedTo: "R1"
        }
      }
    },
    routers: {
      R1: {
        "GigabitEthernet0/0/0": {
          connectedTo: "SW1"
        }
      }
    },
    canCommunicate: {
      red1: ["red2"]
    }
  };

  // Now you can use jsonData with the defined types
  console.log(jsonData.vlans);
  console.log(jsonData.networks.red1);
  console.log(jsonData.canCommunicate);
  // And so on...
