import { apiClient } from ".";

export const fetchUserData = async (userId: string) => {
  const response = await apiClient.get(`/api/users/${userId}`);
  return response.data;
};

export const updateUserData = async (userId: string, data: Partial<unknown>) => {
  const response = await apiClient.patch(`/api/users/${userId}`, data);
  return response.data;
};

export const createUserAccount = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await apiClient.post("/api/users", userData);
  return response.data;
};
