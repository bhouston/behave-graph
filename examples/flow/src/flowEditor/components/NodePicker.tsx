import { useEffect, useState } from 'react';
import { useReactFlow, XYPosition } from 'reactflow';
import { useOnPressKey } from '../hooks/useOnPressKey';
import { NodeSpecJSON } from '@behave-graph/core';

export type NodePickerFilters = {
  handleType: 'source' | 'target';
  valueType: string;
};

type NodePickerProps = {
  position: XYPosition;
  filters?: NodePickerFilters;
  onPickNode: (type: string, position: XYPosition) => void;
  onClose: () => void;
  specJson: NodeSpecJSON[];
};

const NodePicker = ({ position, onPickNode, onClose, filters, specJson }: NodePickerProps) => {
  const [search, setSearch] = useState('');
  const instance = useReactFlow();

  useOnPressKey('Escape', onClose);

  const [filtered, setFiltered] = useState<NodeSpecJSON[]>([]);

  useEffect(() => {
    let filtered = [...specJson];
    if (filters !== undefined) {
      filtered = filtered.filter((node) => {
        const sockets = filters?.handleType === 'source' ? node.outputs : node.inputs;
        return sockets.some((socket) => socket.valueType === filters?.valueType);
      });
    }

    filtered = filtered.filter((node) => {
      const term = search.toLowerCase();
      return node.type.toLowerCase().includes(term);
    });

    setFiltered(filtered);
  }, [specJson, filters, search]);

  return (
    <div
      className="node-picker absolute z-10 text-sm text-white bg-gray-800 border rounded border-gray-500"
      style={{ top: position.y, left: 0 }}
    >
      <div className="bg-gray-500 p-2">Add Node</div>
      <div className="p-2">
        <input
          type="text"
          autoFocus
          placeholder="Type to filter"
          className=" bg-gray-600 disabled:bg-gray-700 w-full py-1 px-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="max-h-48 overflow-y-scroll">
        {filtered.map(({ type }) => (
          <div
            key={type}
            className="p-2 cursor-pointer border-b border-gray-600"
            onClick={() => onPickNode(type, instance.project(position))}
          >
            {type}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NodePicker;
