import FlowEditor from './flowEditor/FlowEditorApp';

function App() {
  return (
    <div className="h-full grid grid-cols-2 gap-0">
      <div className="bg-lime-500 h-full">
        <FlowEditor />
      </div>
      <div className="bg-red-400 h-full">preview</div>
    </div>
  );
}

export default App;
