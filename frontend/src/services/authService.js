import axios from "axios";

const API_URL = "http://localhost:5001/api/auth";

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

export const googleAuthUser = async (credential) => {
  const response = await axios.post(`${API_URL}/google`, { credential });
  return response.data;
};

export const getCurrentUser = async (token) => {
  const response = await axios.get(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};