import { useQuery, gql } from "@apollo/client";
import { signIn, useSession } from "next-auth/react";
import { ME_QUERY } from "@lib/queries";

export default function Home() {
  const { loading, error, data } = useQuery(ME_QUERY);
  const { data: session } = useSession();

  if (!session) {
    return <button onClick={() => signIn("google")}>Sign in with Google</button>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Users</h1>
    </div>
  );
}
