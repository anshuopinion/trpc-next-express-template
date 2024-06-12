"use client";
import React, { useEffect } from "react";
import { Box, Container, Flex, useDisclosure } from "@chakra-ui/react";
import Sidenav from "@/layout/dashboard-layout/side-nav";
import SideDrawer from "@/layout/dashboard-layout/side-drawer";
import Topnav from "@/layout/dashboard-layout/top-nav";
import useUser from "../hooks/useUser";
import { useRouter } from "next/navigation";

const DashboardLayout = (props: { children: React.ReactNode }) => {
  const { user } = useUser();
  const router = useRouter();
  const { children } = props;
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    if (!user) {
      router.replace("/");
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <Flex>
      <Box
        display={{
          base: "none",
          lg: "flex",
        }}
      >
        <Sidenav />
      </Box>
      <SideDrawer isOpen={isOpen} onClose={onClose} />
      <Box flexGrow={1}>
        <Topnav title="" onOpen={onOpen} />
        <Container
          overflowX="hidden"
          overflowY="auto"
          h="calc(100vh - 88px)"
          mt="6"
          maxW="full"
        >
          {children}
        </Container>
      </Box>
    </Flex>
  );
};

export default DashboardLayout;
