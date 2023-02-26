import { NodeDefinition, toMap, ValueType } from '@behave-graph/core';
import { useMergeMap } from '@behave-graph/flow';
import {
  getSceneNodeDefinitions,
  getSceneValueTypes
} from '@behave-graph/scene';
import { useMemo } from 'react';
export const useSceneValueDefinitions = () => {
  const valuesTypesMap = useMemo(() => {
    const valueTypes = getSceneValueTypes();

    return toMap(valueTypes, ({ name }) => name);
  }, []);

  return valuesTypesMap;
};

export const useSceneNodeDefinitions = ({
  values
}: {
  values: Record<string, ValueType>;
}) => {
  const nodeDefinitionsMap = useMemo(() => {
    const nodeDefinitions = getSceneNodeDefinitions(values);

    return toMap(nodeDefinitions, ({ typeName }) => typeName);
  }, [values]);

  return nodeDefinitionsMap;
};

export const useSceneRegistry = ({
  existingValuesDefinitions,
  existingNodeDefinitions
}: {
  existingValuesDefinitions: Record<string, ValueType>;
  existingNodeDefinitions: Record<string, NodeDefinition>;
}) => {
  const sceneValueDefinitions = useSceneValueDefinitions();
  const valuesDefinitions = useMergeMap(
    existingValuesDefinitions,
    sceneValueDefinitions
  );

  const sceneNodeDefinitions = useSceneNodeDefinitions({
    values: valuesDefinitions
  });
  const nodeDefinitions = useMergeMap(
    existingNodeDefinitions,
    sceneNodeDefinitions
  );

  return {
    nodeDefinitions,
    valuesDefinitions
  };
};
