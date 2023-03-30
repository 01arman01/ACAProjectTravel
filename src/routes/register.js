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
import {useEffect, useState} from "react";
import {isLoggedIn, startSession} from "../storage/session";
import { createUser, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

import { useRegisterStyles } from "./register.styles";
import {USER_PAGE} from "../RoutePath/RoutePath";
import dayjs from 'dayjs';

export default function Register() {
  const navigate = useNavigate();
  const styles = useRegisterStyles();

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState("text");

  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [timeDate,setTimeDate] = useState(dayjs(new Date()))

  // Add a new document in collection "cities"
  useEffect(() => {
    if (isLoggedIn()){
      navigate(USER_PAGE);
    }})



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
      console.log( registerResponse.user.uid,"LLLLL",timeDate)
      // console.log(registerResponse);
      // await setDoc(doc(db, "Message", registerResponse.user.uid))
      await setDoc(doc(db, "User", registerResponse.user.uid), {
        name: username,
        age,
        gender,
        image,
        time:timeDate.toDate(),
      })

      navigate(USER_PAGE);
    } catch (error) {
      // console.error(error.message);
      setError(error.message);
    }
  };

  return ( !isLoggedIn() && <div className={styles.wrapper}>
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
                sx={{ width: "150px" }}
              >
                <MenuItem value={"male"}>male</MenuItem>
                <MenuItem value={"female"}>female</MenuItem>
              </Select>
            </div>
            <div>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <TextField
                variant="outlined"
                type="number"
                autoComplete="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                sx={{ mt: 1, width: "150px" }}
                fullWidth
              />
            </div>
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
            <Button
              variant="contained"
              type="submit"
              sx={{ mt: 3 }}
              fullWidth
              className={styles.registerButton}
            >
              Register
            </Button>
          </div>
        </Box>
      </Container>
    </div>
  );
}
