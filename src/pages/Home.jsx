import GameModeCard from "../components/GameModeCard";

export default function Home() {
  return (
    <div className="max-w-xl mx-auto text-center">
      <div>
        <h1 className="text-5xl font-bold">Hangman</h1>
      </div>
      <div className="space-y-6 px-6 pt-16 flex flex-col">
        <GameModeCard 
            title="You vs Computer"
            description="The computer chooses a word and you try to guess the word."
        />
        <GameModeCard 
            title="Computer vs. You"
            description="You choose a word and the computer tries to guess the word."
        />
        <GameModeCard 
            title="Challenge a Friend"
            description="You choose a word and send it to a friend for them to guess."
        />
      </div>
    </div>
  );
}
