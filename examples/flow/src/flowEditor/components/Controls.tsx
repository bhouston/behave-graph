import { useState } from 'react';
import { ClearModal } from './ClearModal';
import { HelpModal } from './HelpModal';
import { faDownload, faPlay, faPause, faQuestion, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { LoadModal } from './LoadModal';
import { SaveModal } from './SaveModal';
import { Controls, ControlButton } from 'reactflow';
import { GraphJSON, NodeSpecJSON } from '@behave-graph/core';

// const ControlButton = ({ children, title, onClick }: { title: string; children: JSX.Element; onClick: () => void }) => (
//   <button
//     type="button"
//     onClick={onClick}
//     className="text-gray-700 border border-gray-700 hover:bg-gray-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:focus:ring-gray-800'"
//   >
//     {children}
//   </button>
// );

const CustomControls = ({
  toggleRun,
  graphJson,
  running,
  handleGraphJsonLoaded,
  setModelFile,
  additionalControls = null,
}: {
  toggleRun: () => void;
  graphJson: GraphJSON|undefined;
  running: boolean;
  additionalControls?: JSX.Element | null;
  handleGraphJsonLoaded: (value: GraphJSON) => void;
  setModelFile: (file: File|undefined)=> void; 
}) => {
  const [loadModalOpen, setLoadModalOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [clearModalOpen, setClearModalOpen] = useState(false);

  return (
    <>
      <Controls className="bg-white">
        <ControlButton title="Help" onClick={() => setHelpModalOpen(true)} className="align-middle">
          <FontAwesomeIcon icon={faQuestion} />
        </ControlButton>
        <ControlButton title="Load" onClick={() => setLoadModalOpen(true)}>
          <FontAwesomeIcon icon={faUpload} />
        </ControlButton>
        <ControlButton title="Save" onClick={() => setSaveModalOpen(true)}>
          <FontAwesomeIcon icon={faDownload} />
        </ControlButton>
        <ControlButton title="Clear" onClick={() => setClearModalOpen(true)}>
          <FontAwesomeIcon icon={faTrash} />
        </ControlButton>
        <ControlButton title="Run" onClick={() => toggleRun()}>
          <FontAwesomeIcon icon={running ? faPause : faPlay} />
        </ControlButton>
        {additionalControls}
      </Controls>
      <LoadModal
        open={loadModalOpen}
        onClose={() => setLoadModalOpen(false)}
        handleGraphJsonLoaded={handleGraphJsonLoaded}
        setModelFile={setModelFile}
      />
      <SaveModal open={saveModalOpen} onClose={() => setSaveModalOpen(false)} graphJson={graphJson} />
      <HelpModal open={helpModalOpen} onClose={() => setHelpModalOpen(false)} />
      <ClearModal open={clearModalOpen} onClose={() => setClearModalOpen(false)} />
    </>
  );
};

export default CustomControls;
