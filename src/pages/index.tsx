import { NavBar } from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <>
      <NavBar />
      <div>hello world</div>
      {!data
        ? null
        : data.posts.map((p) => {
            return <div key={p.id}>{p.title}</div>;
          })}
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
