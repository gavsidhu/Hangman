export default function Leaderboard() {

    // temporary rankings to see how the table looks
    const rankings = [
        { name: "Jonathan McFennister Schaquakerham the 3rd", score: 100 },
        { name: "Jane", score: 100 },
        { name: "Bob", score: 100 },
        { name: "John", score: 100 },
        { name: "Jane", score: 100 },
        { name: "Bob", score: 100 },
        { name: "John", score: 100 },
        { name: "Jane", score: 100 },
        { name: "Bob", score: 90 },
        { name: "John", score: 90 },
        { name: "Jane", score: 90 },
        { name: "Bob", score: 90 },
        { name: "John", score: 90 },
        { name: "Jane", score: 90 },
        { name: "Bob", score: 90 },
        { name: "John", score: 90 },
        { name: "Jane", score: 90 },
        { name: "Bob", score: 80 },
        { name: "John", score: 80 },
        { name: "Jane", score: 80 },
        { name: "Bob", score: 80 },
        { name: "John", score: 80 },
        { name: "Jane", score: 80 },
        { name: "Bob", score: 80 },
      ];

    return (
        <div className="max-w-xl mx-auto text-center">
            <div>
                <div className="flex items-center justify-center py-4">
                    <h1 className="text-5xl font-bold px-10">Leaderboard</h1>
                    <img src="/trophy.png" alt="trophy icon" className="w-20 h-30"/>
                </div>
                <table className="table-auto mx-auto mt-5 mb-10">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Rank</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rankings.map((ranking, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">{ranking.name}</td>
                            <td className="border px-4 py-2">{ranking.score}</td>
                        </tr>
                        ))}
                </tbody>
                </table>
            </div>
        </div>
    );
}