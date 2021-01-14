export default {
  API_ENDPOINT:
    process.env.REACT_APP_API_BASE_URL || `http://localhost:8000/api`,
  TOKEN_KEY: process.env.TOKEN_KEY || "xword-auth-token",
};
