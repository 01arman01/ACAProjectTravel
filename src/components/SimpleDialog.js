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
  TextField,
} from "@mui/material";
import { Container } from "@mui/system";
import { getStorage, updateMetadata,ref, uploadBytes } from "firebase/storage";
// import { ref } from "firebase/database";
import { getAuth } from "firebase/auth";
import { app, storage } from "../firebase";
import { useState } from "react";
// import { storage } from '../firebase';

export default function SimpleDialog({
  selectedValue,
  postId,
  onDeletePost,
  onUpdatePost,
  open,
  onClose,
  postImgUrl
}) {
  const [openUpdatePage, setOpenUpdatePage] = useState(false);
  const [title, setTitle] = useState(selectedValue.title);
  const [text, setText] = useState(selectedValue.text);
  const [share, setShare] = useState(selectedValue.share);
  const [ImageUpload, setImageUpload] = useState(null);

  let auth = getAuth(app);

  const handleClose = () => {
    onClose(selectedValue);
  };
  const hendleCloseUpdatePage = () => {
    setOpenUpdatePage(false);
    handleClose();
  };
  const hendleDelete = () => {
    onDeletePost(postId, selectedValue.image);
    handleClose();
  };
  const openUpdate = () => {
    setOpenUpdatePage(true);
    handleClose();
  };
  const onUpdateDialogPost = () => {
    onUpdatePost(postId, {
      title,
      text,
      share,
      image:ImageUpload.name
    });
    onUpdateImage();
    hendleCloseUpdatePage();
  };

  const onUpdateImage = async () => {
    const imageRef = await ref(storage, `Images/${ImageUpload.name}`);
    uploadBytes(imageRef, ImageUpload).then(() => alert("post sended"));
    // updateMetadata(imageRef, ImageUpload)
    //   .then((metadata) => {
    //     hendleCloseUpdatePage();
    //   })
    //   .catch((error) => {
    //     console.log("err", error);
    //   });
  };
  return (
    <>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>edit post</DialogTitle>
        <DialogActions>
          <Button onClick={openUpdate}>Update</Button>
          <Button onClick={hendleDelete}>delete</Button>
          <Button onClick={handleClose} autoFocus>
            close
          </Button>
        </DialogActions>
      </Dialog>
      <div>
        <Dialog
          open={openUpdatePage}
          onClose={hendleCloseUpdatePage}
          // PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
            Subscribe
          </DialogTitle>
          <DialogContent>
            <img
              src={postImgUrl}
              style={{ width: "100%" }}
              aria-hidden
              alt="Picture of me taking a photo of an image"
            />
          </DialogContent>
          <DialogActions>
            <Container maxWidth="xs" sx={{ mt: 2 }}>
              <TextField
                label="Title"
                variant="outlined"
                type="text"
                autoComplete="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{ mt: 1 }}
                fullWidth
              />
              <TextField
                label="Text"
                variant="outlined"
                type="text"
                autoComplete="Text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                sx={{ mt: 3 }}
                fullWidth
              />
              <Button variant="contained" component="label">
                Upload Image
                <input
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    setImageUpload(e.target.files[0]);
                  }}
                  // onClick={uploadImage}
                  multiple
                  type="file"
                />
              </Button>

              <Checkbox
                label="Text"
                checked={share}
                onChange={() => setShare(!share)}
                inputProps={{ "aria-label": "controlled" }}
              />
              <Button
                variant="contained"
                onClick={onUpdateDialogPost}
                type="submit"
                sx={{ mt: 3 }}
                // fullWidth
              >
                add Post
              </Button>
              <Button
                autoFocus
                onClick={hendleCloseUpdatePage}
                sx={{ mt: 3 }}
                // fullWidth
              >
                Cancel
              </Button>
            </Container>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
