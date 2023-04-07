import {
  Alert,
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isLoggedIn, startSession } from "../storage/session";
import { signInUser } from "../firebase";
import { useLoginStyles } from "./login.styles";
import { USER_PAGE, H0ME_PAGE } from "../RoutePath/RoutePath";
import logo from "../imgs/logo.png";

export default function Login() {
  const navigate = useNavigate();
  const styles = useLoginStyles();

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isLoggedIn()) {
      navigate(USER_PAGE);
    }
  });

  const onNavigateHome = () => {
    navigate(H0ME_PAGE);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Please enter your username and password.");
      return;
    }

    setError("");

    try {
      let loginResponse = await signInUser(email, password);
      startSession(loginResponse.user);
      navigate(USER_PAGE);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <img
        alt="name"
        src={logo}
        style={{
          width: "76px",
          height: "auto",
          position: "absolute",
          zIndex: "10",
          top: "20px",
          left: "30px",
          cursor: "pointer",
        }}
        onClick={onNavigateHome}
      />
      {!isLoggedIn() && (
        <div className={styles.wrapper}>
          <img className={styles.bg_img} alt="" />
          <Container maxWidth="xs" className={styles.container}>
            <Typography
              variant="h5"
              component="h1"
              gutterBottom
              textAlign="center"
            >
              Login
            </Typography>
            {error && (
              <Alert severity="error" sx={{ my: 2 }}>
                {error}
              </Alert>
            )}
            <Box component="form" onSubmit={onSubmit}>
              <TextField
                label="Email"
                variant="outlined"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mt: 1 }}
                fullWidth
                className={styles.inputBox}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mt: 3 }}
                fullWidth
                className={styles.inputBox}
              />
              <div className={styles.loginBlock}>
                <Box sx={{ mt: 2 }}>
                  Don't have an account yet?{" "}
                  <Link href="/register">Register</Link>
                </Box>
                <Button
                  variant="contained"
                  type="submit"
                  className={styles.loginButton}
                >
                  Login
                </Button>
              </div>
            </Box>
          </Container>
        </div>
      )}
    </>
  );
}
