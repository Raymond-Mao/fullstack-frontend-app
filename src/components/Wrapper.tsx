import { Box } from "@chakra-ui/react";
import React, { FC } from "react";

export type WrapperVariant = "small" | "regular";
interface Wrapper {
  variant?: WrapperVariant;
}

const Wrapper: FC<Wrapper> = ({ children, variant = "regular" }) => {
  return (
    <Box
      maxW={variant === "regular" ? "800px" : "400px"}
      w="100%"
      mt={8}
      mx="auto"
    >
      {children}
    </Box>
  );
};

export default Wrapper;
