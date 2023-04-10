import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ImageListItem } from "@mui/material";
import ImageListComponent from "./Navbar/ImageListComponent";
import ProgressComponent from "./Navbar/ProgressComponent";
import { useState } from "react";

export default function EditUserImageDialog({
  styles,
  onChangeUploadImage,
  onUploadImage,
  loading,
  url,
}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  

  return (
    <div>
      <button className={styles.plusButton} onClick={handleClickOpen}>
        +
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ overflow: "scroll" }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center" }}>
          {"Edit Your profile image"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <div>
                <ImageListItem>
                  <img src={url} alt="test" loading="lazy" />
                </ImageListItem>
              </div>
            )}
            <ImageListComponent />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" component="label">
            Upload
            <input
              hidden
              accept="image/*"
              onChange={(e)=>(onChangeUploadImage(e))}
              multiple
              type="file"
            />
          </Button>
          <ProgressComponent onUploadImage={onUploadImage} loading={loading} />
          <button onClick={handleClose} className={styles.cancelBtn}>
            Cancel
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
