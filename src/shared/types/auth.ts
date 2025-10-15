type AuthUser = {
  id: string;
  name: string;
  email: string;
};

type GoogleLoginResult = {
  user: AuthUser;
};

export { AuthUser, GoogleLoginResult };
