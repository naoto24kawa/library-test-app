import axiosOriginal, { AxiosRequestConfig } from "axios";
import { authenticator } from "../services/auth.server";
import { json } from "@remix-run/node";

axiosOriginal.defaults.baseURL = "http://localhost/api"; // TODO: .envから変数を取得するように変更する
axiosOriginal.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

const axios = {
  get: async <T>(
    url: string,
    request: Request | null,
    config?: AxiosRequestConfig
  ) => {
    const cookie = request
      ? await authenticator.isAuthenticated(request)
      : null;
    return axiosOriginal
      .get<T>(url, {
        ...config,
        headers: {
          ...config?.headers,
          Authorization: cookie ? `Bearer ${cookie.token}` : undefined,
        },
      })
      .catch((error) => {
        // console.error(error);
        return json({ error: error.response.data }, { status: 400 });
      });
  },
  post: async <T>(
    url: string,
    data: any,
    request: Request | null,
    config?: AxiosRequestConfig
  ) => {
    const cookie = request
      ? await authenticator.isAuthenticated(request)
      : null;
    return axiosOriginal
      .post<T>(url, data, {
        ...config,
        headers: {
          ...config?.headers,
          Authorization: cookie ? `Bearer ${cookie.token}` : undefined,
        },
      })
      .catch((error) => {
        // console.error(error);
        return json({ error: error.response.data }, { status: 400 });
      });
  },
};

export default axios;
