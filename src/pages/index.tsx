import { useQuery, gql } from "@apollo/client";

const USERS_QUERY = gql`
  query Users {
    users {
      id
      email
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(USERS_QUERY);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {data.users.map((user: { id: number; email: string }) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
}
