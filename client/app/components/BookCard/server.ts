import axios from "../../utils/axios";

export const rentalBook = async (request: Request) => {
  const formData = await request.formData();

  const bookId = formData.get("bookId");
  if (!bookId) {
    throw new Response(`Bad Request: ("bookId" is required)`, { status: 400 });
  }

  const response = await axios.post("/test/rental", formData, request);
  return response;
};

export const returnBook = async (request: Request) => {
  const formData = await request.formData();

  const bookId = formData.get("bookId");
  if (!bookId) {
    throw new Response(`Bad Request: ("bookId" is required)`, { status: 400 });
  }

  const response = await axios.post("/test/return", formData, request);
  return response;
};

export const deleteBook = async (request: Request) => {
  const formData = await request.formData();

  const bookId = formData.get("bookId");
  if (!bookId) {
    throw new Response(`Bad Request: ("bookId" is required)`, { status: 400 });
  }

  const response = await axios.post("/test/book/delete", formData, request);
  return response;
};
