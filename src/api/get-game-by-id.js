export const getGameById = (id) => {
  return fetch(`${process.env.REACT_APP_API_URL}/game/${id}`);
};
