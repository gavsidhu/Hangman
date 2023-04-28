import { useNavigate } from "react-router-dom";
import GameModeCard from "../components/GameModeCard";
import { ChallengeAFriend } from "../components/ChallengeAFriend";
import AnimatedFigure from "../components/AnimatedFigure";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto text-center py-24">
      <div>
        <h1 className="text-5xl font-bold font-display">Play Hangman</h1>
      </div>
      <div className="flex flex-col md:flex-row items-center">
        <div className="w-full mx-auto py-6">
          <AnimatedFigure />
        </div>
        <div className="space-y-6 px-6 pt-16 flex flex-col mx-auto w-full">
          <GameModeCard
            title="You vs Computer"
            description="The computer chooses a word and you try to guess the word."
            onClick={() => navigate("/game")}
          />
          {/* TODO: optional functionality */}
          {/* <GameModeCard
            title="Computer vs. You"
            description="You choose a word and the computer tries to guess the word."
          /> */}
          <ChallengeAFriend />
          <GameModeCard
            title="Leaderboard"
            description="See the top highest scorers in Hangman."
            onClick={() => navigate("/leaderboard")}
          />
        </div>
      </div>
    </div>
  );
}
