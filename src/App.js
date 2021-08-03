import "./App.css";
import { Canvas } from "components";
import { useState } from "react";
import { TopBar } from "components";
import { ACTION_TYPES } from "settings";

function App() {
  const [points, setPoints] = useState([]);
  const [action, setAction] = useState(ACTION_TYPES[0].id);

  return (
    <div className="w-screen h-screen">
      <TopBar action={action} setAction={setAction} />
      <Canvas action={action} points={points} setPoints={setPoints} />
    </div>
  );
}

export default App;
