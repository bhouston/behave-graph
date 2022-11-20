import { GraphJSON } from '@behave-graph/core';
import { FC, useState, useEffect, useCallback, useMemo, CSSProperties } from 'react';
import { useReactFlow } from 'reactflow';
import { Modal } from './Modal';
import { useDropzone } from 'react-dropzone';

import { emptyGraphJson, fetchModelFile, publicUrl } from '../../hooks/useBehaveGraphFlow';
import ModelPreview from '../../scene/ModelPreview';

const modelFiles = {
  courtyard: 'CourtYard.glb',
  pressButtonToStartElevator: 'PressButtonToStartElevator.gltf',
  suzanne: 'SpinningSuzanne.gltf',
};

const graphFiles = {
  clickButtonToAnimate: 'ClickButtonToAnimate.json',
  spinningSuzanne: 'SpinningSuzanne.json',
  delay: 'Delay.json',
  flipFlop: 'FlipFlop.json',
  forLoop: 'FoorLoop.json',
  helloWorld: 'HelloWorld.json'
};

export const examplePairs: ([string, string]|[string])[] = [
  [modelFiles.pressButtonToStartElevator, graphFiles.clickButtonToAnimate],
  [modelFiles.suzanne, graphFiles.spinningSuzanne],
  [graphFiles.helloWorld],
  [graphFiles.delay],
  [graphFiles.flipFlop],
  [graphFiles.forLoop],
];

const buildExampleOptions = () => examplePairs.map((pair, i) => {
  if (pair.length === 2) {
    const [modelFile, behaviorFile] = pair;
    return {
      index: i,
      text: `Model: ${modelFile} / Behavior: ${behaviorFile}`,
      modelFile,
      behaviorFile,
    }
  } else {
    const [behaviorFile] = pair;
    return {
      index: i,
      text: `Behavior: ${behaviorFile}`,
      behaviorFile,
      modelFile: undefined
    }
  }

  
});

export type LoadModalProps = {
  open?: boolean;
  onClose: () => void;
  handleGraphJsonLoaded: (value: GraphJSON) => void;
  setModelFile: (file: File|undefined) => void; 
};

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const focusedStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

const useDropZoneStyle = ({
  isFocused,
  isDragAccept,
  isDragReject,
}: {
  isFocused: boolean;
  isDragAccept: boolean;
  isDragReject: boolean;
}) => {
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  ) as CSSProperties;

  return style;
};

export const LoadModal: FC<LoadModalProps> = ({ open = false, onClose, handleGraphJsonLoaded, setModelFile}) => {
  const [behaviorGraphString, setBehaviorGraphString] = useState<string>();

  const [uploadedModelFile, setUploadedModelFile] = useState<File>();

  const instance = useReactFlow();

  useEffect(() => {
    // if reopening - clear the state
    if (open) {
      setUploadedModelFile(undefined);
      setBehaviorGraphString(undefined);
    }
  }, [open]);

  const handleLoad = useCallback(() => {
    const graph = behaviorGraphString ? (JSON.parse(behaviorGraphString) as GraphJSON) : emptyGraphJson();

    handleGraphJsonLoaded(graph);
      
    setModelFile(uploadedModelFile);

    // TODO better way to call fit vew after edges render
    setTimeout(() => {
      instance.fitView();
    }, 100);

    handleClose();
  }, [setModelFile, handleGraphJsonLoaded, behaviorGraphString, uploadedModelFile, instance]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    setUploadedModelFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive, isFocused, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'model/glb': ['.glb', '.gltf'],
    },
  });

  const style = useDropZoneStyle({
    isDragAccept,
    isDragReject,
    isFocused,
  });

  const handleClose = () => {
    setBehaviorGraphString(undefined);
    setSelectedExample('');
    onClose();
  };

  const exampleFileOptions = useMemo(
    buildExampleOptions,
    []
  );

  const [selectedExample, setSelectedExample] = useState('');

  useEffect(() => {
    if (selectedExample !== '') {
      const value = +selectedExample;

      const { modelFile, behaviorFile } = exampleFileOptions[value];

      const jsonFileUrl = publicUrl(`/examples/graphs/${behaviorFile}`);
      (async () => {
        const fetched = await (await fetch(jsonFileUrl)).json();

        const asJsonString = JSON.stringify(fetched, null, 2);
        setBehaviorGraphString(asJsonString);
      })();

      if (modelFile) {
        const modelFileUrl = publicUrl(`/examples/models/${modelFile}`);
        (async () => {
          setUploadedModelFile(await fetchModelFile(modelFileUrl, modelFile));
        })();
      } else {
        setUploadedModelFile(undefined);
      }
    }
  }, [selectedExample, exampleFileOptions]);

  return (
    <Modal
      title="Load Behave Graph and Optionally Model"
      actions={[
        { label: 'Cancel', onClick: handleClose },
        { label: 'Load', onClick: handleLoad, disabled: !uploadedModelFile && !behaviorGraphString },
      ]}
      open={open}
      onClose={onClose}
    >
      <div className="grid grid-rows-2 w-full gap-2">
        <div>
          <label htmlFor="behavee-graph" className="block text-sm font-medium text-gray-700">
            behave graph json
          </label>
          <div className="mt-1">
            <textarea
              id="behave-graph"
              name="behave-graph"
              rows={5}
              className="block w-full border-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={behaviorGraphString}
              onChange={(e) => setBehaviorGraphString(e.currentTarget.value)}
            />
          </div>
          {/* <p className="mt-2 text-sm text-gray-500">Write a few sentences about yourself.</p> */}
        </div>
        {!uploadedModelFile && (
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            {<p>Drag 'n' drop a gltf or glb model file here, or click to select a file</p>}
          </div>
        )}
        {uploadedModelFile && (
          <div>
            <ModelPreview file={uploadedModelFile} />
          </div>
        )}
      </div>
      <div className="p-4 text-center text-gray-800">or</div>
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded block w-full p-3"
        onChange={(e) => setSelectedExample(e.target.value)}
        value={selectedExample}
      >
        <option disabled value="">
          Select an example
        </option>
        {exampleFileOptions.map(({ index, text }) => (
          <option key={index} value={index}>
            {text}
          </option>
        ))}
      </select>
    </Modal>
  );
};
