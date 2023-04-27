export const sendScore = ({ name, elapsedTime }) => {
    return fetch(`${process.env.REACT_APP_API_URL}/save_score`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        name: name, 
        score: elapsedTime / 100
    }),
    });
};
  