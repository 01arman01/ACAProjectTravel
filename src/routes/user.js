import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { app, database, db, signInUser, storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";
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

export default function User() {
  let navigate = useNavigate();
  const [userId,setUserId] =useState("")
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [ImageUpload, setImageUpload] = useState(null);
  const [date, setDate] = useState(Timestamp.fromDate(new Date()));
  const [share, setShare] = useState(false);
  const [posts,setPosts] = useState([])

  const postAsync = async ()=>{
    let loginResponse = getAuth(app);
    // setUserId(loginResponse.lastNotifiedUid)
     const data = await getDocs(collection(db, "Post")).then((e)=>{return e.docs.map((doc)=>({...doc.data(),id:doc.id}))}).
     then((res)=>res.filter((elem)=>elem.userId === loginResponse.lastNotifiedUid ))
     
     setPosts(data)
   }
 
 
   useEffect(()=>{

     postAsync()
     },[])



  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }

    let session = getSession();
    setEmail(session.email);
  }, [navigate]);

  const getPost = useCallback(async () => {
    try {
      let loginResponse = getAuth(app);
      // setUserId(loginResponse.lastNotifiedUid)
      await addDoc(collection(db, "Post"), {
        userId: loginResponse.lastNotifiedUid,
        title,
        text,
        image: ImageUpload.name,
        date,
        share,
      }).then((res) => {
        console.log(res);
        // postID  = res.id
        uploadImage(res.id);
      });
    } catch (err) {
    }
  }, [title, text, ImageUpload, date, share]);

  const onLogout = () => {
    endSession();
    navigate("/login");
  };

  const uploadImage = (id) => {
    if (uploadImage == null) return;

    const imageRef = ref(storage, `images/${id}/${ImageUpload.name }`);
    uploadBytes(imageRef, ImageUpload).then(() => alert("post sended"));
  };

  const addPost = () => {
    // uploadImage();
    getPost();
  };

  return (
    <>
    <Container maxWidth="xs" sx={{ mt: 2 }}>
      <TextField
        label="Title"
        variant="outlined"
        type="text"
        autoComplete="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mt: 1 }}
        fullWidth
      />
      <TextField
        label="Text"
        variant="outlined"
        type="text"
        autoComplete="Text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{ mt: 3 }}
        fullWidth
      />
      <Button variant="contained" component="label">
        Upload Image
        <input
          hidden
          accept="image/*"
          onChange={(e) => {
            setImageUpload(e.target.files[0]);
          }}
          multiple
          type="file"
        />
      </Button>
      <Button
        variant="contained"
        onClick={addPost}
        type="submit"
        sx={{ mt: 3 }}
        fullWidth
      >
        add Post
      </Button>
      <Checkbox
        checked={share}
        onChange={() => setShare(!share)}
        inputProps={{ "aria-label": "controlled" }}
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
    </Container>
     <div >
     {posts.map((elem)=>{
      console.log(elem)
      return <CardComponent key={elem.date.id} value={elem} />
      
     })}
      
  </div>
  </>
  );
}
