import { useEffect, useState } from 'react';
import { parseJsonPath, Path, toJsonPathString } from '../../scene/useSceneModifier';
import { ISceneWithQueries, ResourceTypes } from '../../abstractions';

const PathSelect = ({
  value,
  onChange,
  getProperties,
  short,
}: { value: string; onChange: (path: string | undefined) => void; short: boolean } & Pick<ISceneWithQueries, 'getProperties'>) => {
  const [initialValue] = useState<Path | undefined>(() => {
    if (value) {
      const result = parseJsonPath(value, short);
      return result;
    } else return;
  });

  const [resourceType, setResourceType] = useState<ResourceTypes | undefined>(initialValue?.resource);
  const [elementId, setElementId] = useState<number | undefined>(initialValue?.index);
  const [property, setProperty] = useState<string | undefined>(initialValue?.property);

  const [properties] = useState(getProperties());

  useEffect(() => {
    const jsonPath = toJsonPathString(
      {
        index: elementId,
        property: property,
        resource: resourceType,
      },
      short
    );

    onChange(jsonPath);
  }, [resourceType, elementId, property, onChange, short]);

  return (
    <>
      <select
        value={resourceType}
        onChange={(e) => setResourceType(e.target.value as ResourceTypes | undefined)}
        className=" bg-gray-600 disabled:bg-gray-700 py-1 px-2 nodrag"
      >
        <option>--type--</option>
        {Object.keys(properties).map((name) => (
          <option value={name} key={name}>
            {name}
          </option>
        ))}
      </select>
      {resourceType && (
        <select
          value={elementId}
          onChange={(e) => setElementId(+e.target.value)}
          className=" bg-gray-600 disabled:bg-gray-700 py-1 px-2 nodrag"
        >
          <option>--element--</option>
          {properties[resourceType]?.options.map(({ name, index }) => (
            <option value={index} key={name}>
              {name}
            </option>
          ))}
        </select>
      )}
      {resourceType && !short && (
        <select
          value={property}
          onChange={(e) => setProperty(e.target.value)}
          className=" bg-gray-600 disabled:bg-gray-700 py-1 px-2 nodrag"
        >
          <option>-property-</option>
          {properties[resourceType]?.properties.map((property) => (
            <option value={property} key={property}>
              {property}
            </option>
          ))}
        </select>
      )}
    </>
  );
};

export default PathSelect;
