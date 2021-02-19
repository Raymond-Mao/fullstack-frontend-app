import React from "react";
import { Form, Formik } from "formik";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
import { Button } from "@chakra-ui/react";
import { useRegisterMutation } from "../generated/graphql";

interface Register { }

const Register = (props: Register) => {
  const [, register] = useRegisterMutation()
  return (
    <Wrapper variant="regular">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={
          async (values) => {
            const res = await register(values)
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
            <Button mt={4} type="submit" colorScheme="teal" isLoading={isSubmitting}>Submit</Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
