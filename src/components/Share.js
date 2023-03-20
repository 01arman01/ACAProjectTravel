import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import {
  Checkbox,
  DialogActions,
  DialogContent,
  DialogContentText,
  fabClasses,
  TextField,
} from "@mui/material";
import { Container } from "@mui/system";
import { getStorage, updateMetadata } from "firebase/storage";
import { ref } from "firebase/database";
import { getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useState } from "react";
// import { storage } from '../firebase';

export default function Share({
  onUpdatePost,
  postId,
  shareOpen,
  onShareClose,
}) {
  // const [open, setOpen] = useState(ShareOpen);

  const auth = getAuth(app);

  const handleShareClose = () => {
    onShareClose(shareOpen);
  };

  const onShareUpdatePost = () => {
    onUpdatePost(postId, {
      share: true,
    });
    handleShareClose();
  };

  return (
    <>
      <Dialog onClose={handleShareClose} open={shareOpen}>
        <DialogTitle>edit post</DialogTitle>
        <DialogActions>
          <Button onClick={onShareUpdatePost}>Share</Button>
          <Button onClick={handleShareClose} autoFocus>
            close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
