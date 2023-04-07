import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Link, useNavigate } from "react-router-dom";
import { useLoginStyles } from "../../routes/login.styles";
import { REGISTER_PAGE, USER_PAGE } from "../../RoutePath/RoutePath";
import { startSession } from "../../storage/session";
import { signInUser } from "../../firebase";
import { Box } from "@mui/joy";
import { Alert } from "@mui/material";

export default function LoginDialog({ loginStatus, onCloseLoginDialog }) {
  const navigate = useNavigate();
  const styles = useLoginStyles();

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onCloseDialog = () =>{
    onCloseLoginDialog()
    setEmail("")
    setError("")
    setPassword("")
  }

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
    <div>
      <Dialog open={loginStatus} onClose={onCloseLoginDialog}>
        <DialogTitle sx={{ textAlign: "center" }}>Login</DialogTitle>
        <DialogContentText>
          {error && (
            <Alert severity="error" sx={{ my: 2 }}>
              {error}
            </Alert>
          )}
        </DialogContentText>
        <DialogContent>
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
              <Link to={REGISTER_PAGE}>Register</Link>
            </Box>
          </div>
        </DialogContent>
        <DialogActions>
          <button onClick={onCloseDialog} className={styles.cancelBtn}>
            Cancel
          </button>
          <Button
            variant="contained"
            type="submit"
            className={styles.loginButton}
            onClick={onSubmit}
          >
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
