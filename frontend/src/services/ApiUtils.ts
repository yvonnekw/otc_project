import axios, { AxiosInstance } from "axios";

export const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000",
});

export const basicHeader = {
  "Content-Type": "application/json",
};

export const REST_API_BASE_URL: string = "http://localhost:8000";

export const getLoginHeader = (): Record<string, string> => {
  const token: string | null = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};



/*
export const basicHeader = {
  "Content-Type": "application/json",
};

export const api = axios.create({
  baseURL: "http://localhost:8000",
});

export const REST_API_BASE_URL = "http://localhost:8000";

export const getLoginHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

*/
