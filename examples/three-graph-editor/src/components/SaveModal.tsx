import { GraphJSON } from '@oveddan-behave-graph/core';
import { FC, useEffect, useRef, useState } from 'react';
import { Modal } from './Modal';

export type SaveModalProps = { open?: boolean; onClose: () => void; graphJson: GraphJSON | undefined };

export const SaveModal: FC<SaveModalProps> = ({ open = false, onClose, graphJson }) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [copied, setCopied] = useState(false);

  const [jsonString, setJsonString] = useState('{}');

  useEffect(() => {
    if (!open) return;
    if (!graphJson) setJsonString('{}');
    else setJsonString(JSON.stringify(graphJson, null, 2));
  }, [open, graphJson]);

  const handleCopy = () => {
    ref.current?.select();
    document.execCommand('copy');
    ref.current?.blur();
    setCopied(true);
    setInterval(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Modal
      title="Save Graph"
      actions={[
        { label: 'Cancel', onClick: onClose },
        { label: copied ? 'Copied' : 'Copy', onClick: handleCopy },
      ]}
      open={open}
      onClose={onClose}
    >
      <textarea ref={ref} className="border border-gray-300 w-full p-2 h-32" value={jsonString}></textarea>
    </Modal>
  );
};
