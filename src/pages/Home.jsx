import { useNavigate } from "react-router-dom";
import GameModeCard from "../components/GameModeCard";
import { ChallengeAFriend } from "../components/ChallengeAFriend";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="max-w-xl mx-auto text-center">
      <div>
        <h1 className="text-5xl font-bold">Hangman</h1>
      </div>
      <div className="space-y-6 px-6 pt-16 flex flex-col">
        <GameModeCard
          title="You vs Computer"
          description="The computer chooses a word and you try to guess the word."
          onClick={() => navigate("/game")}
        />
        {/* TODO: optional functionality */}
        <GameModeCard
          title="Computer vs. You"
          description="You choose a word and the computer tries to guess the word."
        />
        <ChallengeAFriend />
        <GameModeCard
          title="Leaderboard"
          description="See the top highest scorers in Hangman."
          onClick={() => navigate("/leaderboard")}
        />
      </div>
    </div>
  );
}
