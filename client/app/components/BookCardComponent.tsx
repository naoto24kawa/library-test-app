// import { css } from "@emotion/react";
import { Form, Link, useLocation } from "@remix-run/react";
import React from "react";
import { dayjs } from "../utils/dayjs";
// import RentalFormComponent from "./RentalFormComponent";
// import useModal from "../utils/hooks/useModal";
// import { ModalTypeEnum } from "../../js/states/modal";
import { css } from "../../styled-system/css";
import { vstack, hstack } from "../../styled-system/patterns";
import { button } from "../styles/button.css";
import { BsPencil, BsTrash } from "react-icons/bs";

type Props = {
  book: Book;
  userId: number;
};

const BookCardComponent: React.FunctionComponent<Props> = ({
  book,
  userId,
}) => {
  const returnDate = dayjs.min(
    book?.in_progress?.map((user) => dayjs(user.pivot?.end_date)) ?? []
  );
  const isRentable = (book?.amount ?? 0) > (book?.in_progress?.length ?? 0);
  const isBorrowed = book?.in_progress?.map((user) => user.id).includes(userId);
  // console.log(`----------`);
  // console.log(`bookId: ${book.id}`);
  // console.log(`returnDate: ${returnDate}`);
  // console.log(`isRentable: ${isRentable}`);
  // console.log(`isBorrowed: ${isBorrowed}`);

  const location = useLocation();
  return (
    <div className={hstack()} key={book.id}>
      {/* <BookCardComponent user={user} book={book} /> */}
      {book?.img_path && (
        <img
          src={`http://localhost:80/storage/images/books/${book.img_path}`}
          // className="card-img h-100"
          className={css({
            maxWidth: "300px",
            objectFit: "cover",
            objectPosition: "center",
          })}
          alt=""
        />
      )}
      <div className={vstack()}>
        <div>{book.title}</div>
        <div>{book.author?.name}</div>
        {returnDate && (
          <div>Return Date:{returnDate?.format("YYYY-MM-DD")}</div>
        )}
        <div>
          <Link className={button({ width: "auto" })} to={`/books/${book.id}`}>
            Detail
          </Link>
          <Link to={`/books/update/${book.id}`}>
            <BsPencil />
          </Link>
          {location.pathname.startsWith("/books") && (
            <>
              {/* // <Form method="post">
              //   <input type="hidden" name="bookId" value={book.id} />
              //   <button
              //     type="submit"
              //     name="_action"
              //     value="rental"
              //     className={button({
              //       width: "1/3",
              //       disabled: isBorrowed || !isRentable,
              //     })}
              //   >
              //     {isBorrowed ? "Borrowed" : isRentable ? "Rental" : "Rent Out"}
              //   </button>
              // </Form> */}
              <Link
                className={button({
                  width: "auto",
                  disabled: isBorrowed || !isRentable,
                })}
                to={`/books/rental/${book.id}`}
              >
                {isBorrowed ? "Borrowed" : isRentable ? "Rental" : "Rent Out"}
              </Link>
              <Form method="post">
                <input type="hidden" name="bookId" value={book.id} />
                <button type="submit" name="_action" value="delete">
                  <BsTrash />
                </button>
              </Form>
            </>
          )}
          {location.pathname.startsWith("/users") && (
            <Form method="post">
              <input type="hidden" name="bookId" value={book.id} />
              <button
                type="submit"
                name="_action"
                value="return"
                className={button({
                  width: "1/4",
                  disabled: isBorrowed || !isRentable,
                })}
              >
                Return
              </button>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCardComponent;
