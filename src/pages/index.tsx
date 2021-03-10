import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import Layout from "../components/Layout";
import React from "react";
import Nextlink from "next/link";
import { Link } from "@chakra-ui/react";
const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <Layout>
      <Nextlink href="/create-post">
        <Link>create post</Link>
      </Nextlink>
      <div>hello world</div>
      {!data
        ? null
        : data.posts.map((p) => {
            return <div key={p.id}>{p.title}</div>;
          })}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
