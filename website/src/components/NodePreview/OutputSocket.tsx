import React from 'react';
import { Icon } from '@iconify/react';
import { colors, valueTypeColorMap } from './utils/colors';
import { OutputSocketSpecJSON } from 'packages/core/src/Graphs/IO/NodeSpecJSON';

export type OutputSocketProps = OutputSocketSpecJSON;

export default function OutputSocket({
  valueType,
  name
}: OutputSocketProps) {
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
        justifyContent: 'end',
        height: '7px'
      }}
    >
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
      {isFlowSocket && (
        <Icon
          style={{ color: '#ffffff', fontSize: '.75rem' }}
          icon="mdi:chevron-right"
        />
      )}
      {!isFlowSocket && (
        <Icon
          style={{ color: borderColor, fontSize: '.75rem' }}
          icon="mdi:circle-outline"
        />
      )}
    </div>
  );
}
