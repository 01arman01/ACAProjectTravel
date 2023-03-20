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
import { getAuth } from "firebase/auth";
//Session
import { endSession, getSession, isLoggedIn } from "../storage/session";
//Mui
import { Button, Checkbox, Container, TextField } from "@mui/material";
//Styles
import { useUserStyles } from "./user.styles";
//Components
import CardComponent from "../components/CardComponent/CardComponent";
import PostAdd from "../components/PostAdd/PostAdd";
import Header from "../components/Header/Header";

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
  const [postsImageUrls, setPostsImageUrls] = useState([]);

  //Auth
  const auth = getAuth(app);
  const userId = auth.lastNotifiedUid;

  //Set posts data
  const onSetPosts = async () => {
    const data = await getDocs(collection(db, "Post"))
      .then((e) => {
        return e.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      })
      .then((res) =>
        res.filter((elem) => elem.userId === auth.lastNotifiedUid)
      );

    setPosts(data);
  };

  useEffect(() => {
    onSetPosts();
  }, []);

  //Upload and send image to storage
  const uploadImage = () => {
    if (ImageUpload == null) return;

    const imageRef = ref(storage, `Images/${ImageUpload.name}`);
    uploadBytes(imageRef, ImageUpload).then(() => alert("post sended"));
  };

  //Send post to database
  const onSendPost = useCallback(async () => {
    try {
      await addDoc(collection(db, "Post"), {
        userId: userId,
        title,
        text,
        image: ImageUpload.name,
        date,
        share,
      }).then((res) => {
        uploadImage();
      });
    } catch (err) {}
  }, [title, text, ImageUpload, date, share]);

  //Get all storage images in the same array
  useEffect(() => {
    const postsImageUrlsRef = ref(storage, "Images/");

    listAll(postsImageUrlsRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setPostsImageUrls((prev) => [...prev, [url, item.name]]);
        });
      });
    });
  }, []);

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
    <>
      <PostAdd
        title={title}
        setTitle={setTitle}
        text={text}
        setText={setText}
        onSendPost={onSendPost}
        setImageUpload={setImageUpload}
        share={share}
        setShare={setShare}
      />
      <Button
        variant="contained"
        color="error"
        onClick={onLogout}
        sx={{ mt: 3 }}
        fullWidth
      >
        Log out
      </Button>
      <div className={styles.cardsBlok}>
        {posts.map((post, index) => {
          return (
            <CardComponent
              key={post.id}
              post={post}
              postsImageUrls={postsImageUrls}
            />
          );
        })}
      </div>
    </>
  );
}
