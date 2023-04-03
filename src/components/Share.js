import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { DialogActions } from "@mui/material";

export default function Share({
  onUpdatePost,
  postId,
  shareOpen,
  onShareClose,
}) {
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
