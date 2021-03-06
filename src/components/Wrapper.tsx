import { Box } from "@chakra-ui/react";
import React from "react";

export type WrapperVariant = "small" | "regular";

interface WrapperProps {
  variant?: WrapperVariant;
}

const Wrapper: React.FC<WrapperProps> = ({ children, variant = "regular" }) => {
  return (
    <Box
      flex="1"
      maxW={variant === "regular" ? "1200px" : "400px"}
      width="100%"
      mx="auto"
    >
      {children}
    </Box>
  );
};

export default Wrapper;
