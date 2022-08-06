export type InputSocketSpec = {
  name: string;
  valueType: 'flow' |'string'|'number'|'boolean',
  defaultValue?: string | number | boolean
}

export type OutputSocketSpec = {
  name: string;
  valueType: 'flow' |'string'|'number'|'boolean'
}

export type NodeSpec = {
  type: string;
  category: string;
  inputs: InputSocketSpec[];
  outputs: OutputSocketSpec[];
};
