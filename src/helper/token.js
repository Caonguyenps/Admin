import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";

const cookies = new Cookies();
export const saveToken = (accessToken, refreshToken) => {
  cookies.set("accessToken", accessToken, { path: "/" });
  cookies.set("refreshToken", refreshToken, { path: "/" });
  return cookies;
};

export const saveNewAccessToken = (accessToken) => {
  cookies.set("accessToken", accessToken, { path: "/" });
  return cookies;
};

export const clearToken = () => {
  cookies.remove("accessToken", { path: "/" });
  return cookies;
};

export const getAccessToken = () => {
  const accessToken = cookies.get("accessToken");
  return accessToken;
};

export const getRefreshToken = () => {
  const refreshToken = cookies.get("refreshToken");
  return refreshToken;
};

export const getUserID = () => {
  const accessToken = cookies.get("accessToken");
  if (accessToken) {
    const decoded = jwt_decode(accessToken);
    return decoded.data._id;
  }
};
