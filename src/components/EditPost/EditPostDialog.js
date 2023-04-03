import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { deleteObject, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { storage } from "../../firebase";

export default function EditPostDialog({
  open,
  onCloseEditPage,
  post,
  onUpdatePost,
  postId
}) {
  //refresh
  const refresh = () => window.location.reload(true);
  //states
  const [title, setTitle] = useState(post.title);
  const [text, setText] = useState(post.text);
  const [share] = useState(post.share);
  const [ImageUpload, setImageUpload] = useState(null);

  const onEditImage = async () => {
    if (ImageUpload == null) return;
    const desertRef = ref(storage, `Images/${post.imageId}`);
    deleteObject(desertRef)
      .then(() => {
        console.log("delete");
      })
      .catch((error) => {
        console.log("err" + error);
      });
    const imageRef = ref(storage, `Images/${post.imageId}`);
    uploadBytes(imageRef, ImageUpload);
  };

  const onEditPost = () => {
    onUpdatePost(postId, {
      title,
      text,
      share,
    });
    onEditImage();
    onCloseEditPage();
    refresh();
  };

  return (
    <Dialog
      open={open}
      onClose={onCloseEditPage}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        Subscribe
      </DialogTitle>
      <DialogContent>
        <img
          src={post.url}
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
              multiple
              type="file"
            />
          </Button>
          <Button
            variant="contained"
            onClick={onEditPost}
            type="submit"
            sx={{ mt: 3 }}
          >
            add Post
          </Button>
          <Button autoFocus onClick={onCloseEditPage} sx={{ mt: 3 }}>
            Cancel
          </Button>
        </Container>
      </DialogActions>
    </Dialog>
  );
}
