import api from "../interceptions";

interface UserData {
  name: string;
  email: string;
  password: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

export const userService = {
  register: async (userData: UserData) => {
    return await api.post("/register", userData);
  },

  login: async (credentials: LoginCredentials) => {
    return await api.post("/login", credentials);
  },
};
