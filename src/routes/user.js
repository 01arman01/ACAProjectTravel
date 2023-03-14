<<<<<<< HEAD
import { CheckBox } from "@mui/icons-material";
import {Button, Checkbox, Container, TextField, Typography} from "@mui/material";
import { getAuth } from "firebase/auth";
import { addDoc, collection, doc, getDocs, setDoc, Timestamp } from "firebase/firestore";
import {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import { app, database, db, signInUser } from "../firebase";
import { endSession, getSession, isLoggedIn } from "../storage/session";
// import { getStorage, ref } from "firebase/storage";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
// import { getStorage, ref, getDownloadURL } from "firebase/storage";
=======
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { app, db, storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { endSession, getSession, isLoggedIn } from "../storage/session";
import { v4 } from "uuid";
import { Button, Checkbox, Container, TextField } from "@mui/material";

>>>>>>> c9eeaa412cc37216a1fb73e872153286dc6307ce
export default function User() {
  let navigate = useNavigate();

<<<<<<< HEAD
  let navigate = useNavigate()
  const [posts,setPosts] = useState("")
  const [postId,setPostId] = useState("")
  const [email, setEmail] = useState("");
  const [userId,setUserId] = useState("sss")
  const [title,setTitle] = useState("")
  const [text,setText] = useState("")
  const [image,setImage] = useState("")
  const [date,setDate] = useState(Timestamp.fromDate(new Date()))
  const [share,setShare] = useState(false)

  // import { getStorage, ref, getDownloadURL } from "firebase/storage";

  // Create a reference to the file we want to download
  

  // 'file' comes from the Blob or File API
 


  const storage = getStorage();

const getPost = useCallback(async ()=>{
      try{
        let loginResponse = getAuth(app);
        await addDoc(collection(db, "Post"), {
          userId:loginResponse.lastNotifiedUid,
          title,
          text,
          image:image.name,
          date,
          share,
        }).then(docRef => {
          const storageRef = ref(storage, `post_image/`+docRef.id+'/'+ image.name);
          uploadBytes(storageRef, image).then((snapshot) => {
            console.log(snapshot);
          });
          return docRef.id
        }).then(doc => {
         
      })
      //  console.log(postId.uid,'hellllo')
        // const data = await getDocs(postList)
        // setPosts(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
        
      }catch(err){
        console.log(err)
      }
      
      },[title,
        text,
        image,
        date,share,storage])

=======
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [ImageUpload, setImageUpload] = useState(null);
  const [date, setDate] = useState(Timestamp.fromDate(new Date()));
  const [share, setShare] = useState(false);
 let postID = ''

>>>>>>> c9eeaa412cc37216a1fb73e872153286dc6307ce
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }

    let session = getSession();
    setEmail(session.email);
<<<<<<< HEAD
    
    // console.log("Your access token is: " + isLoggedIn());
=======
>>>>>>> c9eeaa412cc37216a1fb73e872153286dc6307ce
  }, [navigate]);

  const getPost = useCallback(async () => {
    try {
      let loginResponse = getAuth(app);
      console.log(loginResponse)
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

  const addPost =()=>{
    getPost()
  
 
  }



  return (
<<<<<<< HEAD
    <Container maxWidth="xs" sx={{mt: 2}}>
       <TextField
          label="Title"
          variant="outlined"
          type="text"
          autoComplete="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{mt: 1}}
          fullWidth
        />
        <TextField
          label="Text"
          variant="outlined"
          type="text"
          autoComplete="Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          sx={{mt: 3}}
          fullWidth
        />
       <Button variant="contained" component="label">
      Upload Image
    <input hidden  accept="image/*" onChange={(e) => {setImage(e.target.files[0])}} multiple type="file" />
    </Button>
        <Button variant="contained" onClick={addPost} type="submit" sx={{mt: 3}} fullWidth>add Post</Button>
        <Checkbox
          checked={share}
          onChange={()=>setShare(!share)}
          inputProps={{ 'aria-label': 'controlled' }}
/>
      <Button variant="contained" color="error" onClick={onLogout} sx={{mt: 3}} fullWidth>
=======
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
>>>>>>> c9eeaa412cc37216a1fb73e872153286dc6307ce
        Log out
      </Button>
    </Container>
  );
}
