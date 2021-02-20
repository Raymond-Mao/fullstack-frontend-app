import React, { FC } from "react";
import { Form, Formik } from "formik";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
import { Button } from "@chakra-ui/react";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";


const Login: FC = () => {
  const [, login] = useLoginMutation()
  const router = useRouter()
  return (
    <Wrapper variant="regular">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={
          async (values, { setErrors }) => {
            const res = await login({ options: values })
            if (res.data?.login.errors) {
              setErrors(toErrorMap(res.data.login.errors))
            } else if (res.data?.login.user) {
              router.push("/");
            }
          }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              label="UserName"
              placeholder="username"
            />
            <InputField
              name="password"
              label="Password"
              placeholder="password"
              type="password"
            />
            <Button mt={4} type="submit" colorScheme="teal" isLoading={isSubmitting}>Login</Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
