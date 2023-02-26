import { IHasNodeFactory, INodeDefinition } from '../NodeDefinitions';

export type NodeDefinition = IHasNodeFactory &
  Pick<INodeDefinition, 'typeName' | 'otherTypeNames'>;

export type NodeDefinitionsMap = {
  readonly [type: string]: NodeDefinition;
};
