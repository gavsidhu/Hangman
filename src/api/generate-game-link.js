export const generateGameLink = ({ name, word }) => {
  return fetch(`${process.env.REACT_APP_API_URL}/new_game`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name, word: word }),
  });
};
