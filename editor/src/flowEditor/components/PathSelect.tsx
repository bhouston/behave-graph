import { IScene } from '@behavior-graph/framework';
import { useEffect, useState } from 'react';
import { parseJsonPath, Path } from '../../scene/useSceneModifier';
import { useWhyDidYouUpdate } from 'use-why-did-you-update';

const PathSelect = ({
  value,
  onChange,
  getProperties,
  short,
}: { value: string; onChange: (path: string) => void; short: boolean } & Pick<IScene, 'getProperties'>) => {
  const [initialValue] = useState<Path | undefined>(() => {
    if (value) {
      return parseJsonPath(value, short);
    } else return;
  });

  const [resourceType, setResourceType] = useState<string | undefined>(initialValue?.resource);
  const [elementName, setElementName] = useState<string | undefined>(initialValue?.name);
  const [property, setProperty] = useState<string | undefined>(initialValue?.property);

  const [properties] = useState(getProperties());

  useEffect(() => {
    if (!resourceType || !elementName || !property) return;

    let path: string;
    if (short) path = `${resourceType}/${elementName}`;
    else path = `${resourceType}/${elementName}/${property}`;

    onChange(path);
  }, [resourceType, elementName, property, onChange, short]);

  return (
    <>
      <select
        value={resourceType}
        onChange={(e) => setResourceType(e.target.value)}
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
          value={elementName}
          onChange={(e) => setElementName(e.target.value)}
          className=" bg-gray-600 disabled:bg-gray-700 py-1 px-2 nodrag"
        >
          <option>--element--</option>
          {properties[resourceType].names.map((name) => (
            <option value={name} key={name}>
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
          {properties[resourceType].properties.map((property) => (
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
