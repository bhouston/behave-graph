export interface ISmartContractAction {
  invoke: () => void;
  onTrigger: (cb: (count: number) => void) => void;
}
