import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { app, database, db, signInUser, storage } from "../firebase";
import { getDownloadURL, getStorage, listAll, ref, uploadBytes } from "firebase/storage";
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
import { child, get, getDatabase, onValue } from "firebase/database";
import { CardComponentContext } from "../contexts/context";

export default function User() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [ImageUpload, setImageUpload] = useState(null);
  const [date, setDate] = useState(Timestamp.fromDate(new Date()));
  const [share, setShare] = useState(false);
  const [posts,setPosts] = useState([])
  const [imageId,setImageId] = useState(v4)
  const [loading, setloading] = useState(false)

  let loginResponse = getAuth(app);
  const storage = getStorage();
  // const postAsync = async ()=>{
  //   const data = await getDocs(collection(db, "Post")).then((e)=>{
  //    return e.docs.map((doc)=>({...doc.data(),id:doc.id}))})
  //    .then((arr)=>{
  //      return arr.filter((elem)=>elem.userId === loginResponse.lastNotifiedUid )
  //    })
  //    .then((elem)=>{
  //      elem.forEach((elm)=>{
  //        console.log(elm.image_id)
  //        const starsRef =  ref(storage, `Post_image/${elm.image_id}`);
  //             getDownloadURL(starsRef).then((url)=>{elm['url']=url})})
              
  //             return elem
  //            }) 
  //   setPosts(data)
  // }

  const postAsync =useCallback(async()=>{
    const data = await getDocs(collection(db, "Post"))
    const data_1 = data.docs.map((doc)=>({...doc.data(),id:doc.id}))
    .filter((elem)=>elem.userId === loginResponse.lastNotifiedUid )

    data_1.forEach((elm,index)=>{
      const starsRef =  ref(storage, `Post_image/${elm.image_id}`);
           getDownloadURL(starsRef).then((url)=>{elm['url']=url}).then((elem)=>{if(index+1 === data_1.length){setloading(true)}})})
    console.log(data_1)
    setPosts(data_1)  
    //  return e.docs.map((doc)=>({...doc.data(),id:doc.id}))})
    //  .then((arr)=>{return arr})
    // //  .then((elem)=>{
    //    elem.forEach((elm)=>{
    //      console.log(elm.image_id)
    //      const starsRef =  ref(storage, `Post_image/${elm.image_id}`);
    //           getDownloadURL(starsRef).then((url)=>{elm['url']=url})})
    //           return elem
    //          }) 
    // setPosts(data)
  },[])

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
    let loginResponse = getAuth(app);
    try {
      await addDoc(collection(db, "Post"), {
        userId: loginResponse.lastNotifiedUid,
        title,
        text,
        image_id: imageId,
        date,
        share,
      }).then((res) => {
      }).then();
    } catch (err) {
    }
  }, [title, text, date, share,imageId]);





  const onLogout = () => {
    endSession();
    navigate("/login");
  };

  const uploadImage =() => {
    if (uploadImage == null) return;
    const imageRef = ref(storage, `Post_image/${imageId}`);
    uploadBytes(imageRef, ImageUpload).then((as) => console.log(as));
    setImageId(v4)
  };

  const addPost = () => {
    uploadImage()
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
          // onClick={uploadImage}
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
      // const as = imageUrl(elem.id)
      console.log(posts,"post")
      return <CardComponent key={elem.id} value={elem} load={loading} />
     })}
   
  </div>
  
  </>
  );
}
