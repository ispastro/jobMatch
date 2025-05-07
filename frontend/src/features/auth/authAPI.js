import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth/';

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}login/`, userData);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('Login failed. Please try again.');
  }
};

export const registerNewUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}register/`, userData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw new Error('Registration failed. Please try again.');
  }
};
