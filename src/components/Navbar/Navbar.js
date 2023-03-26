import React, { useState } from "react";
import useStyles from "./Navbar.style";
import EditPass from "./EditPass";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import AddPostDialog from "./AddPostDialog";
import { ImageListItem } from "@mui/material";
import Button from "@mui/material/Button";
import Avatar from "@mui/joy/Avatar";

function Navbar(props) {
  const [navbarAddPost, setNavbarAddPost] = useState(false);
  const [navbarEditPass, setNavbarEditPass] = useState(false);
  const [navbarEditUserImage, setNavbarEditUserImage] = useState(false);
  // const[] = useState(false)

  // functions
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
  const changeNavbarEditUserImage = () => {
    if (!navbarEditUserImage) {
      setNavbarEditPass(false);
      setNavbarAddPost(false);
    }
    setNavbarEditUserImage(!navbarEditUserImage);
  };

  const styles = useStyles();
  return (
    <div className={styles.listUl}>
      <div>
        <Avatar
          className={styles.avatarContainer}
          alt="Remy Sharp"
          src={
            "https://img.freepik.com/premium-vector/man-male-character-avatar-vector-portrait-stylish-type-clothes-with-modern-fashion-style_491904-59.jpg?w=2000"
          }
          sx={{ width: 150, height: 150 }}
        />
        <h1 className={styles.avatarName}>Vahe</h1>
      </div>
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
        {navbarEditUserImage && (
          <div className={styles.DropdownClass}>
            <h3>hellor</h3>
            <div>
              <ImageListItem>
                <img
                  src={
                    "https://img.freepik.com/premium-vector/man-male-character-avatar-vector-portrait-stylish-type-clothes-with-modern-fashion-style_491904-59.jpg?w=2000"
                  }
                  alt="test"
                  loading="lazy"
                />
              </ImageListItem>
            </div>
            <div style={{ textAlign: "center", margin: "10px" }}>
              <Button variant="contained" component="label">
                Upload
                <input hidden accept="image/*" multiple type="file" />
              </Button>
            </div>
          </div>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
