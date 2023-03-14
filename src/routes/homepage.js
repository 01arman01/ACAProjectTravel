import CardComponent from "../components/CardComponent/CardComponent";
import {createUseStyles} from "react-jss";
import { useCallback, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Podcasts } from "@mui/icons-material";
import { async } from "@firebase/util";

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

 const postAsync = async ()=>{
    const data = await getDocs(collection(db, "Post")).then((e)=>{return e.docs.map((doc)=>({...doc.data(),id:doc.id}))}).
    then((res)=>res)
    setPosts(data)
  }


  useEffect(()=>{
    postAsync()
    },[])
//    postPost()



    const styles = useStyles()
    return (
        <div className={styles.hompageMain}>
           {posts.filter((elem=>elem.share === true)).map((elem)=>{
            console.log(elem)
            return <CardComponent key={elem.date.id} value={elem} />
            
           })}
            
        </div>
    );
}