import "./App.css";
import Canvas from "./components/Canvas";
import { useState } from "react";
import TopBar from "./components/TopBar";
import { ACTIONS } from "./settings";

function App() {
  const [points, setPoints] = useState([]);
  const [action, setAction] = useState(ACTIONS.CLICK);

  return (
    <div className="w-screen h-screen">
      <TopBar action={action} setAction={setAction} />
      <Canvas points={points} setPoints={setPoints} />
    </div>
  );
}

export default App;
