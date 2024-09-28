import axios from "../utils/axios";

import type { Authentication } from "../types/Authentication";
import type { AxiosError } from "axios";

export async function login(
  email: string,
  password: string
): Promise<Authentication> {
  try {
    // DBからuserを取得する処理が入る
    const response = await axios.post<Authentication>("/api/login", {
      email,
      password,
    });
    console.log(`Response(login.server.ts): ${JSON.stringify(response.data)}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // サーバーからのレスポンスがある場合
        console.error("ログインエラー:", axiosError.response.data);
        throw new Error(
          `ログインに失敗しました: ${
            (axiosError.response.data as { message?: string }).message ||
            "不明なエラー"
          }`
        );
      } else if (axiosError.request) {
        // リクエストは送信されたがレスポンスがない場合
        console.error("ネットワークエラー:", axiosError.request);
        throw new Error(
          "ネットワークエラーが発生しました。インターネット接続を確認してください。"
        );
      } else {
        // リクエストの設定中にエラーが発生した場合
        console.error("リクエストエラー:", axiosError.message);
        throw new Error("リクエストの設定中にエラーが発生しました。");
      }
    } else {
      // axiosエラー以外の場合
      console.error("予期せぬエラー:", error);
      throw new Error("予期せぬエラーが発生しました。");
    }
  }
}
