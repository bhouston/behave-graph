import FlowEditor from './flowEditor/App';

function App() {
  return (
    <div className="container columns-2 h-full w-full gap-0">
      <div className="bg-lime-500 h-full">
        <FlowEditor />
      </div>
      <div className="bg-red-400 h-full">preview</div>
    </div>
  );
}

export default App;
