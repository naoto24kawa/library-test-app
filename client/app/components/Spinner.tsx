import { css } from "../../styled-system/css";

export default function Spinner() {
  return (
    <span
      className={css({
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
  );
}

// {
//   .loader {
//     width: 48px;
//     height: 48px;
//     border: 5px solid #FFF;
//     border-bottom-color: transparent;
//     border-radius: 50%;
//     display: inline-block;
//     box-sizing: border-box;
//     animation: rotation 1s linear infinite;
//     }

//     @keyframes rotation {
//     0% {
//         transform: rotate(0deg);
//     }
//     100% {
//         transform: rotate(360deg);
//     }
//     }
// }
