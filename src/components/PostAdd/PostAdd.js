import { Button, Checkbox, Container, TextField } from "@mui/material";
import { usePostAddStyles } from "./PostAdd.styles";

export default function PostAdd({
  title,
  setTitle,
  text,
  setText,
  setImageUpload,
  onSendPost,
  share,
  setShare,
}) {
  const styles = usePostAddStyles();
  return (
    <>
      <div className={styles.container}>
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
          onClick={onSendPost}
          type="submit"
          sx={{ mt: 3 }}
          fullWidth
        >
          add Post
        </Button>
      </div>
    </>
  );
}
