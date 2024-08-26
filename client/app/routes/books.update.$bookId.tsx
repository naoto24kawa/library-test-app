import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useActionData } from "@remix-run/react";
import { css } from "../../styled-system/css";
import axios from "../utils/axios";
import { form } from "../styles/form.css";
import { button } from "../styles/button.css";

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  console.log(formData.get("title"));

  try {
    // フォームデータを処理し、APIにPOSTリクエストを送信
    const response = await axios.post(
      `/test/update/${params.bookId}`,
      {
        title: formData.get("title"),
      },
      request
    );
    console.log(response);

    // 成功した場合、更新された本の詳細ページにリダイレクト
    return redirect(`/books/${params.bookId}`);
  } catch (error) {
    // エラーが発生した場合、エラーメッセージを返す
    console.error(error);
    return json({ error: "更新に失敗しました。" }, { status: 400 });
  }
};

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  try {
    const response = await axios.get<Book>(`/test/${params.bookId}`, request);
    if (!response.data) {
      throw new Response("Not Found", { status: 404 });
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default function BooksBookId() {
  const book = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  console.log(actionData);

  // const [file, setFile] = useState<File | undefined>(undefined);
  // const [preview, setPreview] = useState<boolean>(false);
  // const [previewSrc, setPreviewSrc] = useState<string | undefined>(undefined);

  // //メモリ内のBLOBにアクセスするためのURL生成
  // useEffect(() => {
  //   if (file) {
  //     setPreviewSrc(URL.createObjectURL(file));
  //     setPreview(true);
  //   }
  // }, [file]);

  const formClass = form();

  return (
    <>
      <h1>{`books.update.$bookId.tsx(bookId: ${book?.id})`}</h1>
      <h4 className="mb-3">Library Register</h4>
      <label className="mb-1">Detail</label>
      <Form
        // onSubmit={handleSubmit}
        encType="multipart/form-data"
        // className="m-auto"
        className={formClass.root}
        method="post"
      >
        <fieldset className={formClass.group}>
          <span className={formClass.label}>Title</span>
          <input
            name="title"
            type="text"
            className={formClass.control}
            defaultValue={book?.title ?? ""}
            // onChange={handleChange}
            // disabled={processing}
            required
          />
        </fieldset>
        <fieldset className={formClass.group}>
          <span className={formClass.label}>Author</span>
          <input
            autoComplete="off"
            list="authors"
            className={formClass.control}
            defaultValue={book?.author?.name}
            // disabled={processing}
          />
        </fieldset>
        {/* {{-- Publisher --}} */}
        <fieldset className={formClass.group}>
          <span className={formClass.label}>Publisher</span>
          <input
            autoComplete="off"
            list="publishers"
            className={formClass.control}
            defaultValue={book?.publisher?.name}
            // disabled={processing}
          />
        </fieldset>
        {/* {{-- Description --}} */}
        <fieldset className={formClass.group}>
          <span className={formClass.label}>Description</span>
          <input
            name="description"
            className={formClass.control}
            defaultValue={book?.description ?? ""}
            // onChange={handleChange}
            // disabled={processing}
          />
        </fieldset>
        {/* {{-- Amount --}} */}
        <fieldset className={formClass.group}>
          <span className={formClass.label}>Amount</span>
          <input
            type="number"
            className={formClass.control}
            defaultValue={book?.amount}
            required
            // disabled={processing}
          />
        </fieldset>

        {/* {{-- Image --}} */}
        <fieldset className={formClass.group}>
          <span className={formClass.label}>Image</span>
          <input
            className={formClass.control}
            defaultValue={book?.img_path}
            // disabled={processing}
          />
        </fieldset>
        <div
          // className="row w-100 m-0"
          className={css({
            // display: preview ? "" : "none",
            display: "none",
          })}
        >
          {book?.img_path && (
            <div className="col p-0">
              変更前
              <img
                className="form-control p-0"
                src={`http://localhost:80/storage/images/books/${book.img_path}`}
                alt={`${book?.title}の表紙`}
              />
            </div>
          )}
          <div className="col p-0">
            変更後
            <img
              className="form-control p-0"
              // src={previewSrc}
              alt={`${book?.title}の表紙`}
            />
          </div>
        </div>
        <div className="row my-2">
          <button
            type="submit"
            // disabled={processing}
            className={button()}
          >
            Register
          </button>
        </div>
      </Form>
    </>
  );
}
