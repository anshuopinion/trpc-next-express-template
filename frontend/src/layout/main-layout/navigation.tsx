"use client";
import React from "react";
import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Icon,
  IconButton,
  Link,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import useUser from "@/app/hooks/useUser";
const Navigation = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { isLogIn } = useUser();

  const links = [] as { name: string; url: string; isActive: boolean }[];

  return (
    <Box bg="#FBFBFB" boxShadow="md" position="sticky" top="0" zIndex="sticky">
      <Container
        maxW="container.xl"
        display={{
          base: "none",
          md: "block",
        }}
      >
        <HStack h="72px" justify="space-between">
          <Link href="/">
            <Heading>hello</Heading>
          </Link>
          <HStack spacing="4">
            <HStack spacing="4">
              {links?.map((link) => (
                <Link
                  fontSize="lg"
                  fontWeight="medium"
                  color={"black"}
                  key={link.name}
                  href={link.url}
                >
                  {link.name}
                </Link>
              ))}
            </HStack>

            <HStack>
              {isLogIn ? (
                <Link href="/dashboard">
                  <Button>Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link href="/signin">
                    <Button variant="outline">Sign In</Button>
                  </Link>
                  <Link href="/signup">
                    <Button variant="outline">Sign Up</Button>
                  </Link>
                </>
              )}
            </HStack>
          </HStack>
        </HStack>
      </Container>

      <Container
        maxW="container.xl"
        display={{
          base: "block",
          md: "none",
        }}
      >
        <HStack h="64px" justify="space-between">
          <Link href="/">
            <Heading size="xs">TRPC NEXT Express template</Heading>
          </Link>

          <IconButton aria-label="menu" color="white">
            <Icon
              onClick={onToggle}
              fontSize="2xl"
              as={!isOpen ? FaBars : AiOutlineClose}
            />
          </IconButton>
        </HStack>

        {isOpen && (
          <Stack spacing="4" py="4">
            <Stack spacing="4">
              {links.map((link, index) => (
                <Link
                  fontSize="lg"
                  fontWeight="medium"
                  color={link.isActive ? "primary" : "black"}
                  key={index}
                  href={link.url}
                >
                  {link.name}
                </Link>
              ))}
            </Stack>

            <HStack>
              {isLogIn ? (
                <Link href="/dashboard">
                  <Button>Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link href="/signin">
                    <Button variant="outline">Sign In</Button>
                  </Link>
                  <Link href="/signup">
                    <Button variant="outline">Sign Up</Button>
                  </Link>
                </>
              )}
            </HStack>
          </Stack>
        )}
      </Container>
    </Box>
  );
};

export default Navigation;
