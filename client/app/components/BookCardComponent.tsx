// import { css } from "@emotion/react";
import { Link } from "@remix-run/react";
import React from "react";
import { dayjs } from "../utils/dayjs";
// import RentalFormComponent from "./RentalFormComponent";
// import useModal from "../utils/hooks/useModal";
// import { ModalTypeEnum } from "../../js/states/modal";
import { css } from "../../styled-system/css";
import { vstack, hstack } from "../../styled-system/patterns";
import { button } from "../styles/button.css";

type Props = {
  // user: User;
  book: Book;
  isDetail?: boolean;
};

const BookCardComponent: React.FunctionComponent<Props> = ({
  // user,
  book,
  isDetail = false,
}) => {
  // const returnDate = dayjs.min(
  //   book.in_progress?.map((user) => dayjs(user.pivot?.end_date)) ?? []
  // );
  // const isRentable = (book.amount ?? 0) > (book.in_progress?.length ?? 0);
  // const isBorrowed = user.in_progress?.map((book) => book.id).includes(book.id);

  // const [, setIsOpen] = useModal(ModalTypeEnum.rental);

  return (
    <div className={hstack()} key={book.id}>
      {/* <BookCardComponent user={user} book={book} /> */}
      <img
        src={`http://localhost:80/storage/images/books/${book.img_path}`}
        // className="card-img h-100"
        className={css({
          objectFit: "cover",
          objectPosition: "center",
          borderBottomRightRadius: 0,
          borderTopRightRadius: 0,
        })}
        alt=""
      />
      <div className={vstack()}>
        <div>{book.title}</div>
        <div>{book?.author?.name}</div>
        <div className={hstack()}>
          <Link className={button({ width: "1/2" })} to={`/books/${book.id}`}>
            Detail
          </Link>
          <Link
            className={button({ width: "1/2" })}
            to={`/books/update/${book.id}`}
          >
            {/* {isBorrowed ? "Borrowed" : isRentable ? "Rental" : "Rent Out"} */}
            edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCardComponent;
