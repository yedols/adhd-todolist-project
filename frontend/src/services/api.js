import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;   //.env파일에서 API 주소 불러오기


export const sendTokenToBackend = async (idToken, fcmToken) => {
  return axios.post(
    `${API_BASE_URL}/api/auth/register`, // 👈 baseURL을 직접 포함
     
	// "/api/auth/register",	  
    { fcm_token: fcmToken },
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json"
      },
    }
  );
};

// ✅ 추가: 체크 상태 변경 PATCH 요청
export const updateTodoStatus = async (todoId, isChecked) => {
  const token = localStorage.getItem('accessToken');
  return axios.patch(`${API_BASE_URL}/api/todo/${todoId}/status?is_checked=${isChecked}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
