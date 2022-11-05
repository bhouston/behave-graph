import { useState } from 'react';
import { ClearModal } from './ClearModal';
import { HelpModal } from './HelpModal';
import { faDownload, faPlay, faQuestion, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { LoadModal } from './LoadModal';
import { SaveModal } from './SaveModal';
import { Controls, ControlButton } from 'reactflow';
import { NodeSpecJSON } from '@behavior-graph/framework';

const CustomControls = ({ handleRun, specJson }: { handleRun: () => void; specJson: NodeSpecJSON[] }) => {
  const [loadModalOpen, setLoadModalOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [clearModalOpen, setClearModalOpen] = useState(false);

  return (
    <>
      <Controls className="bg-white">
        <ControlButton title="Help" onClick={() => setHelpModalOpen(true)}>
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
        <ControlButton title="Run" onClick={() => handleRun()}>
          <FontAwesomeIcon icon={faPlay} />
        </ControlButton>
      </Controls>
      <LoadModal open={loadModalOpen} onClose={() => setLoadModalOpen(false)} />
      <SaveModal open={saveModalOpen} onClose={() => setSaveModalOpen(false)} specJson={specJson} />
      <HelpModal open={helpModalOpen} onClose={() => setHelpModalOpen(false)} />
      <ClearModal open={clearModalOpen} onClose={() => setClearModalOpen(false)} />
    </>
  );
};

export default CustomControls;
