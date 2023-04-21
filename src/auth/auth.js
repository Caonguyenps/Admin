import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
import { refreshToken } from "../api/user.api";
import { getRefreshToken, saveNewAccessToken } from "../helper/token";
const cookies = new Cookies();

export const checkTimeToken = (token) => {
  const dataToken = jwt_decode(token);
  const timeToken = dataToken.exp;
  const timeNow = new Date().getTime();
  const compareTime = (timeNow - timeToken * 1000) / 60000;
  if (compareTime < 0) {
    return true;
  } else {
    return false;
  }
};

export const checkLogin = async () => {
  const accessToken = cookies.get("accessToken");
  if (accessToken) {
    const dataToken = jwt_decode(accessToken);
    const timeToken = dataToken.exp;
    const timeNow = new Date().getTime();
    const compareTime = (timeNow - timeToken * 1000) / 1000;
    if (compareTime < 0) {
      return true;
    } else {
      const data = {
        refreshToken: await getRefreshToken(),
      };
      await refreshToken(data).then((res) => {
        saveNewAccessToken(res.data.accessToken);
      });
      return true;
    }
  } else {
    return false;
  }
};

export const isLoggin = () => {
  const accessToken = cookies.get("accessToken");
  if (accessToken) {
    const dataToken = jwt_decode(accessToken);
    const timeToken = dataToken.exp;
    const timeNow = new Date().getTime();
    const compareTime = (timeNow - timeToken * 1000) / 1000;
    if (compareTime < 0) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
