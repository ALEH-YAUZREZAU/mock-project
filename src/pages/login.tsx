import { signIn } from "next-auth/react";
import { Container, Typography, Box, Avatar, Button } from "@mui/material";

const Login = () => {
  return (
    <Container maxWidth="sm">
      <Box textAlign="center" marginTop={4}>
        <Typography variant="h4">You re not logged in</Typography>
        <Box marginTop={2}>
          <Button variant="contained" color="primary" onClick={() => signIn("google", { callbackUrl: "/" })}>
            Sign In with Google
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
