export class DependenciesRegistry {
  private readonly registryKeyToDependency: { [key: string]: any } = {};

  register(key: string, dependency: any) {
    if (key in this.registryKeyToDependency) {
      throw new Error(`already registered dependency with name '${key}`);
    }
    this.registryKeyToDependency[key] = dependency;
  }

  get<T>(key: string): T {
    if (!(key in this.registryKeyToDependency)) {
      throw new Error(`can not find dependency with name '${key}`);
    }
    return this.registryKeyToDependency[key];
  }

  getAllNames(): string[] {
    return Object.keys(this.registryKeyToDependency);
  }
}
