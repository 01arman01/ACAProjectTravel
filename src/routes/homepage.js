import CardComponent from "../components/CardComponent/CardComponent";
import {createUseStyles} from "react-jss";
import { useCallback, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import {db,} from "../firebase";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import Header from "../components/Header/Header";
import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = createUseStyles({
    hompageMain: {
        display: "flex",
        textAlign: "center",
        flexWrap: "wrap",
        width: "98vw",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "space-around",
    }
})

export default function Homepage(props) {
 const [posts,setPosts] = useState([])
 const [loading, setloading] = useState(false)
 const [scrollIndex,setScrollIndex] = useState(10)

 const storage = getStorage();

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
         setPosts(data_1)
    }catch(error) {
        console.log(error);
      } 
  },[])

//    postPost()
 useEffect(()=>{
    postAsync()
 },[])

 console.log(window.innerHeight ,document.documentElement.scrollTop,
    document.documentElement.offsetHeight)
 const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      // Достигнут конец страницы, загрузите следующую страницу
      setScrollIndex(()=>scrollIndex + 8);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });


    const styles = useStyles()
    return (
        <>
        <InfiniteScroll
      dataLength={posts.length}
      // next={handleScroll}
      hasMore={true}
      // loader={<CircularIndeterminate/>}
    >
        
        <div className={styles.hompageMain}>
            {console.log(posts,scrollIndex)}
           {posts.filter(((elem,index)=>{return (elem.share === true && index<=scrollIndex)})).map((elem)=>{
            return <CardComponent key={elem.id} value={elem}  load={loading} />
           })}
            {/* {loading && <div>Loading...</div>} */}
        </div>
        </InfiniteScroll>
        </>
    );
}