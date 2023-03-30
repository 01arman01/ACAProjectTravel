import React from "react";
import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";

function AddPostDialog({
  title,
  setTitle,
  text,
  setText,
  setImageUpload,
  onAddPost,
  share,
  setShare,
  closeAddPostDialog,
}) {
  const styleContain = {
    width: "40vw",
  };
  return (
    <Dialog
      open={true}
      onClose={closeAddPostDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Add New Post"}</DialogTitle>
      <DialogContent>
        <TextField
          id="standard-basic"
          label="Title"
          variant="standard"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </DialogContent>
      <DialogContent>
        <TextField
          id="outlined-multiline-static"
          label="Contemt"
          multiline
          rows={4}
          defaultValue="Default Value"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </DialogContent>
      <DialogContent>
        <div>
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
          <Checkbox
            checked={share}
            onChange={() => setShare(!share)}
            inputProps={{ "aria-label": "controlled" }}
          />
        </div>
        <Button
          variant="contained"
          onClick={() => {
            closeAddPostDialog();
            onAddPost();
            setTitle("");
            setText("");
            setImageUpload(null);
          }}
          type="submit"
          sx={{ mt: 3 }}
          fullWidth
        >
          add Post
        </Button>
        <Button variant="text" onClick={closeAddPostDialog}>
          Close
        </Button>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}

export default AddPostDialog;
