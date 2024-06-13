import axios from 'axios';
import { jsonUrl, userUrl } from '../url/url';

export const postList = async () => {
  const response = await axios.get(`${jsonUrl}`);
  return response.data;
};

export const registerUser = async (formData) => {
  const response = await axios.post(`${userUrl}/register`, formData);
  return response.data;
};

export const loginUser = async (loginData) => {
  const response = await axios.post(`${userUrl}/login`, loginData);
  return response.data;
};

export const updateUser = async (userName, userAvatar, isAuthenticated) => {
  const formData = new FormData();
  formData.append('nickname', userName);
  if (userAvatar) {
    formData.append('avatar', userAvatar);
  }
  const response = await axios.patch(`${userUrl}/profile`, formData, {
    headers: {
      Authorization: `Bearer ${isAuthenticated}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
