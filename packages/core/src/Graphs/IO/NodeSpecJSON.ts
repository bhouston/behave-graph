import { NodeCategory } from '../../Nodes/Registry/NodeCategory';
import { ValueJSON } from './GraphJSON';

export type inputspecJSON = {
  name: string;
  valueType: string;
  defaultValue?: ValueJSON;
};

export type outputspecJSON = {
  name: string;
  valueType: string;
};

export type NodeSpecJSON = {
  type: string;
  category: NodeCategory;
  label: string;
  inputs: inputspecJSON[];
  outputs: outputspecJSON[];
};
