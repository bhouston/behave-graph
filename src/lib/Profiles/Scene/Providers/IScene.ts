export interface IScene {
  getProperty(jsonPath: string): any;
  setProperty(jsonPath: string, value: any): void;
  addOnClickedListener(
    jsonPath: string,
    callback: (jsonPath: string) => void
  ): void;
}
