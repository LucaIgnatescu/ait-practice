/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import "./App.css";

function Letter({ character, correct }) {
  return (
    <span
      style={{
        color: correct ? "green" : "none",
        padding: "10px",
        margin: "10px solid black",
      }}
    >
      {character}
    </span>
  );
}

function Guess({ word, guess }) {
  return (
    <div>
      {word
        .split("")
        .map((_, i) => [word[i], guess[i]])
        .map(([l, r], i) => (
          <Letter key={i} character={r} correct={l === r} />
        ))}
    </div>
  );
}

function App() {
  const [word, setWord] = useState("abcde");
  const [hasWon, setHasWon] = useState(false);
  const [guesses, setGuesses] = useState([]);
  const ref = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();

    const guess = ref.current.value;
    setGuesses([...guesses, guess]);
    if (guess === word) setHasWon(true);
  }

  function resetGame() {
    setHasWon(false);
    setGuesses([]);
    setWord("react");
  }

  return (
    <center>
      <h1>Poor Man{`'`}s Wordle</h1>
      {guesses.map((guess, i) => (
        <Guess key={i} word={word} guess={guess} />
      ))}

      {!hasWon ? (
        <form onSubmit={handleSubmit} key={guesses.length}>
          <input
            type="text"
            placeholder="enter guess"
            ref={(node) => {
              ref.current = node;
              node?.focus();
            }}
          />
          <input type="submit" value="Guess" />
        </form>
      ) : (
        <>
          <p>
            <em>Correct!</em>
          </p>
          <button onClick={resetGame}> Reset </button>
        </>
      )}
    </center>
  );
}

export default App;
