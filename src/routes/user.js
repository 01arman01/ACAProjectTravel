import { useCallback, useEffect, useState } from "react";
//Router
import { useNavigate } from "react-router-dom";
//firebase
import { app, db, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
//Session
import { getDocs, Timestamp, deleteDoc } from "firebase/firestore";
import { child, get, getDatabase, onValue } from "firebase/database";
//Session
import { endSession, getSession, isLoggedIn } from "../storage/session";
//Mui
import { Button, Checkbox, Container, TextField } from "@mui/material";
//Styles
import { useUserStyles } from "./user.styles";
//Uuid
import { v4 } from "uuid";
//Components
import PostCard from "../components/CardComponent/PostCard";
import Navbar from "../components/Navbar/Navbar";
import { LOGIN_PAGE } from "../RoutePath/RoutePath";
import dayjs from "dayjs";

export default function User() {
  //navigate
  let navigate = useNavigate();
  //Styles
  const styles = useUserStyles();
  //states
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [ImageUpload, setImageUpload] = useState(null);
  const [date, setDate] = useState(dayjs(new Date()).toDate());
  const [share, setShare] = useState(false);
  const [posts, setPosts] = useState([]);
  // const [postsImageUrls, setPostsImageUrls] = useState([]);

  const [imageId, setImageId] = useState(v4);
  const [loading, setloading] = useState(false);
  const [imageLoadnig, setImageLoadnig] = useState(false);
  const [user, setUser] = useState(null);
  const [timeDate, setTimeDate] = useState(dayjs(new Date()));

  //Auth
  const auth = getAuth(app);
  const userId = auth.lastNotifiedUid;

  useEffect(() => {
    onSnapshot(collection(db, "User"), (data) => {
      const user = data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((elm) => elm.id === userId);
      setUser(user[0]);
    });
  }, [userId]);

  useEffect(() => {
    if (userId) {
      updateDoc(doc(db, "User", userId), { time: dayjs(new Date()).toDate() });
    }
  }, [userId, timeDate]);

  //Set posts data
  useEffect(() => {
    onSnapshot(collection(db, "Posts"), (data) => {
      const newData = data.docs
        .filter((elem) => elem.data().userId === userId)
        .map((doc) => {
          const storageRef = ref(storage, `Images/${doc.data().imageId}`);
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
          setImageLoadnig(false);
          setPosts(downloadUrls);
        })
        .catch((error) => console.log(error, "asdfasdf"));
    });
  }, [userId]);

  //Upload and send image to storage
  const onUploadImage = () => {
    if (ImageUpload == null) return;
    const imageRef = ref(storage, `Images/${imageId}`);
    uploadBytes(imageRef, ImageUpload).then((res) => {
      setImageId(v4);
      onSendPost();
    });
  };

  const onAddPost = () => {
    onUploadImage();
    setImageLoadnig(true);
  };

  //Send post to database
  const onSendPost = useCallback(async () => {
    try {
      await addDoc(collection(db, "Posts"), {
        userId: userId,
        title,
        text,
        imageId: imageId,
        date: date,
        share,
      })
        .then((res) => {
          console.log(res, "postt");
        })
        .catch((err) => {
          console.log(err, "err");
        });
    } catch (err) {
      console.log(err, "err");
    }
  }, [title, text, date, share, imageId, userId]);

  //Login status
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
    let session = getSession();
    setEmail(session.email);
  }, [navigate]);

  //Logout function
  const onLogout = () => {
    endSession();
    navigate(LOGIN_PAGE);
  };

  return (
    isLoggedIn() &&
    user != null && (
      <div className={styles.userWrapper}>
        <Navbar
          title={title}
          setTitle={setTitle}
          text={text}
          setText={setText}
          onAddPost={onAddPost}
          setImageUpload={setImageUpload}
          share={share}
          setShare={setShare}
          user={user}
        />

        <div className={styles.postsSection}>
          {posts.length !== 0 &&
            posts.map((post) => {
              return (
                <PostCard
                  key={post.id}
                  post={post}
                  load={loading}
                  imageLoadnig={imageLoadnig}
                  user={user}
                />
              );
            })}
        </div>
      </div>
    )
  );
}
