import { NodeSpecJSON } from 'packages/core/src/Graphs/IO/NodeSpecJSON';
import React, { PropsWithChildren } from 'react';
import { categoryColorMap, colors } from './utils/colors';

type NodeProps = {
  title: string;
  category?: NodeSpecJSON['category'];
};

export default function NodeContainer({
  title,
  category = 'None',
  children
}: PropsWithChildren<NodeProps>) {
  let colorName = categoryColorMap[category];
  if (colorName === undefined) {
    colorName = 'red';
  }
  let [backgroundColor, borderColor, textColor] = colors[colorName];
  return (
    <div
      style={{
        borderRadius: '0.25rem',
        color: 'white',
        fontSize: '0.75rem',
        backgroundColor: '#2d3748',
        minWidth: '120px',
        width: 'fit-content',
      }}
    >
      <div
        style={{
          backgroundColor,
          color: textColor,
          padding: '0.25rem 0.5rem',
          borderTopLeftRadius: '0.25rem',
          borderTopRightRadius: '0.25rem'
        }}>
        {title}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          padding: '0.5rem 0',
          borderLeft: '1px solid',
          borderRight: '1px solid',
          borderBottom: '1px solid',
          borderColor,
        }}
      >
        {children}
      </div>
    </div>
  );
}
