export interface ISceneGraph {
  getProperty(jsonPath: string): any;
  setProperty(jsonPath: string, value: any): void;
}
