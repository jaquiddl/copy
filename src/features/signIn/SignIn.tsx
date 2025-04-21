import {
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
// import { useNavigate } from "react-router-dom";
import { useAuthenticate } from "../../services/AuthService";
import { useState } from "react";
import { ResourceObject } from "../../generated/Api";
import { useNavigate } from "react-router-dom";

// import axios from "axios";

const SignIn = () => {
  const navigate = useNavigate();
  const [loginRequest, setLoginRequest] = useState<{
    user: string;
    password: string;
  }>();

  const { mutateAsync: authenticate } = useAuthenticate();

  const handleSignIn = () => {
    const request = {
      user: loginRequest?.user,
      password: loginRequest?.password,
    } as ResourceObject;
    authenticate(request)
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((e) => console.log(e));
  };

  const handleEmailChange = (value: string) => {
    const oldRequest = loginRequest;
    const newRequest = { user: value, password: oldRequest?.password ?? "" };
    setLoginRequest(newRequest);
  };

  const handlePasswordChange = (value: string) => {
    const oldRequest = loginRequest;
    const newRequest = { user: oldRequest?.user ?? "", password: value };
    setLoginRequest(newRequest);
  };

  console.log(loginRequest);

  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          display: "flex",
          minWidth: 300,
          padding: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
            //   alignItems: "center",
            //   justifyContent: "center",
          }}
        >
          <Typography variant="h5" component="h2">
            ResourceHub
          </Typography>
          <FormControl>
            <FormLabel sx={{ fontSize: "18px" }} htmlFor="email">
              User
            </FormLabel>
            <TextField
              // error={emailError}
              // helperText={emailErrorMessage}
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              autoComplete="email"
              autoFocus
              required
              variant="outlined"
              onChange={(e) => handleEmailChange(e.target.value)}
              // color={emailError ? 'error' : 'primary'}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              // error={passwordError}
              // helperText={passwordErrorMessage}
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              autoFocus
              required
              variant="outlined"
              onChange={(e) => handlePasswordChange(e.target.value)}

              // color={passwordError ? 'error' : 'primary'}
            />
          </FormControl>
          <Button onClick={handleSignIn} variant="contained">
            Sign In
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SignIn;
