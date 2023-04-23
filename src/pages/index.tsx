import { signIn, signOut } from "next-auth/react";
import { useUser, useUserSession } from "@hooks/index";
import { Container, Typography, Box, Avatar, Button } from "@mui/material";

const Home = () => {
  const { session, loading } = useUserSession();
  const { user } = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <Container maxWidth="sm">
        <Box textAlign="center" marginTop={4}>
          <Typography variant="h4">You're not logged in</Typography>
          <Box marginTop={2}>
            <Button variant="contained" color="primary" onClick={() => signIn("google")}>
              Sign In with Google
            </Button>
          </Box>
        </Box>
      </Container>
    );
  }

  const account = user?.accounts ? user?.accounts[0] : null;

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" marginTop={4}>
        <Avatar alt={user?.name || ""} src={user?.image || ""} sx={{ width: 96, height: 96 }} />
        <Typography variant="h4">{user?.name}</Typography>
        <Typography variant="subtitle1">{user?.email}</Typography>
        {account && (
          <>
            <Typography variant="body1">Provider: {account.provider}</Typography>
            <Typography variant="body1">Provider Account ID: {account.providerAccountId}</Typography>
          </>
        )}
        <Box marginTop={2}>
          <Button variant="contained" color="secondary" onClick={() => signOut()}>
            Logout
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
