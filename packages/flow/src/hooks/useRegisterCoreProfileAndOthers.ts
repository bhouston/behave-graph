import {
  createRegistry,
  IRegistry,
  registerCoreProfile
} from '@behave-graph/core';
import { useEffect, useState } from 'react';

export const useRegisterCoreProfileAndOthers = ({
  otherRegisters
}: {
  otherRegisters?: ((registry: IRegistry) => void)[];
}) => {
  const [registry, setRegistry] = useState<IRegistry>();

  useEffect(() => {
    const { nodes, values } = createRegistry();
    registerCoreProfile({ nodes, values });
    otherRegisters?.forEach((register) => {
      register({ nodes, values });
    });
    setRegistry({ nodes, values });
  }, [otherRegisters]);

  return registry;
};
