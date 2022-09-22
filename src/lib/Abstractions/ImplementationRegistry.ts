export default class ImplementationRegistry {
  private readonly abstractionNameToImplementationMap = new Map<string, any>();

  constructor() {
  }

  register(abstractionName: string, implementation: any) {
    if (this.abstractionNameToImplementationMap.get(abstractionName) !== undefined) {
      throw new Error(`already registered abstraction ${abstractionName}`);
    }
    this.abstractionNameToImplementationMap.set(abstractionName, implementation);
  }

  get<T>(abstractionName: string): T {
    const interfaceImplementation = this.abstractionNameToImplementationMap.get(abstractionName);
    if (interfaceImplementation === undefined) {
      throw new Error(`no registered abstraction with name ${abstractionName}`);
    }

    return interfaceImplementation as T;
  }
}
