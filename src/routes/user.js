import { useCallback, useEffect, useState } from "react";
//Router
import { useNavigate } from "react-router-dom";
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
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  //Auth
  const auth = getAuth(app);
  const userId = auth.lastNotifiedUid;



  useEffect(() => {
    onSnapshot(collection(db, "User"), (data) => {
      const user = data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id })).filter((elm)=>elm.id === auth.lastNotifiedUid)
        setUser(user[0])
    });
  },[]);
  // useEffect(() => {
  //   const user = users.find((el) => el.id === userId);
  //   setUser(user);
  // }, [users]);

  //Set posts data
  useEffect(() => {
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
    navigate("/login");
  };

  return (

    isLoggedIn() && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            // position: "absolute",
            // top: "50px",
            paddingTop:"50px"
          }}
        >
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

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
              alignItems: "flex-end",
              flexDirection: "column",
              alignContent: " space-around",
              width: "72%",
            }}
          >
            {posts.length !== 0 &&
              posts.map((post) => {
                // const as = imageUrl(post.id)
                // console.log(posts,"post")
                return (
                  <PostCard
                    key={post.id}
                    post={post}
                    load={loading}
                    page={"user"}
                    imageLoadnig={imageLoadnig}
                    user={user}
                  
                  />
                );
                // return <CardComponent key={elem.id} value={elem} like={like} load={loading} del={deletePost} updatePost={updatePost} />
              })}
          </div>
        </div>
    )

  );
}
