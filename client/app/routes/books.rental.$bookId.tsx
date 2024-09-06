import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useActionData } from "@remix-run/react";

import { css } from "../../styled-system/css";
import { button } from "../styles/button.css";
import { form } from "../styles/form.css";
import axios from "../utils/axios";
import { dayjs } from "../utils/dayjs";

import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";

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

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const { _action, ...data } = Object.fromEntries(formData);

  if (_action === "rental") {
    console.log(`${dayjs().format("DD-MM-YYYY HH:mm:ss")}: called rental`);
    console.log(data);
    const response = await axios.post("/test/rental", data, request);
    console.log(response);
  }

  return redirect(`/users`); // TODO: 確認画面がほしい
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
      <h1>{`books.rental.$bookId.tsx(bookId: ${book?.id})`}</h1>
      <h4 className="mb-3">Library Register</h4>
      <label className="mb-1">Detail</label>
      <Form
        // onSubmit={handleSubmit}
        encType="multipart/form-data"
        // className="m-auto"
        className={formClass.root}
        method="post"
      >
        <input type="hidden" name="bookId" value={book?.id} />
        <fieldset className={formClass.group}>
          <span className={formClass.label}>Title</span>
          <input
            readOnly
            className={formClass.control}
            defaultValue={book?.title ?? ""}
          />
        </fieldset>
        <fieldset className={formClass.group}>
          <span className={formClass.label}>Author</span>
          <input
            className={formClass.control}
            value={book?.author?.name}
            readOnly
          />
        </fieldset>
        {/* {{-- Publisher --}} */}
        <fieldset className={formClass.group}>
          <span className={formClass.label}>Publisher</span>
          <input
            className={formClass.control}
            value={book?.publisher?.name}
            readOnly
          />
        </fieldset>

        <fieldset className={formClass.group}>
          <span className={formClass.label}>startDate</span>
          <input
            type="date"
            name="startDate"
            className={formClass.control}
            defaultValue={"2024-01-01"}
          />
        </fieldset>
        <fieldset className={formClass.group}>
          <span className={formClass.label}>endDate</span>
          <input
            type="date"
            name="endDate"
            className={formClass.control}
            defaultValue={"2024-01-01"}
          />
        </fieldset>
        <button
          type="submit"
          name="_action"
          value="rental"
          className={button()}
        >
          Rental
        </button>
      </Form>
    </>
  );
}
