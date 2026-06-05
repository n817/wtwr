const BASE_URL = "http://localhost:3001";

const headers = {
  "Content-Type": "application/json",
};

const handleRequest = (url, options) => {
  return fetch(url, options).then(handleServerResponse);
};

const getItems = () => {
  return handleRequest(`${BASE_URL}/items`, { headers });
};

const addItem = ({ name, weather, imageUrl }, token) => {
  return handleRequest(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      weather,
      imageUrl,
    }),
  });
};

const deleteItem = (itemId, token) => {
  return handleRequest(`${BASE_URL}/items/${itemId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

const api = { getItems, addItem, deleteItem, handleServerResponse };

export default api;
