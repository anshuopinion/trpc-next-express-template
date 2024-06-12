"use client";
import {
  Button,
  Card,
  Grid,
  GridItem,
  HStack,
  Link,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";

import { Form, Formik } from "formik";
import * as Yup from "yup";
import { InputControl } from "formik-chakra-ui";
import AuthLayout from "@/layout/auth-layout/auth-layout";
import { trpc } from "@/trpc/client";

function Signup() {
  const toast = useToast();

  const signupUserMutation = trpc.auth.signup.useMutation({
    onSuccess: () => {
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    },
    onError: (err) => {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
      });
    },
  });

  return (
    <AuthLayout>
      <Card minH="410px" pb="16" flex={"1"}>
        <Stack py="3" px="4">
          <Text fontSize={"xl"} fontWeight={"bold"} lineHeight={"1.1"}>
            Sign Up
          </Text>
          <HStack fontSize={"sm"}>
            <Text color="#9F9F9F">Do you have account already? </Text>
            <Link href="/signin" textDecor={"underline"} color={"primary"}>
              Sign In
            </Link>
          </HStack>

          <Formik
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
              password: Yup.string()
                .min(6, "Password must be at least 6 characters")
                .required("Required"),
              first_name: Yup.string().required("Required"),
              last_name: Yup.string().required("Required"),
              confirmPassword: Yup.string()
                .oneOf([Yup.ref("password"), ""], "Passwords must match")
                .required("Required"),
            })}
            initialValues={{
              email: "",
              password: "",
              first_name: "",
              last_name: "",
              confirmPassword: "",
            }}
            onSubmit={async (values) => {
              signupUserMutation.mutate({
                email: values.email,
                password: values.password,
                first_name: values.first_name,
                last_name: values.last_name,
              });
            }}
          >
            <Form>
              <Grid gap={4}>
                <GridItem colSpan={{ base: 2, md: 1 }}>
                  <InputControl name="first_name" label="First Name" />
                </GridItem>
                <GridItem colSpan={{ base: 2, md: 1 }}>
                  <InputControl name="last_name" label="Last Name" />
                </GridItem>

                <GridItem colSpan={2}>
                  <InputControl name="email" label="Email" />
                </GridItem>
                <GridItem colSpan={2}>
                  <InputControl name="password" label="Password" />
                </GridItem>
                <GridItem colSpan={2}>
                  <InputControl
                    name="confirmPassword"
                    label="Confirm Password"
                  />
                </GridItem>
                <GridItem colSpan={2}>
                  <Button
                    w="full"
                    type="submit"
                    isLoading={signupUserMutation.isPending}
                  >
                    Sign Up
                  </Button>
                </GridItem>
              </Grid>
            </Form>
          </Formik>
        </Stack>
      </Card>
    </AuthLayout>
  );
}

export default Signup;
