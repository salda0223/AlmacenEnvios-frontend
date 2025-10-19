import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9000/api", 
  headers: { "Content-Type": "application/json" },
});


API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const registerUser = (userData) => API.post("/users/register", userData);
export const loginUser = (userData) => API.post("/users/login", userData);

export const getProducts = () => API.get("/products");
export const createProduct = (product) => API.post("/products", product);

export const getClients = () => API.get("/clients");
export const createClient = (client) => API.post("/clients", client);

export const getSales = () => API.get("/sales");
export const createSale = (sale) => API.post("/sales", sale);

export const getUsers = () => API.get("/users");
export const updateUser = (id, data) => API.put(`/users/${id}`, data);
export const deleteUser = (id) => API.delete(`/users/${id}`);



export default API;
