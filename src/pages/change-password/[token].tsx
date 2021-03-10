import React, { useState } from "react";
import { Box, Button, Link } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import InputField from "../../components/InputField";
import Wrapper from "../../components/Wrapper";
import { toErrorMap } from "../../utils/toErrorMap";
import { useChangePasswordMutation } from "../../generated/graphql";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import Nextlink from "next/link";

const ChangePassword: NextPage = () => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");
  return (
    <Wrapper variant="regular">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          const res = await changePassword({
            newPassword: values.newPassword,
            token:
              typeof router.query.token === "string" ? router.query.token : "",
          });
          if (res.data?.changePassword.errors) {
            const errorMap = toErrorMap(res.data.changePassword.errors);
            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (res.data?.changePassword.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              label="New Password"
              placeholder="new password"
              type="password"
            />
            {tokenError ? (
              <Box>
                <Box style={{ color: "red" }}>{tokenError}</Box>
                <Nextlink href="/forgot-password">
                  <Link>go get new password</Link>
                </Nextlink>
              </Box>
            ) : null}
            <Button
              mt={4}
              type="submit"
              colorScheme="teal"
              isLoading={isSubmitting}
            >
              Change password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
