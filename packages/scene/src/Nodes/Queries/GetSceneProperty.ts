import { makeFunctionNodeDefinition, NodeCategory } from '@behave-graph/core';

import { IScene } from '../../Abstractions/IScene.js';

export const GetSceneProperty = (valueTypeNames: string[]) =>
  valueTypeNames.map((valueTypeName) =>
    makeFunctionNodeDefinition({
      typeName: `scene/get/${valueTypeName}`,
      category: NodeCategory.Query,
      label: `Scene set ${valueTypeName}`,
      in: {
        jsonPath: (_, graphApi) => {
          const scene = graphApi.getDependency<IScene>('IScene');

          return {
            valueType: 'string',
            choices: scene?.getProperties()
          };
        }
      },
      out: {
        value: valueTypeName
      },
      exec: ({ graph, read, write }) => {
        const scene = graph.getDependency<IScene>('IScene');
        const propertyValue = scene?.getProperty(
          read('jsonPath'),
          valueTypeName
        );
        write('value', propertyValue);
      }
    })
  );
