import { useCallback, useEffect, useState } from "react";
//Router
import { useLocation, useNavigate } from "react-router-dom";
//firebase
import { app, db, storage } from "../firebase";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  getStorage,
  deleteObject,
} from "firebase/storage";
import {
  addDoc,
  collection,
  getDocs,
  Timestamp,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { child, get, getDatabase, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
//Session
import { endSession, getSession, isLoggedIn } from "../storage/session";
//Mui
import { Button, Checkbox, Container, TextField } from "@mui/material";
//Styles
import { useUserStyles } from "./user.styles";
//Uuid
import { v4 } from "uuid";
//Components
import PostAdd from "../components/PostAdd/PostAdd";
import Header from "../components/Header/Header";
import PostCard from "../components/CardComponent/PostCard";
import Navbar from "../components/Navbar/Navbar";
import { LOGIN_PAGE } from "../RoutePath/RoutePath";
import dayjs from 'dayjs';


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
  const [date, setDate] = useState(Timestamp.fromDate(new Date()));
  const [share, setShare] = useState(false);
  const [posts, setPosts] = useState([]);
  // const [postsImageUrls, setPostsImageUrls] = useState([]);

  const [imageId, setImageId] = useState(v4);
  const [loading, setloading] = useState(false);
  const [imageLoadnig, setImageLoadnig] = useState(false);
  const [user, setUser] = useState(null);
  const [timeDate,setTimeDate] = useState(dayjs(new Date()))

  //Auth
  const auth = getAuth(app);
  const userId = auth.lastNotifiedUid;

  useEffect(() => {
    onSnapshot(collection(db, "User"), (data) => {
      console.log(data, "data");
      const user = data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((elm) => elm.id === userId);
      setUser(user[0]);
    });
  }, [userId]);


  useEffect(() => {
    // setTimeDate(dayjs(new Date()).format('MM/DD/YYYY hh:mm'))

    // console.log(timeDate.toDate(),userId)
    if(userId){
      updateDoc(doc(db, "User",  userId), {time:timeDate.toDate()});
    }
  }, [userId,timeDate]);

  //Set posts data
  useEffect(() => {
    console.log("b")
    onSnapshot(collection(db, "Posts"), (data) => {
      const newData = data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((elem) => elem.userId === userId);
      newData.forEach((elm, index) => {
        const starsRef = ref(storage, `Images/${elm.imageId}`);
        getDownloadURL(starsRef)
          .then((url) => {
            elm["url"] = url;
          })
          .then((elem) => {
            if (index + 1 === newData.length) {
              setloading(true);
            }
          })
          .then(() => {
            setImageLoadnig(false);
          });
      });
      setPosts(newData);
    });
  }, [userId]);

  //Upload and send image to storage
  const onUploadImage = () => {
    if (ImageUpload == null) return;
    const imageRef = ref(storage, `Images/${imageId}`);
    uploadBytes(imageRef, ImageUpload).then((res) => {
      onSendPost();
      setImageId(v4);
    });
  };

  const onAddPost = () => {
    setImageLoadnig(true);
    onUploadImage();
  };

  //Send post to database
  const onSendPost = useCallback(async () => {
    try {
      await addDoc(collection(db, "Posts"), {
        userId: userId,
        title,
        text,
        imageId: imageId,
        date,
        share,
      }).then((res) => {});
    } catch (err) {}
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
    isLoggedIn() && user != null && (
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
