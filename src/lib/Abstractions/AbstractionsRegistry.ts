import { AbstractionImplementationMap } from "./AbstractionImplementationMap";

export class AbstractionsRegistry {
  private readonly abstractionImplementationMap: AbstractionImplementationMap = {};

  register<K extends keyof AbstractionImplementationMap>(abstractionName: K, abstraction: AbstractionImplementationMap[K]) {
    if (abstractionName in this.abstractionImplementationMap) {
      throw new Error(`already registered abstraction ${abstractionName}`);
    }
    this.abstractionImplementationMap[abstractionName] = abstraction;
  }

  get<K extends keyof AbstractionImplementationMap>(abstractionName: K) {
    if (typeof this.abstractionImplementationMap[abstractionName] === 'undefined') {
      throw new Error(`no registered abstraction with name ${abstractionName}`);
    }
    return this.abstractionImplementationMap[abstractionName]!;
  }
}
