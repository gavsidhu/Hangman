import { useState, useEffect, useCallback } from "react";
import Figure from "../components/Figure";
import { alphabet } from "../constants/alphabet";
import { wordBank } from "../constants/wordBank";
import { getGameById } from "../api/get-game-by-id";
import GameOverModal from "../components/GameOverModal";
import { PauseCircleIcon, PlayCircleIcon } from "@heroicons/react/20/solid";

export default function Game() {
  const [word, setWord] = useState("");

  const [open, setOpen] = useState(false);

  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [pause, setPause] = useState(false);

  const transformWord = useCallback(
    (word) => {
      return word
        .split("")
        .map((letter) => (correctGuesses.includes(letter) ? letter : "_"))
        .join(" ");
    },
    [correctGuesses]
  );
  const [maskedWord, setMaskedWord] = useState("");

  useEffect(() => {
    // get params from url
    const params = new URLSearchParams(window.location.search);
    const gameId = params.get("id");
    if (gameId) {
      getGameById(gameId).then(async (response) => {
        const { word } = await response.json();
        setWord(word);
      });
    } else {
      setWord(wordBank[Math.floor(Math.random() * wordBank.length)]);
    }
  }, []);

  useEffect(() => {
    setMaskedWord(transformWord(word));
  }, [transformWord, word, correctGuesses]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!pause) setElapsedTime((time) => time + 1);
    }, 10);

    if ((maskedWord && !maskedWord.includes("_")) || wrongAttempts > 5) {
      clearInterval(timer);
    }
    return () => {
      clearInterval(timer);
    };
  }, [maskedWord, wrongAttempts, pause]);

  useEffect(() => {
    if (wrongAttempts > 5 || (maskedWord && !maskedWord.includes("_"))) {
      setOpen(true);
    }
  }, [wrongAttempts, maskedWord]);

  return (
    <div className="max-w-5xl mx-auto py-12">
      <div className="flex flex-row items-center space-x-3">
        <button onClick={() => setPause(!pause)}>
          {!pause ? (
            <PauseCircleIcon className="h-6 w-6 text-red-500" />
          ) : (
            <PlayCircleIcon className="h-6 w-6 text-green-500" />
          )}
        </button>
        <p>{elapsedTime / 100} seconds</p>
      </div>
      {wrongAttempts > 5 && open && (
        <GameOverModal
          win={false}
          open={open}
          setOpen={setOpen}
          elapsedTime={elapsedTime}
        />
      )}
      {maskedWord && !maskedWord.includes("_") && open && (
        <GameOverModal
          win={true}
          open={open}
          setOpen={setOpen}
          elapsedTime={elapsedTime}
        />
      )}{" "}
      <div className="text-center py-4">
        <p className="text-3xl">{maskedWord}</p>
      </div>
      <div className="flex flex-row py-12">
        <div className="w-1/2">
          <div className="grid grid-cols-6 gap-3">
            {alphabet.map((letter, index) => {
              return (
                <button
                  key={index}
                  className={`${
                    wrongGuesses.includes(letter.toLowerCase())
                      ? "bg-red-500"
                      : correctGuesses.includes(letter.toLowerCase())
                      ? "bg-green-500"
                      : "bg-gray-200"
                  } hover:shadow-md h-12 disabled:cursor-not-allowed rounded-lg w-full`}
                  onClick={() => {
                    const lowerCaseLetter = letter.toLowerCase();
                    const lowerCaseWord = word.toLowerCase();
                    if (lowerCaseWord.includes(lowerCaseLetter.toLowerCase())) {
                      setCorrectGuesses([...correctGuesses, lowerCaseLetter]);
                    } else {
                      setWrongAttempts(wrongAttempts + 1);
                      setWrongGuesses([...wrongGuesses, lowerCaseLetter]);
                    }
                  }}
                  disabled={
                    pause ||
                    wrongGuesses.includes(letter.toLowerCase()) ||
                    correctGuesses.includes(letter.toLowerCase()) ||
                    wrongAttempts > 5
                  }
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>
        <div className="w-1/2">
          <Figure wrongAttempts={wrongAttempts} />
        </div>
      </div>
    </div>
  );
}
