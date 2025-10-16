let accessToken: string | null = null;
let refreshToken: string | null = null;

const setAccessToken = (t: string | null) => {
  accessToken = t;
};

const getAccessToken = () => accessToken;

const setRefreshToken = (t: string | null) => {
  refreshToken = t;
};

const getRefreshToken = () => refreshToken;

const clearTokens = () => {
  accessToken = null;
  refreshToken = null;
};

export {
  setAccessToken,
  getAccessToken,
  setRefreshToken,
  getRefreshToken,
  clearTokens,
};
