export default class ImplementationRegistry {
  private readonly abstractionNameToImplementationMap: { [name: string]: any } =
    {};

  register(abstractionName: string, implementation: any) {
    if (
      this.abstractionNameToImplementationMap[abstractionName] !== undefined
    ) {
      throw new Error(`already registered abstraction ${abstractionName}`);
    }
    this.abstractionNameToImplementationMap[abstractionName] = implementation;
  }

  get<T>(abstractionName: string): T {
    const interfaceImplementation =
      this.abstractionNameToImplementationMap[abstractionName];
    if (interfaceImplementation === undefined) {
      throw new Error(`no registered abstraction with name ${abstractionName}`);
    }

    return interfaceImplementation as T;
  }
}
