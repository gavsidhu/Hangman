import React, { useState, useEffect } from 'react';

export default function Leaderboard() {

    const [scores, setScores] = useState({});
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/main_leaderboard`)
        .then(response => response.json())
        .then(data => setScores(data))
        .catch(error => console.error(error))
    }, []);

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
                        {Object.keys(scores).map((score, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">
                                {index + 1 === 1 && <img src="/gold_medal.png" alt="gold medal icon" className="w-10 h-14" />}
                                {index + 1 === 2 && <img src="/silver_medal.png" alt="silver medal icon" className="w-10 h-14" />}
                                {index + 1 === 3 && <img src="/bronze_medal.png" alt="bronze medal icon" className="w-10 h-14" />}
                                {index + 1 > 3 && index + 1}
                            </td>
                            <td className="border px-4 py-2">{scores[score].name}</td>
                            <td className="border px-4 py-2">{scores[score].score} seconds</td>
                        </tr>
                        ))}
                </tbody>
                </table>
            </div>
        </div>
    );
}