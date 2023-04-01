import { useEffect, useState, Fragment } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { getAuth } from "firebase/auth";
import { app, db, storage } from "../firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

export default function CopmentComponent({ selectedValue }) {
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
        const storageRef = ref(storage,`user_image/${doc?.id}/${doc.data()?.image}`
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

  return (
    <List sx={{ width: "100%", maxWidth: 400, bgcolor: "background.paper" }}>
      {comments.map((element) => {
        const user = users.find((el) => el.id === element.userId);
        return (
            <ListItem alignItems="flex-start" sx={{ padding: 0 }}>
              <ListItemAvatar>
                <Avatar 
                alt="Remy Sharp" 
                src={user?.url}
                sx={{ width: 37, height: 37 }}
                />
              </ListItemAvatar>
              <ListItemText
                sx={{boxShadow:" 0 1px 3px gray", borderRadius:3, padding:1,display: "inline-block"}}
                primary={user?user.name:""}
                secondary={
                  <Fragment>
                    { element.comment}
                  </Fragment>
                }
              />
            </ListItem>
          
        );
      })}
    </List>
  );
}
