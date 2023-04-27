import React from "react";
import GameModeCard from "../GameModeCard";
import { generateGameLink } from "../../api/generate-game-link";

export const ChallengeAFriend = () => {
  const dialog = React.useRef(null);

  const handleClose = (event) => {
    setName("");
    setWord("");
    dialog.current.close();
  };

  const [name, setName] = React.useState("");
  const [word, setWord] = React.useState("");
  const [gameId, setGameId] = React.useState("");

  return (
    <>
      <GameModeCard
        title="Challenge a Friend"
        description="You choose a word and send it to a friend for them to guess."
        onClick={(event) => {
          event.stopPropagation();
          dialog.current.showModal();
        }}
      />
      <dialog
        ref={dialog}
        className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
      >
        <form
          className="flex flex-col space-y-4"
          onSubmit={async (event) => {
            event.preventDefault();
            const response = await generateGameLink({
              name,
              word,
            });
            const { id } = await response.json();
            setGameId(id);
          }}
        >
          <label className="flex flex-col" htmlFor="name">
            <span className="text-lg">Name</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              id="name"
              name="name"
              className="border border-gray-400 rounded-md p-2"
              type="text"
              placeholder="Enter your name"
              required
            />
          </label>
          <label htmlFor="word" className="flex flex-col">
            <span className="text-lg">Your word</span>
            <input
              id="word"
              name="word"
              value={word}
              onChange={(event) => setWord(event.target.value)}
              className="border border-gray-400 rounded-md p-2"
              type="text"
              placeholder="Enter your word"
              required
            />
          </label>
          <div className="space-x-3">
            <button
              onClick={handleClose}
              className="bg-gray-400 hover:bg-gray-500 text-white rounded-md p-2"
              type="button"
            >
              Close
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2"
              type="submit"
            >
              Generate a link
            </button>

            {gameId && (
              <div>
                <span>Send this link to your friend:</span>

                <a
                  className="text-blue-500 hover:text-blue-600"
                  href={`${process.env.REACT_APP_CLIENT_URL}/game?id=${gameId}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {`${process.env.REACT_APP_CLIENT_URL}/game?id=${gameId}`}
                </a>
              </div>
            )}
          </div>
        </form>
      </dialog>
    </>
  );
};
