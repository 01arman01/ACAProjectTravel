import {
  Alert,
  Box,
  Button,
  Container,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { startSession } from "../storage/session";
import { createUser, db } from "../firebase";
import { AggregateField, doc, setDoc } from "firebase/firestore";

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
  infoBlock: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputBox: {
    borderRadius: "5px",
  },
  registerButton: {
    width: "100px",
    height: "35px",
    marginTop: "10px",
    backgroundColor: "#00FFDC",
    transition: "background .3s linear",
    "&:hover": {
      backgroundColor: "#38B4A3",
    },
  },
  registerBlock: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default function Register() {
  const navigate = useNavigate();
  const styles = useStyles();

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState("text");

  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  // Add a new document in collection "cities"

  const onSubmit = async (event) => {
    event.preventDefault();

    // validate the inputs
    if (!email || !password || !repeatPassword) {
      setError("Please fill out all the fields.");
      return;
    }
    if (password !== repeatPassword) {
      setError("Passwords do not match");
      return;
    }

    // clear the errors
    setError("");

    try {
      let registerResponse = await createUser(email, password);
      startSession(registerResponse.user);
      // registerResponse.displayName ="Hello"
      console.log(registerResponse);
      await setDoc(doc(db, "User", registerResponse.user.uid), {
        name: username,
        age,
        gender,
        image,
      });
      navigate("/user");
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    }
  };

  return (
    <div className={styles.wrapper}>
      <img className={styles.bg_img} />
      <Container maxWidth="xs" sx={{ mt: 2 }} className={styles.container}>
        <Typography variant="h5" component="h1" gutterBottom textAlign="center">
          Register
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
          />
          <TextField
            label="Username"
            variant="outlined"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mt: 1 }}
            fullWidth
          />
          <div className={styles.infoBlock}>
            <div>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={gender}
                label="Gender"
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              >
                <MenuItem value={"male"}>male</MenuItem>
                <MenuItem value={"female"}>female</MenuItem>

                {/* <MenuItem value={30}>Thirty</MenuItem> */}
              </Select>
            </div>
            {/* </FormControl> */}
            <TextField
              label="Age"
              variant="outlined"
              type="number"
              autoComplete="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              sx={{ mt: 1, width: "80px" }}
              fullWidth
            />
          </div>
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mt: 3 }}
            fullWidth
          />
          <TextField
            label="Repeat password"
            variant="outlined"
            type="password"
            autoComplete="repeat-new-password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            sx={{ mt: 3 }}
            fullWidth
          />
          <div className={styles.registerBlock}>
            <Box sx={{ mt: 2 }}>
              Already have an account? <Link href="/login">Login</Link>
            </Box>
            <Button variant="contained" type="submit" sx={{ mt: 3 }} fullWidth className={styles.registerButton}>
              Register
            </Button>
          </div>
        </Box>
      </Container>
    </div>
  );
}
