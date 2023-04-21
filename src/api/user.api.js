import axios from "axios";
import api from "../config/api";
import { getAccessToken, getUserID, saveToken } from "../helper/token";

export const refreshToken = (data) => {
  return new Promise(async (resolve, reject) => {
    await api
      .post("api/v1/token/refresh-token", data)
      .then((result) => {
        return resolve(result.data);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};

export const register = (data) => {
  return new Promise(async (resolve, reject) => {
    await api
      .post("/api/v1/user/register", data)
      .then((result) => {
        return resolve(result);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};

export const confirmOtpRegister = (data) => {
  return new Promise(async (resolve, reject) => {
    await api
      .post("/api/v1/user/verify-otp-register", data)
      .then((result) => {
        return resolve(result);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};

export const resendOTP = (data) => {
  return new Promise(async (resolve, reject) => {
    await api
      .post("/api/v1/user/resend-otp", data)
      .then((result) => {
        return resolve(result);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};

export const forgotPassword = (data) => {
  return new Promise(async (resolve, reject) => {
    await api
      .post("/api/v1/user/forgot-password", data)
      .then((result) => {
        return resolve(result);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};

export const updatePasswordForgot = (data, token) => {
  return new Promise(async (resolve, reject) => {
    await api
      .patch("/api/v1/user/new-password", data, {
        headers: {
          Authorization: token,
        },
      })
      .then((result) => {
        return resolve(result);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};

export const login = (data) => {
  return new Promise(async (resolve, reject) => {
    await api
      .post("/api/v1/admin/login", data)
      .then((result) => {
        console.log(result);
        return resolve(
          saveToken(result.data.accessToken, result.data.refreshToken)
        );
        // return resolve(result);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};

export const getUserInfor = () => {
  return new Promise(async (resolve, reject) => {
    await api
      .get(`/api/v1/user/profile/${getUserID()}`, {
        headers: {
          Authorization: getAccessToken(),
        },
      })
      .then((result) => {
        return resolve(result.data);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};

export const updateAvatar = (file) => {
  const formData = new FormData();
  formData.append("avatar", file);

  return new Promise(async (resolve, reject) => {
    await api
      .patch(`/api/v1/user/avatar/${getUserID()}`, formData, {
        headers: {
          Authorization: getAccessToken(),
        },
      })
      .then((result) => {
        return resolve(result.data);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};

export const addWishList = (data) => {
  return new Promise(async (resolve, reject) => {
    await api
      .post(`/api/v1/favourite/add`, data, {
        headers: {
          Authorization: getAccessToken(),
        },
      })
      .then((result) => {
        return resolve(result.data);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};

export const removeWishList = (data) => {
  return new Promise(async (resolve, reject) => {
    await api
      .post(`/api/v1/favourite/delete`, data, {
        headers: {
          Authorization: getAccessToken(),
        },
      })
      .then((result) => {
        return resolve(result.data);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};

export const getWishLists = () => {
  return new Promise(async (resolve, reject) => {
    await api
      .get(`/api/v1/favourite/lists/${getUserID()}`, {
        headers: {
          Authorization: getAccessToken(),
        },
      })
      .then((result) => {
        return resolve(result.data);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};

export const getDeliveryAddress = () => {
  return new Promise(async (resolve, reject) => {
    await api
      .get(`/api/v1/user/lists-delivery-address/${getUserID()}`, {
        headers: {
          Authorization: getAccessToken(),
        },
      })
      .then((result) => {
        return resolve(result.data);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};

export const getLocation = () => {
  return new Promise(async (resolve, reject) => {
    await axios
      .get(`https://provinces.open-api.vn/api/?depth=3`, {})
      .then((result) => {
        return resolve(result.data);
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};
