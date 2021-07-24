import "./App.css";
import Canvas from "./components/Canvas";
import ControlPanel from "./components/ControlPanel";
import { useState } from "react";

function App() {
  const [points, setPoints] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Bèzier Curve Playground</h1>
      </header>
      <main>
        <ControlPanel />
        <Canvas points={points} setPoints={setPoints} />
      </main>
    </div>
  );
}

export default App;
