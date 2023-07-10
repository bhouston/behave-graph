import React from 'react';
import { Icon } from '@iconify/react';
import { colors, valueTypeColorMap } from './utils/colors.js';
import { InputSocketSpecJSON } from 'packages/core/src/Graphs/IO/NodeSpecJSON';
import { AutoSizeInput } from './AutoSizeInput.js';

export type InputSocketProps = {
  value: any | undefined;
  onChange: (key: string, value: any) => void;
} & InputSocketSpecJSON;

export default function InputSocket({
  value,
  onChange,
  name,
  valueType,
  defaultValue
}: InputSocketProps) {
  const isFlowSocket = valueType === 'flow';

  let colorName = valueTypeColorMap[valueType];
  if (colorName === undefined) {
    colorName = 'red';
  }

  const [_, borderColor] = colors[colorName];
  const showName = isFlowSocket === false || name !== 'flow';

  return (
    <div
      style={{
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'start',
        height: '7px'
      }}
    >
      {isFlowSocket && (
        <Icon
          style={{ color: '#ffffff', fontSize: '.75rem' }}
          icon="mdi:chevron-right"
        />
      )}
      {!isFlowSocket && (
        <Icon
          style={{ color: borderColor, fontSize: '.75rem', marginRight: '2px' }}
          icon="mdi:circle-outline"
        />
      )}
      {showName && (
        <div
          style={{
            textTransform: 'capitalize',
            marginRight: '2px'
          }}
        >
          {name}
        </div>
      )}
      {isFlowSocket === false && (
        <>
          {valueType === 'string' && (
            <AutoSizeInput
              type="text"
              style={{
                backgroundColor: '#6b7280',
                color: '#ffffff',
                padding: '1px 2px',
                border: 'none',
                borderRadius: '4px'
              }}
              value={String(value) ?? defaultValue ?? ''}
              onChange={(e) => onChange(name, e.currentTarget.value)}
            />
          )}
          {valueType === 'number' && (
            <AutoSizeInput
              type="number"
              style={{
                backgroundColor: '#6b7280',
                color: '#ffffff',
                padding: '1px 2px',
                border: 'none',
                borderRadius: '4px'
              }}
              value={String(value) ?? defaultValue ?? ''}
              onChange={(e) => onChange(name, e.currentTarget.value)}
            />
          )}
          {valueType === 'float' && (
            <AutoSizeInput
              type="number"
              style={{
                backgroundColor: '#6b7280',
                color: '#ffffff',
                padding: '1px 2px',
                border: 'none',
                borderRadius: '4px'
              }}
              value={String(value) ?? defaultValue ?? ''}
              onChange={(e) => onChange(name, e.currentTarget.value)}
            />
          )}
          {valueType === 'integer' && (
            <AutoSizeInput
              type="number"
              style={{
                backgroundColor: '#6b7280',
                color: '#ffffff',
                padding: '1px 2px',
                border: 'none',
                borderRadius: '4px'
              }}
              value={String(value) ?? defaultValue ?? ''}
              onChange={(e) => onChange(name, e.currentTarget.value)}
            />
          )}
          {valueType === 'boolean' && (
            <input
              type="checkbox"
              style={{
                backgroundColor: '#6b7280',
                color: '#ffffff',
                padding: '1px 2px',
                border: 'none',
                borderRadius: '4px'
              }}
              value={String(value) ?? (defaultValue as string) ?? ''}
              onChange={(e) => onChange(name, e.currentTarget.checked)}
            />
          )}
        </>
      )}
    </div>
  );
}
