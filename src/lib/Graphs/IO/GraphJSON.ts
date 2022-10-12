import { Metadata } from '../../Metadata.js';

export type ValueJSON = string | boolean | number;

export type LinkJSON = { nodeId: string; socket: string };

export type ParameterValueJSON = { value: ValueJSON };
export type ParameterLinkJSON = { link: LinkJSON };
export type ParameterJSON = ParameterValueJSON | ParameterLinkJSON;

export type ParametersJSON = {
  [key: string]: ParameterJSON;
};

export type FlowsJSON = {
  [key: string]: LinkJSON;
};

export type NodeJSON = {
  label?: string;
  type: string;
  id: string;

  parameters?: ParametersJSON;
  flows?: FlowsJSON;
  metadata?: Metadata;
};

export type VariableJSON = {
  label?: string;
  id: string;
  name: string;
  valueTypeName: string;
  initialValue: ValueJSON;
  metadata?: Metadata;
};

export type CustomEventJSON = {
  label?: string;
  id: string;
  name: string;
  metadata?: Metadata;
};

export type GraphJSON = {
  name?: string;
  nodes?: NodeJSON[];
  variables?: VariableJSON[];
  customEvents?: CustomEventJSON[];
  metadata?: Metadata;
};
