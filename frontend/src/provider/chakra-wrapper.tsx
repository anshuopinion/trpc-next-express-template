"use client";
import { theme } from "@/theme";
import { ChakraProvider } from "@chakra-ui/react";

export interface ChakraWrapperProps {
  children: React.ReactNode;
}

export function ChakraWrapper(props: ChakraWrapperProps) {
  const { children } = props;
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
