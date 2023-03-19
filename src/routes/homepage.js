import CardComponent from "../components/CardComponent/CardComponent";
import {createUseStyles} from "react-jss";
import React, { useCallback, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
// import { app, db } from "../firebase";
import { Podcasts } from "@mui/icons-material";
import { async } from "@firebase/util";
import { getAuth } from "firebase/auth";
// import { getDownloadURL, getStorage } from "firebase/storage";
import { app, database, db, signInUser, storage } from "../firebase";
import { getDownloadURL, getStorage, listAll, ref, uploadBytes } from "firebase/storage";
import Header from "../components/Header/Header";
import LogoutDialog from "../components/LogoutDialog";
// import { ref } from "firebase/database";


const useStyles = createUseStyles({
    hompageMain: {
        textAlign: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        width:"100vw"
    }
})


export default function Homepage(props) {
 const [posts,setPosts] = useState([])
 const [loading, setloading] = useState(false)
//  let loginResponse = getAuth(app);
 const storage = getStorage();

    const[headerBtnClickChange,setHeaderBtnClickChange] = useState(false)
    const onClickBtnStatusChange = ()=> {
        setHeaderBtnClickChange(!headerBtnClickChange)
    }

 const postAsync =useCallback(async()=>{
    try {
        const data = await getDocs(collection(db, "Post"))
        const data_1 = data.docs.map((doc)=>({...doc.data(),id:doc.id}))
        const a = data_1.forEach((elm,index)=>{
        const starsRef =  ref(storage, `Post_image/${elm.image_id}`);
          if(starsRef.name !== "undefined"){
           getDownloadURL(starsRef).then((url)=>{elm['url']=url}).then((elem)=>{setloading(true)
             })}
          }
         )
         console.log(a,'ssssss',data_1)
         
         setPosts(data_1)
    }catch(error) {
        console.log(error);
      } 
  },[])

//    postPost()
 useEffect(()=>{
    postAsync()
 },[])
    const styles = useStyles()
    return (
        <>
        <Header/>
        <div className={styles.hompageMain}>
            {console.log(posts)}
           {posts.filter((elem=>elem.share === true)).map((elem)=>{
            
            return <CardComponent key={elem.id} value={elem}  load={loading} />
           })}
        </div>

        </>
    );
}