import { makeFunctionNodeDefinition, NodeCategory } from '@behave-graph/core';

import { getSceneDependency } from '../../dependencies.js';

export const GetSceneProperty = (valueTypeNames: string[]) =>
  valueTypeNames.map((valueTypeName) =>
    makeFunctionNodeDefinition({
      typeName: `scene/get/${valueTypeName}`,
      category: NodeCategory.Query,
      label: `Scene set ${valueTypeName}`,
      in: {
        jsonPath: (_, graphApi) => {
          const scene = getSceneDependency(graphApi.getDependency);

          return {
            valueType: 'string',
            choices: scene.getProperties()
          };
        }
      },
      out: {
        value: valueTypeName
      },
      exec: ({ graph: { getDependency }, read, write }) => {
        const scene = getSceneDependency(getDependency);
        const propertyValue = scene.getProperty(
          read('jsonPath'),
          valueTypeName
        );
        write('value', propertyValue);
      }
    })
  );
