import axios from "axios";

export const sendTokenToBackend = async (token) => {
  return axios.post(
	"/api/auth/register",	  
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
