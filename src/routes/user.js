import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { app, database, db, signInUser, storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { endSession, getSession, isLoggedIn } from "../storage/session";
import { v4 } from "uuid";
import {
  Button,
  Checkbox,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { async } from "@firebase/util";
import CardComponent from "../components/CardComponent/CardComponent";
import PostAdd from "../components/PostAdd/PostAdd";

export default function User() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [ImageUpload, setImageUpload] = useState(null);
  const [date, setDate] = useState(Timestamp.fromDate(new Date()));
  const [share, setShare] = useState(false);
  const [posts, setPosts] = useState([]);
  const [postsImageUrls, setPostsImageUrls] = useState([]);

  const postsImageUrlsRef = ref(storage, "Images/");

  const postAsync = async () => {
    let loginResponse = getAuth(app);
    const data = await getDocs(collection(db, "Post"))
      .then((e) => {
        return e.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      })
      .then((res) =>
        res.filter((elem) => elem.userId === loginResponse.lastNotifiedUid)
      );

    setPosts(data);
  };

  useEffect(() => {
    postAsync();
  }, []);

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }

    let session = getSession();
    setEmail(session.email);
  }, [navigate]);

  const onSendPost = useCallback(async () => {
    try {
      let loginResponse = getAuth(app);
      await addDoc(collection(db, "Post"), {
        userId: loginResponse.lastNotifiedUid,
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

  useEffect(() => {
    listAll(postsImageUrlsRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setPostsImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  const onLogout = () => {
    endSession();
    navigate("/login");
  };

  const uploadImage = () => {
    if (uploadImage == null) return;

    const imageRef = ref(storage, `Images/${ImageUpload.name}`);
    uploadBytes(imageRef, ImageUpload).then(() => alert("post sended"));
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
      <div>
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
