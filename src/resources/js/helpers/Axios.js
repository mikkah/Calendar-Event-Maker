import axios from "axios"

const baseURL = process.env.MIX_API;

const apiConfig = {
  baseURL
} 

const api = axios.create(apiConfig);

export { api  };
