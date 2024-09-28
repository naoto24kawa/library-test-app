import axios from "axios";

import { APP_URL, APP_PORT, SERVER_URL, SERVER_PORT } from "../../conf";

// api server request path
axios.defaults.baseURL = `${SERVER_URL}:${SERVER_PORT}`;

// File送信のため
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

// Laravel Sanctumに認識させるためにOriginヘッダーを設定
axios.defaults.headers.common["Origin"] = `${APP_URL}:${APP_PORT}`;

// COOKIEの送信のため
axios.defaults.withCredentials = true;

let isCSRFTokenFetched = false;

// CSRFトークンを取得する関数
const getCsrfToken = async () => {
  if (isCSRFTokenFetched) {
    return;
  }

  try {
    await axios.get("/sanctum/csrf-cookie");
    isCSRFTokenFetched = true;
  } catch (error) {
    console.error("CSRFトークンの取得に失敗しました:", error);
    throw error;
  }
};

// API呼び出しの前にCSRFトークンを取得
// axios.interceptors.request.use(
//   async (config) => {
//     try {
//       await getCsrfToken();
//       return config;
//     } catch (error) {
//       console.error("リクエストインターセプターでエラーが発生しました:", error);
//       return Promise.reject(error);
//     }
//   },
//   (error) => {
//     console.error("リクエストインターセプターでエラーが発生しました:", error);
//     return Promise.reject(error);
//   }
// );

export default axios;
