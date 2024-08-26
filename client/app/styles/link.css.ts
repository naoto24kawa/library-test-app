import { cva } from "../../styled-system/css";

export const link = cva({
  base: {
    borderWidth: "1px",
    borderRadius: "sm",
    borderColor: "gray",
    padding: "8px",
    fontSize: "12px",
    _hover: {
      shadow: "md",
      cursor: "pointer",
    },
  },
});
