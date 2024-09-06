import axiosOriginal from "axios";

import { APP_URL, APP_PORT } from "../../conf";
import { authenticator } from "../services/auth.server";

import type { AxiosRequestConfig } from "axios";

axiosOriginal.defaults.baseURL = `${APP_URL}:${APP_PORT}/api`; // TODO: .envから変数を取得するように変更する
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
    return axiosOriginal.get<T>(url, {
      ...config,
      headers: {
        ...config?.headers,
        Authorization: cookie ? `Bearer ${cookie.token}` : undefined,
      },
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
    return axiosOriginal.post<T>(url, data, {
      ...config,
      headers: {
        ...config?.headers,
        Authorization: cookie ? `Bearer ${cookie.token}` : undefined,
      },
    });
  },
  postMultipartForm: async <T>(
    url: string,
    data: FormData,
    request: Request | null,
    config?: AxiosRequestConfig
  ) => {
    const cookie = request
      ? await authenticator.isAuthenticated(request)
      : null;
    return axiosOriginal.post<T>(url, data, {
      ...config,
      headers: {
        ...config?.headers,
        "Content-Type": "multipart/form-data",
        Authorization: cookie ? `Bearer ${cookie.token}` : undefined,
      },
    });
  },
};

export default axios;
