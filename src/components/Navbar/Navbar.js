import React, { useState } from "react";
import useStyles from "./Navbar.style";
import EditPass from "./EditPass";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import AddPostDialog from "./AddPostDialog";
import { ImageListItem } from "@mui/material";
import Button from "@mui/material/Button";
import Avatar from "@mui/joy/Avatar";
import { app, db, storage } from "../../firebase";
import { v4 } from "uuid";
// import { ref } from '@firebase/database';
// import { ref as sRef } from '@firebase/storage'
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, doc, onSnapshot, updateDoc } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { useStorage } from "react-firebase-hooks/storage";
import { useDownloadURL } from "react-firebase-hooks/storage";
import ProgressComponent from "./ProgressComponent";
import ImageListComponent from "./ImageListComponent";

function Navbar(props) {
  const [navbarAddPost, setNavbarAddPost] = useState(false);
  const [navbarEditPass, setNavbarEditPass] = useState(false);
  const [navbarEditUserImage, setNavbarEditUserImage] = useState(false);
  const [uploadImage, setUploadImage] = useState(null);
  const [imgId, setImgId] = useState(v4());
  const [imgUrls, setimgUrl] = useState(
    "https://t3.ftcdn.net/jpg/01/65/63/94/360_F_165639425_kRh61s497pV7IOPAjwjme1btB8ICkV0L.jpg"
  );
  const [openImageList, setOpenImageList] = useState(false);
  // const[] = useState(false)
  const auth = getAuth(app);
  const userId = auth.lastNotifiedUid;

  const storageRef = ref(
    storage,
    `user_image/${props.user?.id}/${props.user?.image}`
  );
  const [url, loading] = useDownloadURL(storageRef);

  const changeNavbarAddPost = () => {
    if (!navbarAddPost) {
      setNavbarEditPass(false);
      setNavbarEditUserImage(false);
    }
    setNavbarAddPost(true);
}
const closeAddPostDialog = () => {
  setNavbarAddPost(false);
};
const changeNavbarEditPass = () => {
  if (!navbarEditPass) {
    setNavbarAddPost(false);
    setNavbarEditUserImage(false);
  }
  setNavbarEditPass(!navbarEditPass);
};
const changeNavbarEditUserImage = () => {
  if (!navbarEditUserImage) {
    setNavbarEditPass(false);
    setNavbarAddPost(false);
  }
  setNavbarEditUserImage(!navbarEditUserImage);
};

const onUploadImage = () => {
  if (!uploadImage) {
    console.log("Hello");
  } else {
    console.log(imgId, props.user, props.user.image);
    const imageRef = ref(storage, `user_image/${props.user.id}/${imgId}`);
    updateDoc(doc(db, "User", props.user.id), { image: imgId });
    uploadBytes(imageRef, uploadImage)
      .then((res) => {})
      .then(() => setImgId(v4()));
  }
}
  const onImageList = () => {
    setOpenImageList(true);
  };
  const handleClose = () => {
    setOpenImageList(false);
  };

  const styles = useStyles();
  return (
    <div className={styles.listUl}>
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
        <button className={styles.plusButton}>+</button>
      </div>
      <h1 className={styles.avatarName}> Name Surname</h1>
      <ul>
        <li onClick={changeNavbarAddPost} className={styles.listLi}>
          {/*<h2 className={styles.liHeader} onClick={changeNavbarAddPost}>Add Post</h2>*/}
          <ListItem button>
            <ListItemText primary="Add Post" />
          </ListItem>
        </li>
        {navbarAddPost && (
          <AddPostDialog
            closeAddPostDialog={closeAddPostDialog}
            title={props.title}
            setTitle={props.setTitle}
            text={props.text}
            setText={props.setText}
            onAddPost={props.onAddPost}
            setImageUpload={props.setImageUpload}
            share={props.share}
            setShare={props.setShare}
          />
        )}
        <li onClick={changeNavbarEditPass} className={styles.listLi}>
          {/*<h2 className={styles.liHeader} onClick={changeNavbarEditPass}>Edit password</h2>*/}
          <ListItem button>
            <ListItemText primary="Change Password" />
          </ListItem>
          {navbarEditPass && (
            <div className={styles.DropdownClass}>
              {/*<h3>Edit Pass</h3>*/}
              <EditPass />
            </div>
          )}
        </li>
        <li onClick={changeNavbarEditUserImage} className={styles.listLi}>
          <ListItem button>
            <ListItemText primary="Edit image User" />
          </ListItem>
        </li>
        <li onClick={onImageList} className={styles.listLi}>
          <ListItem button>
            <ListItemText primary="Images" />
          </ListItem>
        </li>
        {navbarEditUserImage && (
          <div className={styles.DropdownClass}>
            <h3>hellor</h3>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <div>
                <ImageListItem>
                  <img src={url} alt="test" loading="lazy" />
                </ImageListItem>
              </div>
            )}{" "}
            <ImageListComponent />
            <div
              style={{
                textAlign: "center",
                margin: "10px",
                display: "flex",
                flexWrap: "nowrap",
                justifyContent: "space-evenly",
                alignContent: "space-around",
                alignItems: "center",
              }}
            >
              <Button variant="contained" component="label">
                Upload
                <input
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    setUploadImage(e.target.files[0]);
                  }}
                  multiple
                  type="file"
                />
              </Button>
              <ProgressComponent
                onUploadImage={onUploadImage}
                loading={loading}
              />
            </div>
          </div>
        )}
      </ul>
      <ImageListComponent
        open={openImageList}
        handleClose={handleClose}
        user={props.user}
      />
    </div>
  );
};

export default Navbar;
