export class AbstractionsRegistry {
  private readonly abstractionNameToImplementationMap: { [name: string]: any } =
    {};

  register(abstractionName: string, implementation: any) {
    if (abstractionName in this.abstractionNameToImplementationMap) {
      throw new Error(`already registered abstraction ${abstractionName}`);
    }
    this.abstractionNameToImplementationMap[abstractionName] = implementation;
  }

  get<T>(abstractionName: string): T {
    if (!(abstractionName in this.abstractionNameToImplementationMap)) {
      throw new Error(`no registered abstraction with name ${abstractionName}`);
    }
    return this.abstractionNameToImplementationMap[abstractionName] as T;
  }
}
