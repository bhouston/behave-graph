export interface IScene {
  getProperty(jsonPath: string, valueTypeName: string): any;
  setProperty(jsonPath: string, valueTypeName: string, value: any): void;
  addOnClickedListener(
    jsonPath: string,
    callback: (jsonPath: string) => void
  ): void;
  removeOnClickedListener(
    jsonPath: string,
    callback: (jsonPath: string) => void
  ): void;
}
