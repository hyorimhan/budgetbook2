import axios from 'axios';
import { setUserInfo } from '../store/slices/userSlice';
import { userUrl } from '../url/url';

export const fetchUserInfo = async (isAuthenticated, dispatch) => {
  try {
    const response = await axios.get(`${userUrl}/user`, {
      headers: {
        Authorization: `Bearer ${isAuthenticated}`,
      },
    });
    dispatch(setUserInfo(response.data));
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user info:', error);
  }
};
