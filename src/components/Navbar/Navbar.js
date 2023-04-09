import React, { useState } from "react";
import useStyles from "./Navbar.style";
import EditPass from "./EditPass";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import AddPostDialog from "./AddPostDialog";
import Avatar from "@mui/joy/Avatar";
import {  db, storage } from "../../firebase";
import { v4 } from "uuid";
import { ref, uploadBytes } from "firebase/storage";
import { doc, updateDoc } from "@firebase/firestore";
import { useDownloadURL } from "react-firebase-hooks/storage";
import ImageListComponent from "./ImageListComponent";
import { useLocation } from "react-router-dom";
import EditUserImageDialog from "../EditUserImageDialog";

function Navbar({
  user,
  title,
  setTitle,
  text,
  setText,
  onAddPost,
  setImageUpload,
  share,
  setShare,
}) {
  const [navbarAddPost, setNavbarAddPost] = useState(false);
  const [navbarEditPass, setNavbarEditPass] = useState(false);
  const [navbarEditUserImage, setNavbarEditUserImage] = useState(false);
  const [uploadImage, setUploadImage] = useState(null);
  const [imgId, setImgId] = useState(v4());
  const [openImageList, setOpenImageList] = useState(false);
  const location = useLocation();

  const storageRef = ref(storage, `user_image/${user?.id}/${user?.image}`);
  const [url, loading] = useDownloadURL(storageRef);

  const changeNavbarAddPost = () => {
    if (!navbarAddPost) {
      setNavbarEditPass(false);
      setNavbarEditUserImage(false);
    }
    setNavbarAddPost(true);
  };
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

  const onChangeUploadImage = (e) => {
    setUploadImage(e.target.files[0]);
  };

  const onUploadImage = () => {
    if (!uploadImage) {
      console.log("Hello");
    } else {
      const imageRef = ref(storage, `user_image/${user.id}/${imgId}`);
      updateDoc(doc(db, "User", user.id), { image: imgId });
      uploadBytes(imageRef, uploadImage)
        .then((res) => {})
        .then(() => setImgId(v4()));
    }
  };

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
          <Avatar
            className={styles.avatarContainer}
            alt="Remy Sharp"
            src={url}
              sx={{ width: 150, height: 150 }}
          />

        {location.pathname === "/user" && (
          <>
            {
              <EditUserImageDialog
                styles={styles}
                onChangeUploadImage={onChangeUploadImage}
                onUploadImage={onUploadImage}
                loading={loading}
                url={url}
                open={navbarEditUserImage}
              />
            }
          </>
        )}
      </div>
      <h1 className={styles.avatarName}>
        {user?.name}
      </h1>
      {location.pathname === "/user" && (
        <ul>
          <li onClick={changeNavbarAddPost} className={styles.listLi}>
            <ListItem button>
              <ListItemText primary="Add Post" />
            </ListItem>
          </li>
          {navbarAddPost && (
            <AddPostDialog
              closeAddPostDialog={closeAddPostDialog}
              title={title}
              setTitle={setTitle}
              text={text}
              setText={setText}
              onAddPost={onAddPost}
              setImageUpload={setImageUpload}
              share={share}
              setShare={setShare}
            />
          )}
          {/*<li onClick={changeNavbarEditPass} className={styles.listLi}>*/}
          {/*  <ListItem button>*/}
          {/*    <ListItemText primary="Change Password" />*/}
          {/*  </ListItem>*/}
          {/*  {navbarEditPass && (*/}
          {/*    <div className={styles.DropdownClass}>*/}
          {/*      <EditPass />*/}
          {/*    </div>*/}
          {/*  )}*/}
          {/*</li>*/}
          <li onClick={onImageList} className={styles.listLi}>
            <ListItem button>
              <ListItemText primary="Images" />
            </ListItem>
          </li>
        </ul>
      )}
      <ImageListComponent
        key={v4}
        open={openImageList}
        handleClose={handleClose}
        user={user}
      />
    </div>
  );
}

export default Navbar;
