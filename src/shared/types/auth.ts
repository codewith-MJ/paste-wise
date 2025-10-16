type AuthUser = {
  id: string;
  name: string;
  email: string;
};

type LoginResponse = {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
};

export { AuthUser, LoginResponse };
