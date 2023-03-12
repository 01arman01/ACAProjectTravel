import {Button, Container, Typography} from "@mui/material";
import { getAuth } from "firebase/auth";
import { addDoc, collection, getDocs } from "firebase/firestore";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import { app, database, db, signInUser } from "../firebase";
import { endSession, getSession, isLoggedIn } from "../storage/session";

export default function User() {

  let navigate = useNavigate()
  const [post,setPost] = useState("")
  const [email, setEmail] = useState("");
  const postList = collection(db,'posts')

console.log(postList)
  useEffect(()=>{
    const getPost = async()=>{
      try{
        const data = await getDocs(postList)
        setPost(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
        console.log(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
        
      }catch(err){
        console.log("err")
      }
      let loginResponse = await getAuth(app);
      console.log(loginResponse,"DDDDDDDDDDDDDDD");
      const postPost = await addDoc(db,{
        id:loginResponse.lastNotifiedUid,
        title:"Hello",
        value:"post"
      })

    }
    getPost()
  },[])
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

  return (
    <Container maxWidth="xs" sx={{mt: 2}}>
      <Typography variant="h6" component="h1" textAlign="center" gutterBottom>
        You're logged in as:
        {}
      </Typography>
      <Typography variant="h5" component="h1" textAlign="center" gutterBottom>
        {email}
      </Typography>
      <Typography variant="p" component="p" textAlign="center" gutterBottom>
        Check the console for your (access/session) token.
      </Typography>
      <Button variant="contained" color="error" onClick={onLogout} sx={{mt: 3}} fullWidth>
        Log out
      </Button>
    </Container>
  )
}