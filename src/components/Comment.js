import { useEffect, useState, Fragment, useCallback } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { getAuth } from "firebase/auth";
import { app, db, storage } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { getDownloadURL, ref } from "firebase/storage";
import { useCommentStyles } from "./Comment.styles";
import { v4 } from "uuid";

export default function Comment({ selectedValue }) {
  const styles = useCommentStyles();

  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);


  useEffect(() => {
    onSnapshot(collection(db, "Comments"), (data) => {
      const newData = data.docs
        .map((doc) => ({ ...doc.data() }))
        .filter((doc) => doc.postId === selectedValue.id);

      setComments(newData);
    });
  }, []);

  // useEffect(() => {
  //   onSnapshot(collection(db, "User"), (data) => {
  //     const newData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  //     setUsers(newData);
  //   });
  // }, []);
  useEffect(() => {
    onSnapshot(collection(db, "User"), (data) => {
      const newData = data.docs.map((doc) => {
        const storageRef = ref(
          storage,
          `user_image/${doc?.id}/${doc.data()?.image}`
        );
        return getDownloadURL(storageRef)
          .then((url) => {
            return {
              ...doc.data(),
              id: doc.id,
              url: url,
            };
          })
          .catch((err) => {
            return {
              ...doc.data(),
              id: doc.id,
              url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlHBoELHG9IPFDyVp_5_lRfL-9zTYR-YG1nEC8N9c&s",
            };
          });
      });
      Promise.all(newData)
        .then((downloadUrls) => {
          setUsers(downloadUrls);
        })
        .catch((error) => console.log(error, "asdfasdf"));
    });
  }, []);

  const onDeleteComment = (comment) => {
    onSnapshot(collection(db, "Comments"), (data) => {
      const docName = data.docs.filter(
        (doc) => doc.data().commentId === comment.commentId
      );
      docName.forEach((elem) => {
        deleteDoc(doc(db, "Comments", elem.id));
      });
    });
  };

  return (
    <List sx={{ width: "100%", maxWidth: 400, bgcolor: "background.paper" }}>
      {comments.map((comment) => {
        const user = users.find((el) => el.id === comment.userId);
        return (
          <ListItem
            alignItems="flex-start"
            sx={{ padding: 0 }}
            key={comment.commentId}
          >
            <ListItemAvatar>
              <Avatar
                alt="Remy Sharp"
                src={user?.url}
                sx={{ width: 37, height: 37 }}
              />
            </ListItemAvatar>
            <ListItemText
              sx={{
                boxShadow: " 0 1px 3px gray",
                borderRadius: 3,
                padding: 1,
                display: "inline-block",
              }}
              primary={user ? user.name : ""}
              secondary={<Fragment>{comment.comment}</Fragment>}
            />
            <DeleteForeverOutlinedIcon
              className={styles.deleteIcon}
              onClick={() => onDeleteComment(comment)}
            />
          </ListItem>
        );
      })}
    </List>
  );
}
