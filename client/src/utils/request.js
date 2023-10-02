/* eslint-disable no-restricted-globals */
import { endpoints } from "../constants/endpoints";
import { callToast } from "../utils/toast";
import axios from "axios";

const authorizationHeaders = {
  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
};

const getOptions = (method, url, data = {}, headers = {}) => {
  return {
    url: endpoints[url],
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
    data,
    withCredentials: true,
  };
};

const getResponse = async (options) => {
  try {
    const response = await axios(options);
    return response.data;
  } catch (e) {
    if (e.response?.data?.message === "Refresh token отсутствует") {
      location.href = "/login";
    }

    if (e.response.status === 401) {
      await request.refresh();
      return { tokenValid: false };
    }

    if (e.response.status === 400 || e.response.status === 500) {
      callToast("error", e.response?.data?.message);
    }
  }
};

export const request = {
  async registration(email, password) {
    try {
      const options = getOptions("POST", "registration", { email, password });

      const data = await getResponse(options);

      if (data?.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
      }

      return data;
    } catch (e) {
      callToast("error", e.message);
    }
  },
  async login(email, password) {
    try {
      const options = getOptions("POST", "login", { email, password });

      const data = await getResponse(options);

      if (data?.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
      }

      return data;
    } catch (e) {
      callToast("error", e.message);
    }
  },
  async logout() {
    try {
      const options = getOptions("POST", "logout");

      await getResponse(options);

      localStorage.removeItem("accessToken");
    } catch (e) {
      callToast("error", e.message);
    }
  },
  async users() {
    try {
      const options = getOptions("GET", "users", {}, authorizationHeaders);

      const data = await getResponse(options);

      //Условие, если токен просрочен (заново отправляется запрос с новыми заголовками после /refresh)
      if (data.tokenValid === false) {
        return request.users();
      }

      return data || [];
    } catch (e) {
      callToast("error", e.message);
    }
  },
  async messages() {
    try {
      const options = getOptions("GET", "messages", {}, authorizationHeaders);

      const data = await getResponse(options);

      //Условие, если токен просрочен (заново отправляется запрос с новыми заголовками после /refresh)
      if (data.tokenValid === false) {
        return request.messages();
      }

      return data || [];
    } catch (e) {
      callToast("error", e.message);
    }
  },
  async refresh() {
    try {
      const options = getOptions("GET", "refresh");

      const data = await getResponse(options);

      if (data?.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
      }
    } catch (e) {
      callToast("error", e.message);
    }
  },
  async sendMessage(message, userId) {
    try {
      const options = getOptions(
        "POST",
        "sendMessages",
        {
          message,
          userId,
        },
        authorizationHeaders
      );

      const data = await getResponse(options);

      //Условие, если токен просрочен (заново отправляется запрос с новыми заголовками после /refresh)
      if (data.tokenValid === false) {
        return request.sendMessage();
      }

      return data || [];
    } catch (e) {
      callToast("error", e.message);
    }
  },
};
