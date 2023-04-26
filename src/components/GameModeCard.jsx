export default function GameModeCard({ title, description, onClick }) {
  return (
    <div
      className="py-8 px-4 bg-gray-200 hover:cursor-pointer hover:shadow-xl"
      onClick={onClick}
    >
      <h2 className="text-2xl">{title}</h2>
      <p>{description}</p>
    </div>
  );
}
