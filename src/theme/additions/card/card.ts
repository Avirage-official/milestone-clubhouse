import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";
const Card = {
  baseStyle: (props: StyleFunctionProps) => ({
    p: "20px",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    position: "relative",
    borderRadius: "24px",
    minWidth: "0px",
    wordWrap: "break-word",
    bg: mode("#ffffff", "navy.800")(props),
    backgroundClip: "border-box",
    boxShadow: mode(
      "0 4px 20px 0 rgba(112, 144, 176, 0.12)",
      "0 4px 20px 0 rgba(0, 0, 0, 0.2)"
    )(props),
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    _hover: {
      transform: "translateY(-4px)",
      boxShadow: mode(
        "0 12px 28px 0 rgba(112, 144, 176, 0.2)",
        "0 12px 28px 0 rgba(0, 0, 0, 0.35)"
      )(props),
    },
  }),
};

export const CardComponent = {
  components: {
    Card,
  },
};
