import { useCallback } from 'react';
import { useReactFlow } from 'reactflow';

export const useAddNodeSocket = (id: string, type: 'inputs' | 'outputs') => {
  const instance = useReactFlow();

  return useCallback(
    () => {
      instance.setNodes((nodes) =>
        nodes.map((n) => {
          if (n.id !== id) return n;

          let newConfiguration = type === 'inputs' ?
            { numInputs: (n.data.configuration?.numInputs ?? 0) + 1 } :
            { numOutputs: (n.data.configuration?.numOutputs ?? 0) + 1 };

          return {
            ...n,
            data: {
              ...n.data,
              configuration: {
                ...n.data.configuration,
                ...newConfiguration,
              },
            },
          };
        })
      );
    },
    [instance, id]
  );
};
