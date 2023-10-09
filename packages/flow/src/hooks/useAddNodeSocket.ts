import { useCallback } from 'react';
import { useReactFlow } from 'reactflow';

export const useAddNodeSocket = (id: string) => {
  const instance = useReactFlow();

  return useCallback(
    () => {
      instance.setNodes((nodes) =>
        nodes.map((n) => {
          if (n.id !== id) return n;

          return {
            ...n,
            data: {
              ...n.data,
              configuration: {
                ...n.data.configuration,
                numSockets: (n.data.configuration?.numSockets ?? 0) + 1,
              },
            },
          };
        })
      );
    },
    [instance, id]
  );
};
