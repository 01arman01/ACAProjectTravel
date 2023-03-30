import { Avatar } from "@mui/material";
import { ref } from "firebase/storage";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { storage } from "../../../firebase";
import { useOtherUserNavbarStyles } from "./OtherUserNavbar.styles";
export default function OtherUserNavbar({ user }) {
  const styles = useOtherUserNavbarStyles();
  const avatarImageUrlRef = ref(
    storage,
    `user_image/${user?.id}/${user?.image}`
  );
  const [url, loading] = useDownloadURL(avatarImageUrlRef);
  return (
    <div className={styles.wrapper}>
      <div className={styles.avatarBlock}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Avatar
            className={styles.avatarContainer}
            alt="Remy Sharp"
            src={url}
            sx={{ width: 150, height: 150 }}
          />
        )}
      </div>
      <h1 className={styles.avatarName}>{user.name}</h1>
    </div>
  );
}
