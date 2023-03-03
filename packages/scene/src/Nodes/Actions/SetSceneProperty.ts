import { makeFlowNodeDefinition, NodeCategory } from '@oveddan-behave-graph/core';

import { getSceneDependencey } from '../../dependencies';

export const SetSceneProperty = (valueTypeNames: string[]) =>
  valueTypeNames.map((valueTypeName) =>
    makeFlowNodeDefinition({
      typeName: `scene/set/${valueTypeName}`,
      category: NodeCategory.Effect,
      label: `Set Scene ${valueTypeName}`,
      in: {
        jsonPath: (_, graphApi) => {
          const scene = getSceneDependencey(graphApi.getDependency);

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
        const scene = getSceneDependencey(getDependency);
        scene?.setProperty(read('jsonPath'), valueTypeName, read('value'));
        commit('flow');
      }
    })
  );
