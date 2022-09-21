export type InputSocketSpecJSON = {
  name: string;
  valueType: string,
  defaultValue?: string
}

export type OutputSocketSpecJSON = {
  name: string;
  valueType: string;
}

export type NodeSpecJSON = {
  type: string;
  category: string;
  inputs: InputSocketSpecJSON[];
  outputs: OutputSocketSpecJSON[];
};
