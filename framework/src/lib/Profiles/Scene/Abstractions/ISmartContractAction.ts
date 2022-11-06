export interface ISmartContractActions {
  invoke: (id: string) => void;
  registerTriggerHandler: (id: string, cb: (count: number) => void) => void;
  // getInitialInvokeCount: (id: string) => void;
}
