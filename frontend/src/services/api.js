import axios from "axios";

export const sendTokenToBackend = async (token) => {
  return axios.post(
    "http://localhost:8000/api/auth/register",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
