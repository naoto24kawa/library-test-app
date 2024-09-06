import { cva } from "../../styled-system/css";

// TODO: cvaに変えて良さそう
export const layout = cva({
  base: {
    maxWidth: { base: "100%", sm: "640px", md: "768px", lg: "1024px" },
    margin: "auto",
  },
});
