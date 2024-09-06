import { sva } from "../../styled-system/css";

export const form = sva({
  slots: ["root", "group", "control", "label"],
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      gap: "2",
      width: "100%",
      fontSize: "sm",
    },
    group: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    control: {
      flex: "1",
      bg: "white",
      borderWidth: "1px",
      borderColor: "gray.200",
      borderRadius: "sm",
      padding: "2",
    },
    label: { flexShrink: 0, paddingRight: "2" },
  },
  variants: {
    size: {
      sm: {
        label: { width: "60px" },
      },
      md: {
        label: { width: "80px" },
      },
      lg: {
        label: { width: "100px" },
      },
    },
  },
  defaultVariants: {
    size: "lg",
  },
});
