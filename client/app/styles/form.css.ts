import { sva } from "../../styled-system/css";

export const form = sva({
  slots: ["root", "group", "control", "label"],
  base: {
    root: { display: "flex", flexDirection: "column", gap: "2", padding: "2" },
    group: { display: "flex", flexDirection: "row", gap: "2" },
    control: {
      borderWidth: "1px",
      borderColor: "gray.300",
      borderRadius: "sm",
      padding: "1",
    },
    label: { display: "block", padding: "1" },
  },
  variants: {
    size: {
      sm: {
        root: { maxWidth: "300px" },
        control: { width: "2/3", fontSize: "sm" },
        label: { width: "1/3", fontSize: "sm" },
      },
      md: {
        root: { maxWidth: "600px" },
        control: { width: "1/3", fontSize: "md" },
        label: { width: "2/3", fontSize: "md" },
      },
      lg: {
        root: { maxWidth: "100%" },
        control: { width: "1/4", fontSize: "lg" },
        label: { width: "3/4", fontSize: "lg" },
      },
    },
  },
  defaultVariants: {
    size: "sm",
  },
});
