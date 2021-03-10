import React, { FC } from "react";
import { Form, Formik } from "formik";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
import { Button, Flex, Link } from "@chakra-ui/react";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import Nextlink from "next/link";
const Login: FC = () => {
  const [, login] = useLoginMutation();
  const router = useRouter();
  return (
    <Wrapper variant="regular">
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const res = await login(values);
          if (res.data?.login.errors) {
            setErrors(toErrorMap(res.data.login.errors));
          } else if (res.data?.login.user) {
            if (typeof router.query.next === "string") {
              router.push(router.query.next);
            } else {
              router.push("/");
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              label="UserName Or Email"
              placeholder="username or email"
            />
            <InputField
              name="password"
              label="Password"
              placeholder="password"
              type="password"
            />
            <Flex mt={2}>
              <Nextlink href="/forgot-password">
                <Link ml="auto">go get new password</Link>
              </Nextlink>
            </Flex>
            <Button
              mt={4}
              type="submit"
              colorScheme="teal"
              isLoading={isSubmitting}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
