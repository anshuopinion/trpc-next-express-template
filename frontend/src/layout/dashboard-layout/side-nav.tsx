import React from "react";
import { Box, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import { RxDashboard } from "react-icons/rx";
import { BiCog } from "react-icons/bi";
import { usePathname } from "next/navigation";
import Link from "next/link";
const Sidenav = () => {
  const pathname = usePathname();

  const isActiveLink = (link: string) => {
    return pathname === link;
  };

  const navLinks = [
    {
      icon: RxDashboard,
      text: "Dashboard",
      link: "/dashboard",
    },
  ];

  const bottomLinks = [
    {
      icon: BiCog,
      text: "Settings",
      link: "/dashboard/settings",
    },
  ];

  return (
    <Stack
      bg="white"
      justify="space-between"
      boxShadow={{
        base: "none",
        lg: "lg",
      }}
      w={{
        base: "full",
        lg: "10rem",
      }}
      h="100vh"
    >
      <Box>
        <Text fontSize="20px" px="4" as="h1" pt="3.5rem">
          @Anshu
        </Text>
        <Stack mt="6" mx="3">
          {navLinks.map((nav) => (
            <Link href={nav.link} key={nav.text}>
              <HStack
                bg={isActiveLink(nav.link) ? "#F3F3F7" : "transparent"}
                color={isActiveLink(nav.link) ? "#171717" : "#797E82"}
                borderRadius="10px"
                py="3"
                px="4"
                _hover={{
                  bg: "#F3F3F7",
                  color: "#171717",
                }}
              >
                <Icon as={nav.icon} />
                <Text fontSize="14px" fontWeight="medium">
                  {nav.text}
                </Text>
              </HStack>
            </Link>
          ))}
        </Stack>
      </Box>

      <Box mt="6" mx="3" mb="6">
        {bottomLinks.map((nav) => (
          <Link href={nav.link} key={nav.text}>
            <HStack
              borderRadius="10px"
              py="3"
              px="4"
              bg={isActiveLink(nav.link) ? "#F3F3F7" : "transparent"}
              color={isActiveLink(nav.link) ? "#171717" : "#797E82"}
              _hover={{
                bg: "#F3F3F7",
                color: "#171717",
              }}
            >
              <Icon as={nav.icon} />
              <Text fontSize="14px" fontWeight="medium">
                {nav.text}
              </Text>
            </HStack>
          </Link>
        ))}
      </Box>
    </Stack>
  );
};

export default Sidenav;
