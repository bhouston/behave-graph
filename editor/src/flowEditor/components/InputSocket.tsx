import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Connection, Handle, Position, useReactFlow } from 'reactflow';
import cx from 'classnames';
import { colors, valueTypeColorMap } from '../util/colors';
import { InputSocketSpecJSON, IScene, NodeSpecJSON } from '@behavior-graph/framework';
import { isValidConnection } from '../util/isValidConnection';
import { AutoSizeInput } from './AutoSizeInput';
import PathSelect from './PathSelect';
import { useCallback } from 'react';

export type InputSocketProps = {
  connected: boolean;
  value: any | undefined;
  onChange: (key: string, value: any) => void;
  allSpecs: NodeSpecJSON[];
  shortJsonPath: boolean;
} & InputSocketSpecJSON &
  Pick<IScene, 'getProperties'>;

export default function InputSocket({
  connected,
  value,
  onChange,
  name,
  valueType,
  defaultValue,
  allSpecs,
  getProperties,
  shortJsonPath,
}: InputSocketProps) {
  const instance = useReactFlow();
  const isFlowSocket = valueType === 'flow';

  let colorName = valueTypeColorMap[valueType];
  if (colorName === undefined) {
    colorName = 'red';
  }

  const [backgroundColor, borderColor] = colors[colorName];

  const showName = isFlowSocket === false || name !== 'flow';

  const handleSelectChange = useCallback(
    (value: any) => {
      onChange(name, value);
    },
    [name, onChange]
  );

  const handleTextChange = useCallback(
    (e: any) => {
      const value = e.target.value;
      onChange(name, value);
    },
    [name, onChange]
  );

  return (
    <div className="flex grow items-center justify-start h-7">
      {isFlowSocket && <FontAwesomeIcon icon={faCaretRight} color="#ffffff" size="lg" />}
      {showName && <div className="capitalize mr-2">{name}</div>}
      {isFlowSocket === false && connected === false && (
        <>
          {valueType === 'string' &&
            (name === 'jsonPath' ? (
              <PathSelect
                value={String(value)}
                onChange={handleSelectChange}
                getProperties={getProperties}
                short={shortJsonPath}
              />
            ) : (
              <AutoSizeInput
                type="text"
                className=" bg-gray-600 disabled:bg-gray-700 py-1 px-2 nodrag"
                value={String(value) ?? defaultValue ?? ''}
                onChange={handleTextChange}
              />
            ))}
          {valueType === 'number' && (
            <AutoSizeInput
              type="number"
              className=" bg-gray-600 disabled:bg-gray-700 py-1 px-2 nodrag"
              value={String(value) ?? defaultValue ?? ''}
              onChange={handleTextChange}
            />
          )}
          {valueType === 'float' && (
            <AutoSizeInput
              type="number"
              className=" bg-gray-600 disabled:bg-gray-700 py-1 px-2 nodrag"
              value={String(value) ?? defaultValue ?? ''}
              onChange={handleTextChange}
            />
          )}
          {valueType === 'integer' && (
            <AutoSizeInput
              type="number"
              className=" bg-gray-600 disabled:bg-gray-700 py-1 px-2 nodrag"
              value={String(value) ?? defaultValue ?? ''}
              onChange={handleTextChange}
            />
          )}
          {valueType === 'boolean' && (
            <input
              type="checkbox"
              className=" bg-gray-600 disabled:bg-gray-700 py-1 px-2 nodrag"
              value={String(value) ?? defaultValue ?? ''}
              onChange={handleTextChange}
            />
          )}
        </>
      )}
      <Handle
        id={name}
        type="target"
        position={Position.Left}
        className={cx(borderColor, connected ? backgroundColor : 'bg-gray-800')}
        isValidConnection={(connection: Connection) => isValidConnection(connection, instance, allSpecs)}
      />
    </div>
  );
}
