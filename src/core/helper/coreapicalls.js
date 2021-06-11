import { API } from "../../backend";

export const getAllProducts = () => {
  return fetch(`${API}/products`, { method: "GET" })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
