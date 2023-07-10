import { makeFlowNodeDefinition, NodeCategory } from '@behave-graph/core';

import { getSceneDependency } from '../../dependencies.js';

export const SetSceneProperty = (valueTypeNames: string[]) =>
  valueTypeNames.map((valueTypeName) =>
    makeFlowNodeDefinition({
      typeName: `scene/set/${valueTypeName}`,
      category: NodeCategory.Effect,
      label: `Set Scene ${valueTypeName}`,
      in: {
        jsonPath: (_, graphApi) => {
          const scene = getSceneDependency(graphApi.getDependency);

          return {
            valueType: 'string',
            choices: scene?.getProperties()
          };
        },
        value: valueTypeName,
        flow: 'flow'
      },
      out: {
        flow: 'flow'
      },
      initialState: undefined,
      triggered: ({ commit, read, graph: { getDependency } }) => {
        const scene = getSceneDependency(getDependency);
        scene?.setProperty(read('jsonPath'), valueTypeName, read('value'));
        commit('flow');
      }
    })
  );
