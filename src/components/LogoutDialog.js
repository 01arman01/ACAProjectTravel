import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useHeaderStyles } from "./Header/Header.styles";
function LogoutDialog(props) {
  const styles = useHeaderStyles();
  return (
    <div>
      <Dialog
        open={props.logoutDialogStatus}
        onClose={props.closeLogoutDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to exit?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            className={styles.actionBtnLogoutClose}
            variant="text"
            onClick={props.onLogout}
          >
            Logout
          </Button>
          <Button variant="text" onClick={props.closeLogoutDialog}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default LogoutDialog;
