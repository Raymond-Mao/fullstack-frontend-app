import { Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import InputField from "../components/InputField";
import { useCreatePostMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import Layout from "../components/Layout";
import useIsAuth from "../utils/useIsAuth";

const CreatePost = () => {
  const router = useRouter();
  useIsAuth();
  const [, createPost] = useCreatePostMutation();

  return (
    <Layout variant="regular">
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values, { setErrors }) => {
          await createPost({ input: values });
          router.push("/");
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" label="Title" placeholder="title" />
            <InputField name="text" label="Body" placeholder="text..." />
            <Button
              mt={4}
              type="submit"
              colorScheme="teal"
              isLoading={isSubmitting}
            >
              create post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
