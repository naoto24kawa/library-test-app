import { useState } from "react";

import { Form } from "@remix-run/react";

import { STORAGE_URL } from "../../../conf";
import { css } from "../../../styled-system/css";
import { form } from "../../style.css";
import { ImageUtil } from "../../utils/ImageUtil";

import type { ValidationErrors } from "./server";

type Props = {
  authors: Author[];
  publishers: Publisher[];
  book?: Book;
  errors?: ValidationErrors;
};

const BookForm: React.FC<Props> = ({
  authors,
  publishers,
  book,
  errors,
}: Props) => {
  // style
  const { root, group, control, label } = form.raw({ size: "lg" });
  const [title, setTitle] = useState(book?.title);
  const [imageURL, setImageURL] = useState<string | null>(
    book?.img_path ? `${STORAGE_URL}/images/books/${book?.img_path}` : null
  );
  return (
    <div className={css({ display: "flex", flexDirection: "row" })}>
      {imageURL ? (
        <img
          className={css({
            aspectRatio: "3/4",
            maxHeight: "250px",
            objectFit: "cover",
            objectPosition: "center",
            borderRadius: "sm",
            marginRight: "4",
          })}
          src={imageURL}
          alt="book"
        />
      ) : (
        <div
          className={css({
            display: "flex",
            justifyContent: "center",
            color: "white",
            backgroundColor: "gray.300",
            alignItems: "center",
            height: "250px",
            width: "187.5px",
            borderRadius: "sm",
            marginRight: "4",
            flexShrink: 0,
          })}
        >
          {title || "No Image"}
        </div>
      )}
      <Form method="post" encType="multipart/form-data" className={css(root)}>
        {/* Title */}
        <fieldset className={css(group)}>
          <span className={css(label)}>Title</span>
          <input
            name="title"
            type="text"
            className={
              errors?.title
                ? css(control, { borderColor: "red" })
                : css(control)
            }
            defaultValue={book?.title}
            onChange={(e) => setTitle(e.target.value)}
            // required
          />
        </fieldset>
        {errors?.title && (
          <p className={css({ marginLeft: "109px", color: "red" })}>
            {errors.title}
          </p>
        )}
        {/* Author */}
        <fieldset className={css(group)}>
          <span className={css(label)}>Author</span>
          <input
            name="author"
            autoComplete="off"
            list="authors"
            className={css(control)}
            defaultValue={book?.author?.name}
          />
          <datalist id="authors">
            {authors.map((author) => (
              <option key={author.id} value={author.name} />
            ))}
          </datalist>
        </fieldset>
        {/* Publisher */}
        <fieldset className={css(group)}>
          <span className={css(label)}>Publisher</span>
          <input
            name="publisher"
            autoComplete="off"
            list="publishers"
            className={css(control)}
            defaultValue={book?.publisher?.name}
          />
          <datalist id="publishers">
            {publishers.map((publisher) => (
              <option key={publisher.id} value={publisher.name} />
            ))}
          </datalist>
        </fieldset>
        {/* Description */}
        <fieldset className={css(group)}>
          <span className={css(label)}>Description</span>
          <input
            name="description"
            className={css(control)}
            defaultValue={book?.description}
          />
        </fieldset>
        {/* Amount */}
        <fieldset className={css(group)}>
          <span className={css(label)}>Amount</span>
          <input
            type="number"
            name="amount"
            className={css(control)}
            defaultValue={book?.amount || 1}
            required
          />
        </fieldset>
        {/* Image */}
        <fieldset className={css(group)}>
          <span className={css(label)}>Image</span>
          <input
            type="file"
            name="image"
            className={css(control)}
            onChange={async (e) => {
              await handleImageCompressAsync(e);
              setImageURL(await handleGetImageURLAsync(e));
            }}
          />
        </fieldset>
        <div className={css({ display: "flex" })}>
          <button
            type="submit"
            className={css({
              marginLeft: "auto",
              padding: "2",
              bg: "blue.500",
              color: "white",
              borderRadius: "sm",
            })}
          >
            Submit
          </button>
        </div>
      </Form>
    </div>
  );
};

// 画像圧縮処理
const handleImageCompressAsync = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  if (e?.target?.files) {
    const compressedImage = await ImageUtil.getCompressImageFileAsync(
      e.target.files[0]
    );

    // compressedImageがすでにBlobまたはFileなので、直接使用可能
    const compressedFile = new File([compressedImage], e.target.files[0].name, {
      type: compressedImage.type,
    });

    // 新しいFileListオブジェクトを作成
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(compressedFile);
    e.target.files = dataTransfer.files;
  }
};

const handleGetImageURLAsync = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  if (e?.target?.files) {
    const imageURL = await ImageUtil.getImageURLAsync(e.target.files[0]);
    return imageURL;
  }
  return null;
};

export { BookForm };
