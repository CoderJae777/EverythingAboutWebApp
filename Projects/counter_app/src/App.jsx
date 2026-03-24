import "./App.css";
import { useState } from "react";

function App() {
  const [num, setNum] = useState(67);

  function Addition() {
    setNum(num + 1);
  }

  function Subtraction() {
    setNum(num - 1);
  }
  return (
    <div>
      <h1>Current Number: {num}</h1>;<button onClick={Addition}>Add</button>
      <button onClick={Subtraction}>Subtract</button>
    </div>
  );
}

export default App;
