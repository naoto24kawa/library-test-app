import {
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData,
} from "@remix-run/node";
import isEmpty from "validator/lib/isEmpty";
import isLength from "validator/lib/isLength";

import { authenticator } from "../../services/auth.server";
import axios from "../../utils/axios";
import { setValidationErrors } from "../../utils/validator";

import type {
  ValidationErrorResponse,
  ValidationError,
} from "../../utils/validator";

export const setupForm = async (request: Request) => {
  try {
    const response = await axios.get<{
      authors: Author[];
      publishers: Publisher[];
    }>(`/api/test/form/book`, {
      headers: {
        Authorization: `Bearer ${
          (
            await authenticator.isAuthenticated(request)
          )?.token
        }`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Response(`エラー: ${error.message}`, {
        status: error.response?.status || 500,
      });
    } else {
      throw new Response("予期せぬエラーが発生しました", { status: 500 });
    }
  }
};

export const getFormData = async (
  request: Request
): Promise<FormData | ValidationErrorResponse> => {
  try {
    // Convert multipart/form-data to FormData
    const data = await multipartFormDataToFormData(request);

    // Validate FormData
    const { validationErrors, hasErrors } = setValidationErrors([
      validateTitle(data),
      validateAmount(data),
    ]);

    if (hasErrors) {
      return validationErrors;
    }

    return data;
  } catch (error) {
    throw new Response("フォームデータの処理中にエラーが発生しました", {
      status: 500,
    });
  }
};

const multipartFormDataToFormData = async (
  request: Request
): Promise<FormData> => {
  try {
    const uploadHandler = composeUploadHandlers(createMemoryUploadHandler());
    const multipartFormData = await parseMultipartFormData(
      request,
      uploadHandler
    );

    const data = new FormData();
    for (const [key, value] of multipartFormData) {
      data.append(key, value);
    }
    return data;
  } catch (error) {
    throw new Response(
      "マルチパートフォームデータの処理中にエラーが発生しました",
      { status: 400 }
    );
  }
};

const validateTitle = (data: FormData): ValidationError => {
  // title
  const title = data.get("title")?.toString();

  const titleErrors: string[] = [];
  if (!title || isEmpty(title)) {
    // required
    titleErrors.push("Title is required");
  } else {
    // max length
    if (isLength(title, { max: 120 })) {
      titleErrors.push("Title is too long");
    }
  }

  return ["title", titleErrors];
};

const validateAmount = (data: FormData): ValidationError => {
  // amount
  const amount = data.get("amount");
  const amountErrors: string[] = [];

  if (!amount || isEmpty(amount.toString())) {
    // required
    amountErrors.push("Amount is required");
  } else {
    const numAmount = Number(amount);
    if (isNaN(numAmount)) {
      amountErrors.push("Amount is not a valid number");
    } else if (!Number.isInteger(numAmount)) {
      amountErrors.push("Amount must be an integer");
    } else if (numAmount < 0) {
      amountErrors.push("Amount must be greater than 0");
    }
  }

  return ["amount", amountErrors];
};
