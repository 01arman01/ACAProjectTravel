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
        <DialogTitle>Share this post?</DialogTitle>
        <DialogActions>
          <Button onClick={handleShareClose} >
            No
          </Button>
          <Button onClick={onShareUpdatePost}>Yes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
