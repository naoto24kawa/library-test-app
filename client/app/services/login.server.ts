import axios from "../utils/axios";
import { Authentication } from "../types/Authentication";

export async function login(
  email: string,
  password: string
): Promise<Authentication> {
  // DBからuserを取得する処理が入る
  const response = await axios.post<Authentication>(
    "/login",
    { email, password },
    null
  );
  return response.data;
}
