import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { app, db } from "../firebase";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { endSession, getSession, isLoggedIn } from "../storage/session";
import { v4 } from "uuid";
import {
  Button,
  Checkbox,
  Container,
  TextField,
  
} from "@mui/material";
import CardComponent from "../components/CardComponent/CardComponent";
import CircularIndeterminate from "../components/CircularIndeterminate";
import { onSnapshot } from "firebase/firestore";
import PostCard from "../components/CardComponent/PostCard";



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
  const [imageLoadnig,setImageLoadnig] = useState(false)
  let loginResponse = getAuth(app);
  const storage = getStorage();
  
  useEffect(()=>{
    onSnapshot(collection(db, "Post"), (data) => {
      const data_1 = data.docs.map((doc)=>({...doc.data(),id:doc.id}))
      .filter((elem)=>elem.userId === loginResponse.lastNotifiedUid )
      data_1.forEach((elm,index)=>{
        const starsRef =  ref(storage, `Post_image/${elm.image_id}`);
             getDownloadURL(starsRef).then((url)=>{elm['url']=url}).then((elem)=>{if(index+1 === data_1.length){setloading(true)}})
             .then(()=>{setImageLoadnig(false)})})
      setPosts(data_1)  
      });
  },[loginResponse.lastNotifiedUid,storage])

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
console.log(res,"hellllooo")      }).then();
    } catch (err) {
    }
  }, [title, text, date, share,imageId]);

  const like = useCallback(async (id) => {
    let loginResponse = getAuth(app);
    try {
      await addDoc(collection(db, "Like"), {
        userId: loginResponse.lastNotifiedUid,
        postId:id,
      }).then((res) => {
        console.log(res,"Helllo")
      }).then();
    } catch (err) {
    }
  }, []);



  const onLogout = () => {
    endSession();
    navigate("/login");
  };

  const uploadImage =() => {
    if (uploadImage == null) return;
    const imageRef = ref(storage, `Post_image/${imageId}`);
    uploadBytes(imageRef, ImageUpload).then((as) =>{getPost()
      setImageId(v4)})
    
  };

  const addPost = () => {
    setImageLoadnig(true)
    uploadImage()
  };

 const deletePost =async(id,img_id)=>{
  await deleteDoc(doc(db, "Post", id));
  const desertRef = ref(storage, `Post_image/${img_id}`);
      deleteObject(desertRef).then(() => {
      console.log("delete")
      }).catch((error) => {
        console.log("delete"+error)
      })
 }

 const updatePost = async(id,data)=>{
  const washingtonRef = doc(db, "Post",id);
    await updateDoc(washingtonRef, data);

 }



  return (
    <div style={{display: "flex",
      justifyContent: "space-between"}}>
    {imageLoadnig && <CircularIndeterminate/>}
    <Container maxWidth="sm" sx={{ mt: 0 ,width:"40%"}}>
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
        <input hidden accept="image/*"
          onChange={(e) => {
            setImageUpload(e.target.files[0]);
          }}
          // onClick={uploadImage}
          multiple
          type="file"
        />
      </Button>
      <Button variant="contained" onClick={addPost} type="submit" sx={{ mt: 3 }} fullWidth >
        add Post
      </Button>
      <Checkbox checked={share} onChange={() => setShare(!share)} inputProps={{ "aria-label": "controlled" }} />
      <Button variant="contained" color="error" onClick={onLogout} sx={{ mt: 3 }} fullWidth >
        Log out
      </Button>
    </Container>
   
     <div style={{display: "flex",flexWrap: "wrap",justifyContent: "space-around",
    alignItems: "flex-end",
    flexDirection: "column",
    alignContent:" space-around",
    width: "72%",
    }} >   
     {posts.map((elem)=>{
      // const as = imageUrl(elem.id)
      // console.log(posts,"post")
     return <PostCard key={elem.id} value={elem} like={like} load={loading} del={deletePost} updatePost={updatePost}/>
      // return <CardComponent key={elem.id} value={elem} like={like} load={loading} del={deletePost} updatePost={updatePost} />
     })}
  
  </div>
  </div>
  );
}
