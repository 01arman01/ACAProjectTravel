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
import { useState } from "react";
import { startSession } from "../storage/session";
import { signInUser } from "../firebase";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  wrapper: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  bg_img: {
    width: "100vw",
    height: "100vh",
    background:
      "url(https://img.freepik.com/free-vector/flat-design-travel-background_23-2149193475.jpg?w=2000) no-repeat",
    backgroundSize: "cover",
    position: "absolute",
  },
  container: {
    border: "2px solid #56EEE7",
    borderRadius: "15px",
    padding: "25px 25px",
    position: "relative",
    zIndex: "1000",
  },
  inputBox:{
    borderRadius:"5px"
  },
  loginButton:{
    width:"100px",
    height:"35px",
    marginTop:"10px",
    backgroundColor:"#00FFDC",
    transition:"background .3s linear",
    '&:hover':{
      backgroundColor:"#38B4A3"
    }
  },
  loginBlock:{
    display:'flex',
    justifyContent:"space-between",
    alignItems:"center"
  },
});

export default function Login() {
  const navigate = useNavigate();
  const styles = useStyles();

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    // validate the inputs
    if (!email || !password) {
      setError("Please enter your username and password.");
      return;
    }

    // // clear the errors
    setError("");

    try {
      let loginResponse = await signInUser(email, password);
      startSession(loginResponse.user);
      navigate("/user");
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    }
  };

  return (
    <div className={styles.wrapper}>
      <img className={styles.bg_img} />
      <Container maxWidth="xs" className={styles.container}>
        <Typography variant="h5" component="h1" gutterBottom textAlign="center">
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
              Don't have an account yet? <Link href="/register">Register</Link>
            </Box>
            <Button variant="contained" type="submit" className={styles.loginButton}>
              Login
            </Button>
          </div>
        </Box>
      </Container>
    </div>
  );
}
