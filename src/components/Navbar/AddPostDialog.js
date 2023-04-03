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
import { useAddPostDialogStyles } from "./AddPostDialog.styles";

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
  const styles = useAddPostDialogStyles();
  const styleContain = {
    width: "40vw",
  };
  return (
    <Dialog
      open={true}
      onClose={closeAddPostDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={styles.dialog}
    >
      <DialogTitle id="alert-dialog-title" sx={{textAlign:"center"}}>{"Add New Post"}</DialogTitle>
      <DialogContent>
        <TextField
          id="standard-basic"
          label="Title"
          variant="standard"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </DialogContent>
      <DialogContent >
        <TextField
          id="outlined-multiline-static"
          label="Content"
          multiline
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          sx={{marginTop:"10px"}}
        />
      </DialogContent>
      <DialogContent>
        <div className={styles.uploadShare}>
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
      </DialogContent>
      <div className={styles.addClosebtns}>
        <button onClick={closeAddPostDialog} className={styles.cancelBtn}>
          Cancel
        </button>
        <button
          onClick={() => {
            closeAddPostDialog();
            onAddPost();
            setTitle("");
            setText("");
            setImageUpload(null);
          }}
          className={styles.addBtn}
        >
          Add
        </button>
      </div>
      <DialogActions></DialogActions>
    </Dialog>
  );
}

export default AddPostDialog;
