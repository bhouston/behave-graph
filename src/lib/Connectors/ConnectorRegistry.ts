export default class ConnectorRegistry {
  private readonly connectorNameToConnectorMap = new Map<string, any>();

  constructor() {
  }

  register(connectorName: string, connector: any) {
    if (this.connectorNameToConnectorMap.get(connectorName) !== undefined) {
      throw new Error(`already registered connector ${connectorName}`);
    }
    this.connectorNameToConnectorMap.set(connectorName, connector);
  }

  get<T>(connectorName: string): T {
    const interfaceImplementation = this.connectorNameToConnectorMap.get(connectorName);
    if (interfaceImplementation === undefined) {
      throw new Error(`no registered connector with name ${connectorName}`);
    }

    return interfaceImplementation as T;
  }
}
