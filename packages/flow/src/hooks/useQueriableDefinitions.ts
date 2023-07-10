import { IQueriableRegistry } from 'packages/core/src';
import { useMemo } from 'react';

export const toQueriableDefinitions = <T>(definitionsMap: {
  [id: string]: T;
}): IQueriableRegistry<T> => ({
  get: (id: string) => definitionsMap[id],
  getAll: () => Object.values(definitionsMap),
  getAllNames: () => Object.keys(definitionsMap),
  contains: (id: string) => definitionsMap[id] !== undefined
});

export const useQueriableDefinitions = <T>(definitionsMap: {
  [id: string]: T;
}): IQueriableRegistry<T> => {
  const queriableDefinitions = useMemo(
    () => toQueriableDefinitions(definitionsMap),
    [definitionsMap]
  );

  return queriableDefinitions;
};
