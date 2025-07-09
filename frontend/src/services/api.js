import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;   //.env파일에서 API 주소 불러오기


export const sendTokenToBackend = async (token) => {
  return axios.post(
    `${API_BASE_URL}/api/auth/register`, // 👈 baseURL을 직접 포함
	// "/api/auth/register",	  
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
