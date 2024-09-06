import { css } from "../../../styled-system/css";

export default function Spinner() {
  return (
    <div
      className={css({
        position: "fixed",
        top: "0px",
        left: "0px",
        width: "100%",
        height: "100%",
        background: "black",
        opacity: 0.5,
        zIndex: 999,
      })}
    >
      <span
        className={css({
          position: "absolute",
          left: "50%",
          top: "50%",
          width: "48px",
          height: "48px",
          border: "5px solid",
          borderColor: "gray",
          borderBottomColor: "transparent",
          borderRadius: "50%",
          display: "inline-block",
          boxSizing: "border-box",
          animation: "rotation 1s linear infinite",
          animationName: "spin",
        })}
      ></span>
    </div>
  );
}
