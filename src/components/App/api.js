const BASE_URL = "http://localhost:3001";

const headers = {
  "Content-Type": "application/json",
};

const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

const getItems = () => {
  return fetch(`${BASE_URL}/items`, { headers }).then(handleServerResponse);
};

export { getItems };