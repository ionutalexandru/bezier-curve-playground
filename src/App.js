import "./App.css";
import Canvas from "./components/Canvas";
import ControlPanel from "./components/ControlPanel";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Bèzier Curve Playground</h1>
      </header>
      <main>
        <ControlPanel />
        <Canvas />
      </main>
    </div>
  );
}

export default App;
