import axios from "axios";

export const baseUrl = axios.create({
  baseURL: "https://bookread-backend.goit.global",
});

export function addAccessToken(token) {
  baseUrl.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export function clearAccessToken() {
  baseUrl.defaults.headers.common.Authorization = ``;
}
