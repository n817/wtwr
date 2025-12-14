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

const addItem = ({ name, weather, imageUrl }) => {
  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name,
      weather,
      imageUrl,
    }),
  }).then(handleServerResponse);
};

const deleteItem = (itemId) => {
  return fetch(`${BASE_URL}/items/${itemId}`, {
    method: "DELETE",
    headers,
  }).then(handleServerResponse);
};

export { getItems, addItem, deleteItem };
