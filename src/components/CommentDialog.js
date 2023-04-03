import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Comment from "./Comment";
import { Avatar, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { v4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";
import { app, db } from "../firebase";
import { getAuth } from "firebase/auth";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 5,
            top: 10,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CommentDialog({
  openCommentPag,
  handleCloseComment,
  selectedValue,
  onDeleteComment,
}) {
  const [comment, setComment] = React.useState("");
  const auth = getAuth(app);

  const handleClose = () => {
    handleCloseComment();
  };

  const onAddComment = React.useCallback(
    async (commentText) => {
      try {
        await addDoc(collection(db, "Comments"), {
          userId: auth.lastNotifiedUid,
          postId: selectedValue.id,
          comment: commentText,
          commentId: v4(),
        });
      } catch (err) {}
    },
    [auth.lastNotifiedUid, selectedValue.id]
  );

  const onComment = () => {
    onAddComment(comment);
    setComment("");
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openCommentPag}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Comments
        </BootstrapDialogTitle>
        <DialogContent>
          <Comment
            key={v4}
            selectedValue={selectedValue}
            onDeleteComment={onDeleteComment}
          />
        </DialogContent>
        <DialogActions>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <TextField
            id="outlined-basic"
            label="Comment"
            variant="outlined"
            size="small"
            fullWidth
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <Button
            autoFocus
            onClick={() => {
              onComment();
            }}
          >
            <SendIcon />
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
