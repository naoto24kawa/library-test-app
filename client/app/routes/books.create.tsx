import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import {
  json,
  redirect,
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createFileUploadHandler as createFileUploadHandler,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData,
} from "@remix-run/node";
import { Form, useLoaderData, useActionData } from "@remix-run/react";
import { css } from "../../styled-system/css";
import axios from "../utils/axios";
import { form } from "../styles/form.css";
import { button } from "../styles/button.css";
import { ImageUtil } from "../utils/ImageUtil";
import { useEffect, useState } from "react";

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const uploadHandler = composeUploadHandlers(createMemoryUploadHandler());
  const formData = await parseMultipartFormData(request, uploadHandler);

  const form = new FormData();

  const image = formData.get("cover");
  console.log("-image---------");
  console.log(image);

  if (image instanceof Blob) {
    console.log("-image instanceof Blob---------");
    form.append("cover", image);

    // const objectURL = URL.createObjectURL(image);
    // return json({ error: null, imgSrc: objectURL });
  } else {
    console.log("画像が見つからないか、Blobではありません");
  }

  const data = Object.entries(formData);
  console.log("-data---------");
  console.log(data);

  const title = formData.get("title");
  if (typeof title === "string") {
    console.log("-title---------");
    form.append("title", title);
  }

  const description = formData.get("description");
  if (typeof description === "string") {
    console.log("-description---------");
    form.append("description", description);
  }

  const amount = formData.get("amount");
  if (typeof amount === "string") {
    console.log("-amount---------");
    form.append("amount", amount);
  }

  console.log("-form---------");
  console.log(json(form));

  try {
    // フォームデータを処理し、APIにPOSTリクエストを送信
    const response = await axios.post(`/test/create`, form, request, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // 成功した場合、更新された本の詳細ページにリダイレクト
    return redirect(`/books`);
  } catch (error) {
    // エラーが発生した場合、エラーメッセージを返す
    console.error(error);
    return json({ error: "更新に失敗しました。" }, { status: 400 });
  }
};

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  // try {
  //   const response = await axios.get<Book>(`/test/${params.bookId}`, request);
  //   if (!response.data) {
  //     throw new Response("Not Found", { status: 404 });
  //   }
  //   return response.data;
  // } catch (error) {
  //   console.log(error);
  //   return null;
  // }
  return null;
};

export default function BooksCreate() {
  // const book = useLoaderData<typeof loader>();

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
  const data = useActionData<typeof action>();

  return (
    <>
      <h1>{`books.create.tsx`}</h1>
      <h4 className="mb-3">Library Register</h4>
      <label>Detail</label>
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
            defaultValue={"title"}
            // onChange={handleChange}
            // disabled={processing}
            required
          />
        </fieldset>
        {/* <fieldset className={formClass.group}>
          <span className={formClass.label}>Author</span>
          <input
            autoComplete="off"
            list="authors"
            className={formClass.control}
            // disabled={processing}
          />
        </fieldset> */}
        {/* {{-- Publisher --}} */}
        {/* <fieldset className={formClass.group}>
          <span className={formClass.label}>Publisher</span>
          <input
            autoComplete="off"
            list="publishers"
            className={formClass.control}
            // disabled={processing}
          />
        </fieldset> */}
        {/* {{-- Description --}} */}
        <fieldset className={formClass.group}>
          <span className={formClass.label}>Description</span>
          <input
            name="description"
            className={formClass.control}
            defaultValue={"description"}
            // onChange={handleChange}
            // disabled={processing}
          />
        </fieldset>
        {/* {{-- Amount --}} */}
        <fieldset className={formClass.group}>
          <span className={formClass.label}>Amount</span>
          <input
            type="number"
            name="amount"
            className={formClass.control}
            defaultValue={1}
            required
            // disabled={processing}
          />
        </fieldset>

        {/* {{-- Image --}} */}
        <fieldset className={formClass.group}>
          <span className={formClass.label}>Image</span>
          <input
            type="file"
            name="cover"
            className={formClass.control}
            // disabled={processing}
            onChange={async function (e) {
              if (e?.target?.files) {
                const compressedImage =
                  await ImageUtil.getCompressImageFileAsync(e.target.files[0]);

                // compressedImageがBlobまたはFileの場合
                const blob =
                  compressedImage instanceof Blob
                    ? compressedImage
                    : await fetch(URL.createObjectURL(compressedImage)).then(
                        (r) => r.blob()
                      );

                // BlobからFileオブジェクトを作成
                const compressedFile = new File(
                  [blob],
                  e.target.files[0].name,
                  { type: blob.type }
                );

                // 新しいFileListオブジェクトを作成
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(compressedFile);
                e.target.files = dataTransfer.files;
              }
            }}
          />
        </fieldset>
        {/* <div
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
        </div> */}
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

      {/* {data?.error ? <h2>{data.error}</h2> : null}

      {data?.imgSrc ? (
        <>
          <h2>uploaded image</h2>
          <img alt="uploaded" src={data.imgSrc} />
        </>
      ) : null} */}
    </>
  );
}
