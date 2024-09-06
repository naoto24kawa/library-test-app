import { cva } from "../../styled-system/css";

export const button = cva({
  base: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    bg: "white",
    padding: "2",
    borderWidth: "1px",
    borderRadius: "sm",
    borderColor: "gray.200",
    _hover: {
      shadow: "md",
      cursor: "pointer",
    },
  },
  variants: {
    type: {
      default: { color: "black" },
      danger: { color: "red", borderColor: "red" },
    },
    size: {
      small: { padding: "8px", fontSize: "12px" },
      large: { padding: "16px", fontSize: "16px" },
    },
    width: {
      "1/2": { width: "1/2" },
      "1/3": { width: "1/3" },
      "1/4": { width: "1/4" },
      auto: { width: "auto" },
    },
    disabled: {
      true: {
        color: "red",
        cursor: "not-allowed",
        _hover: {
          pointerEvents: "none",
        },
      },
    },
  },
  defaultVariants: {
    type: "default",
    size: "small",
    width: "auto",
    disabled: false,
  },
});
