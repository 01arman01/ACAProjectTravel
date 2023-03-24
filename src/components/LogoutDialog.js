import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useHeaderStyles } from "./Header/Header.styles";
import { createUseStyles } from "react-jss";
const useStyles = createUseStyles({
  cancelButton: {
    textTransform: "none",
    fontSize: "14px",
    fontWeight:"500",
    border: "2px solid #989DA2",
    borderRadius: "10px",
    padding: "5px 10px",
  },
  logoutButton: {
    textTransform: "none",
    fontSize: "14px",
    backgroundColor: "#3C6D9F",
    padding: "5px 12px",
    borderRadius: "10px",
    color: "white",
    transition:" .2s linear",
    "&:hover": {
      backgroundColor: "#white",
      border:"2px solid #3C6D9F",
      color:"#3C6D9F"
    },
  },
  content: {
    content: "",
    width: "100%",
    height: "2px",
    marginTop: "10px",
    backgroundColor: "#989DA2",
  },
});
function LogoutDialog(props) {
  const styles = useStyles();
  return (
    <div>
      <Dialog
        open={props.logoutDialogStatus}
        onClose={props.closeLogoutDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <span
            style={{
              color: "#5187BC",
            }}
          >
            {"Confirm logout"}
          </span>
          <div className={styles.content}></div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{
              color: "#8DB1D5",
            }}
          >
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="text"
            onClick={props.closeLogoutDialog}
            className={styles.cancelButton}
          >
            Cancel
          </Button>
          <Button
            variant="text"
            onClick={props.onLogout}
            className={styles.logoutButton}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default LogoutDialog;
