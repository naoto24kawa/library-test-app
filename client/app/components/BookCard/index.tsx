// import { css } from "@emotion/react";
import type React from "react";

import { Form, Link, useNavigate } from "@remix-run/react";
import {
  BsPencil,
  BsTrash,
  BsArrowReturnLeft,
  BsCart,
  BsCartCheck,
} from "react-icons/bs";

import { APP_STORAGE_URL } from "../../../conf";
import { css } from "../../../styled-system/css";
import { flex } from "../../../styled-system/patterns";

type Props = {
  book: Book;
  userId: number;
};

const BookCardComponent: React.FunctionComponent<Props> = ({ book }) => {
  const returnDate = book.returnDate;
  const isRentable = book.isRentable;
  const isProgress = book.isProgress;

  const navigate = useNavigate();
  const handleDetailPage = () => {
    navigate(`/books/${book.id}`);
  };

  return (
    <div
      className={flex({
        flexDirection: "column",
        bg: "white",
        fontSize: "sm",
        border: "1px solid",
        borderColor: "gray.200",
        borderRadius: "sm",
        overflow: "hidden",
        _hover: {
          shadow: "sm",
        },
      })}
      key={book.id}
    >
      {/* カバー画像 */}
      <div
        id="card-image"
        className={css({
          display: "flex",
          width: "100%",
          justifyContent: "center",
        })}
        onClick={handleDetailPage}
      >
        {book?.img_path ? (
          <img
            className={css({
              aspectRatio: "3/4",
              maxHeight: "250px",
              objectFit: "cover",
              objectPosition: "center",
            })}
            src={`${APP_STORAGE_URL}/images/books/${book.img_path}`}
            alt={book.title}
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
              width: "calc(250px * 3 / 4)",
              borderRadius: "sm",
              marginRight: "4",
              flexShrink: 0,
            })}
          >
            {book.title || "No Image"}
          </div>
        )}
      </div>
      {/* アクションボタン */}
      <div
        id="card-button"
        className={css({
          width: "100%",
          borderTop: "1px solid",
          borderBottom: "1px solid",
          borderColor: "gray.200",
        })}
      >
        {isProgress ? (
          <Form
            method="post"
            className={css({
              width: "100%",
            })}
          >
            <input type="hidden" name="bookId" value={book.id} />
            <button
              type="submit"
              name="_action"
              value="return"
              className={css({
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                padding: "2",
              })}
            >
              <span className={css({ display: "flex", alignItems: "center" })}>
                Return
                <BsArrowReturnLeft className={css({ marginLeft: "1" })} />
              </span>
            </button>
          </Form>
        ) : isRentable ? (
          <Link
            className={css({
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              padding: "2",
            })}
            to={`/books/rental/${book.id}`}
          >
            <span className={css({ display: "flex", alignItems: "center" })}>
              Rental
              <BsCart className={css({ marginLeft: "1" })} />
            </span>
          </Link>
        ) : (
          <div
            className={css({
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              padding: "2",
            })}
          >
            <span className={css({ display: "flex", alignItems: "center" })}>
              Rent Out
              <BsCartCheck className={css({ marginLeft: "1" })} />
            </span>
          </div>
        )}
      </div>
      {/* 本の情報 */}
      <div
        id="card-info"
        className={flex({
          flexDirection: "column",
          width: "100%",
          padding: "2",
        })}
        onClick={handleDetailPage}
      >
        <span>{book.title}</span>
        <span>{book.author?.name}</span>
        <span>{returnDate ? `Return Date:${returnDate}` : ""}</span>
      </div>
      {/* 管理者ボタン */}
      <div
        id="card-edit-button"
        className={flex({
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          width: "100%",
          paddingBottom: "2",
          paddingRight: "2",
          paddingLeft: "2",
          marginTop: "auto",
          gap: "2",
        })}
      >
        <Link to={`/books/update/${book.id}`}>
          <BsPencil />
        </Link>
        <Form method="post">
          <input type="hidden" name="bookId" value={book.id} />
          <button
            type="submit"
            name="_action"
            value="delete"
            className={flex({
              width: "auto",
              alignItems: "center",
            })}
          >
            <BsTrash />
          </button>
        </Form>
      </div>
    </div>
  );
};

export default BookCardComponent;
