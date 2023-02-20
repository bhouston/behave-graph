import { makeFunctionNodeDefinition, NodeCategory } from '@behave-graph/core';

import { getSceneDependencey } from '../../dependencies';

export const GetSceneProperty = (valueTypeNames: string[]) =>
  valueTypeNames.map((valueTypeName) =>
    makeFunctionNodeDefinition({
      typeName: `scene/get/${valueTypeName}`,
      category: NodeCategory.Query,
      label: `Scene set ${valueTypeName}`,
      in: {
        jsonPath: (_, graphApi) => {
          const scene = getSceneDependencey(graphApi.getDependency);

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
        const scene = getSceneDependencey(getDependency);
        const propertyValue = scene.getProperty(
          read('jsonPath'),
          valueTypeName
        );
        write('value', propertyValue);
      }
    })
  );
