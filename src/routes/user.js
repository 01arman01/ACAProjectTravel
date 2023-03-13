import { CheckBox } from "@mui/icons-material";
import {Button, Checkbox, Container, TextField, Typography} from "@mui/material";
import { getAuth } from "firebase/auth";
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import { app, database, db, signInUser } from "../firebase";
import { endSession, getSession, isLoggedIn } from "../storage/session";

export default function User() {

  let navigate = useNavigate()
  const [posts,setPosts] = useState("")
  const [email, setEmail] = useState("");
  const [userId,setUserId] = useState("sss")
  const [title,setTitle] = useState("")
  const [text,setText] = useState("")
  const [image,setImage] = useState("")
  const [date,setDate] = useState("date")
  const [share,setShare] = useState(false)

const getPost = useCallback(async ()=>{
      try{
        let loginResponse = await getAuth(app);
        await addDoc(collection(db, "Post"), {
          userId:loginResponse.lastNotifiedUid,
          title,
          text,
          image,
          date,
          share,
        });

        // const data = await getDocs(postList)
        // setPosts(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
        
      }catch(err){
        console.log(err)
      }
      
      },[title,
        text,
        image,
        date,share])

  useEffect(() => {
    
    if (!isLoggedIn()) {
      navigate("/login");
    }
  
    let session = getSession();
    setEmail(session.email);
    
    console.log("Your access token is: " + isLoggedIn());
  }, [navigate]);
  
  const onLogout = () => {
    endSession();
    navigate("/login");
  }

  const addPost =()=>{
    getPost()
    // console.log()
  }



  return (
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
    <input hidden  accept="image/*" onChange={(e) => {setImage(URL.createObjectURL(e.target.files[0]))
      }} multiple type="file" />
    </Button>
        <Button variant="contained" onClick={addPost} type="submit" sx={{mt: 3}} fullWidth>add Post</Button>
        <Checkbox
          checked={share}
          onChange={()=>setShare(!share)}
          inputProps={{ 'aria-label': 'controlled' }}
/>
      <Button variant="contained" color="error" onClick={onLogout} sx={{mt: 3}} fullWidth>
        Log out
      </Button>
    </Container>
  )
}