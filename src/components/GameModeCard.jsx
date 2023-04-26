import { useNavigate } from "react-router-dom";

export default function GameModeCard({title, description, onClick}) {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/game')
    }
  return (
    <div 
    className="py-8 px-4 bg-gray-200 hover:cursor-pointer hover:shadow-xl"
    onClick={handleClick}
    >
      <h2 className="text-2xl">{title}</h2>
      <p>{description}</p>
    </div>
  );
}
