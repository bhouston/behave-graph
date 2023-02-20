import { useState } from "react";
import { ClearModal } from "./modals/ClearModal";
import { HelpModal } from "./modals/HelpModal";
import {
  faDownload,
  faPlay,
  faPause,
  faQuestion,
  faTrash,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Examples, LoadModal } from './modals/LoadModal';
import { SaveModal } from './modals/SaveModal';
import { Controls, ControlButton } from "reactflow";
import { GraphJSON, NodeSpecJSON } from "@behave-graph/core";

export const CustomControls = ({
  playing,
  togglePlay,
  setBehaviorGraph,
  examples,
  specJson
}: {
  playing: boolean;
  togglePlay: () => void;
  setBehaviorGraph: (value: GraphJSON) => void;
  examples: Examples;
  specJson: NodeSpecJSON[] | undefined;
}) => {
  const [loadModalOpen, setLoadModalOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [clearModalOpen, setClearModalOpen] = useState(false);

  return (
    <>
      <Controls>
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
        <ControlButton title="Run" onClick={togglePlay}>
          <FontAwesomeIcon icon={playing ? faPause : faPlay} />
        </ControlButton>
      </Controls>
      <LoadModal open={loadModalOpen} onClose={() => setLoadModalOpen(false)} setBehaviorGraph={setBehaviorGraph} examples={examples} />
      {specJson && (<SaveModal open={saveModalOpen} specJson={specJson} onClose={() => setSaveModalOpen(false)} />)}
      <HelpModal open={helpModalOpen} onClose={() => setHelpModalOpen(false)} />
      <ClearModal
        open={clearModalOpen}
        onClose={() => setClearModalOpen(false)}
      />
    </>
  );
};

export default CustomControls;
