export type Dependencies = Record<string, any>;

export const registerDependency = (
  dependencies: Dependencies,
  key: string,
  dependency: any
) => ({
  ...dependencies,
  [key]: dependency
});
