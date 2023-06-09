import { Fragment } from "react";
import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { sendScore } from "../api/saveScore";

export default function GameOverModal({ win, open, setOpen, elapsedTime, word }) {
  const navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [isDisabled, setIsDisabled] = React.useState(false);
  const params = new URLSearchParams(window.location.search);
  const gameId = params.get("id");

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div className="font-normal">
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className={`${win?"text-green-500":"text-red-500"} text-2xl font-display leading-6 text-gray-900`}
                    >
                      {win ? (
                          
                            "You Win"
                          
                        ) : (
                          
                            "You Lose"
                          
                        )}
                        <h3 className="text-black">Answer: {word}</h3>
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        
                      </p>
                      {win && (
                        <div className="mt-2">
                          <p className="py-2 text-sm">
                            Enter your name to be added to the leaderboard
                          </p>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={(event) => setName(event.target.value)}
                            className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Enter your name"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className={isDisabled ? 
                      "inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 disabled:cursor-not-allowed"
                      : "inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600"
                    }
                    disabled={isDisabled}
                    onClick={async () => {
                      if (!win) {
                        window.location.reload();
                      } else if (!name) {
                        alert(
                          "Please enter your name if you want to be added to the leaderboard."
                        );
                        return;
                      } else {
                        try {
                          const params = new URLSearchParams(
                            window.location.search
                          );
                          const gameId = params.get("id");
                          const response = await sendScore({
                            name,
                            elapsedTime,
                            gameId,
                          });
                          // Handle the response from the API endpoint
                          console.log(response);
                          alert(name + " has been added to the leaderboard.");
                          setIsDisabled(true);
                          if(!gameId)
                            navigate("/");
                        } catch (error) {
                          // Handle errors that occur during the API request
                          console.error(error);
                        }
                      }
                    }}
                  >
                    {win ? "Save score" : "Try again"}
                  </button>
                  <div className="text-center mt-2">
                  {gameId && (
                    <a href={`/leaderboard?id=${gameId}`} className="text-blue-500 hover:text-blue-600">
                      View Leaderboard for this game
                    </a>
                  )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
