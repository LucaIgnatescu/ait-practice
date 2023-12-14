/* eslint-disable react/prop-types */
import { useState } from "react";
import "./App.css";

function NumBox({ num, onClick }) {
  return <div onClick={onClick}>Num: {num}</div>;
}

function Sum({ sum }) {
  return <div>Sum: {sum}</div>;
}

function App() {
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);

  function onClick(setter) {
    setter((val) => val + 1);
  }

  return (
    <>
      <NumBox num={counter1} onClick={onClick.bind(null, setCounter1)}></NumBox>
      <NumBox num={counter2} onClick={onClick.bind(null, setCounter2)} />
      <Sum sum={counter1 + counter2} />
    </>
  );
}

export default App;
