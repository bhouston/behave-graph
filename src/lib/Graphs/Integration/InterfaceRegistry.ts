export default class InterfaceRegistry {
  private readonly interfaceNameToImplemetationMap = new Map<string, any>();

  constructor() {
  }

  register(interfaceName: string, interfaceImplementation: any) {
    if (this.interfaceNameToImplemetationMap.get(interfaceName) !== undefined) {
      throw new Error(`already registered interface ${interfaceName}`);
    }
    this.interfaceNameToImplemetationMap.set(interfaceName, interfaceImplementation);
  }

  get(interfaceName: string): any {
    const interfaceImplementation = this.interfaceNameToImplemetationMap.get(interfaceName);
    if (interfaceImplementation === undefined) {
      throw new Error(`no registered interface with name ${interfaceName}`);
    }

    return interfaceImplementation;
  }
}
