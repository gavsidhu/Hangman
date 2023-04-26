import { useMemo, useState } from "react";
import Figure from '../components/Figure'
import {alphabet} from "../constants/alphabet"
import { wordBank } from "../constants/wordBank";

export default function Game() {

  const word = useMemo(() => {
    return wordBank[Math.floor(Math.random() * wordBank.length)];
  }, []);
  console.log(word)
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [wrongAttempts, setWrongAttempts] = useState(0);

  const maskedWord = word
    .split("")
    .map((letter) => (correctGuesses.includes(letter) ? letter : "_"))
    .join(" ");

  return (
    <div className="max-w-5xl mx-auto">
      {wrongAttempts>5 && <p>You Lost</p>}
      {!maskedWord.includes("_") &&  <p>You won!</p>}
      <div className="text-center py-4">
        <p className="text-3xl">{maskedWord}</p>
      </div>
      <div className="flex flex-row py-12">
        <div className="w-1/2">
          <div className="grid grid-cols-6 gap-1">
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
                  } w-12 h-12 disabled:cursor-not-allowed`}
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
                    wrongGuesses.includes(letter.toLowerCase()) ||
                    correctGuesses.includes(letter.toLowerCase()) ||
                    wrongAttempts>5
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
