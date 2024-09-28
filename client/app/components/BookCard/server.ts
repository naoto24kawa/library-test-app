import axios from "../../utils/axios";

export const rentalBook = async (request: Request) => {
  try {
    const formData = await request.formData();

    const bookId = formData.get("bookId");
    if (!bookId) {
      throw new Response(`Bad Request: ("bookId" is required)`, {
        status: 400,
      });
    }

    const response = await axios.post("/api/test/rental", formData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axiosのエラーを処理
      throw new Response(`エラー: ${error.message}`, {
        status: error.response?.status || 500,
      });
    } else {
      // その他のエラーを処理
      throw new Response("予期せぬエラーが発生しました", { status: 500 });
    }
  }
};

export const returnBook = async (request: Request) => {
  try {
    const formData = await request.formData();

    const bookId = formData.get("bookId");
    if (!bookId) {
      throw new Response(`Bad Request: ("bookId" is required)`, {
        status: 400,
      });
    }

    const response = await axios.post("/api/test/return", formData);
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

export const deleteBook = async (request: Request) => {
  try {
    const formData = await request.formData();

    const bookId = formData.get("bookId");
    if (!bookId) {
      throw new Response(`Bad Request: ("bookId" is required)`, {
        status: 400,
      });
    }

    const response = await axios.post("/api/test/book/delete", formData);
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
