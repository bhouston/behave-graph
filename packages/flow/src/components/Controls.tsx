import {
  Engine,
  readGraphFromJSON,
  Registry,
} from "@behave-graph/core";
import { useState } from "react";
import { ClearModal } from "./modals/ClearModal";
import { HelpModal } from "./modals/HelpModal";
import {
  faDownload,
  faPlay,
  faQuestion,
  faTrash,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Examples, LoadModal } from './modals/LoadModal';
import { SaveModal } from './modals/SaveModal';
import { flowToBehave } from "../transformers/flowToBehave";
import { useReactFlow, Controls, ControlButton } from "reactflow";
import { sleep } from "../util/sleep";

const CustomControls = ({examples, registry}:{examples: Examples, registry: Registry}) => {
  const [loadModalOpen, setLoadModalOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [clearModalOpen, setClearModalOpen] = useState(false);
  const instance = useReactFlow();

  const handleRun = async () => {
    
    const nodes = instance.getNodes();
    const edges = instance.getEdges();
    const graphJson = flowToBehave(nodes, edges);
    const graph = readGraphFromJSON(graphJson, registry);

    const engine = new Engine(graph);


    if (manualLifecycleEventEmitter.startEvent.listenerCount > 0) {
      manualLifecycleEventEmitter.startEvent.emit();
      await engine.executeAllAsync(5);
    }

    if (manualLifecycleEventEmitter.tickEvent.listenerCount > 0) {
      const iterations = 20;
      const tickDuration = 0.01;
      for (let tick = 0; tick < iterations; tick++) {
        manualLifecycleEventEmitter.tickEvent.emit();
        engine.executeAllSync(tickDuration);
        await sleep( tickDuration );
      }
    }

    if (manualLifecycleEventEmitter.endEvent.listenerCount > 0) {
      manualLifecycleEventEmitter.endEvent.emit();
      await engine.executeAllAsync(5);
    }
  };

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
        <ControlButton title="Run" onClick={() => handleRun()}>
          <FontAwesomeIcon icon={faPlay} />
        </ControlButton>
      </Controls>
      <LoadModal open={loadModalOpen} onClose={() => setLoadModalOpen(false)} examples={examples} />
      <SaveModal open={saveModalOpen} onClose={() => setSaveModalOpen(false)} />
      <HelpModal open={helpModalOpen} onClose={() => setHelpModalOpen(false)} />
      <ClearModal
        open={clearModalOpen}
        onClose={() => setClearModalOpen(false)}
      />
    </>
  );
};

export default CustomControls;
