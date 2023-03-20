//React
import { useCallback, useEffect, useState } from "react";
//Firebase
import { collection, getDocs } from "firebase/firestore";
import { app, db, storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL} from "firebase/storage";
//Components
import Header from "../components/Header/Header";
import InfiniteScroll from "react-infinite-scroll-component";
import CardComponent from "../components/CardComponent/CardComponent";
import LogoutDialog from "../components/LogoutDialog";
//Styles
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  hompageMain: {
    textAlign: "center",
    display: "flex",
    flexWrap: "wrap",
    width: "100vw",
  },
});

export default function Homepage(props) {
  //styles
  const styles = useStyles();

  //states
  const [posts, setPosts] = useState([]);
  const [postsImageUrls, setPostsImageUrls] = useState([]);
  const [loading, setloading] = useState(false)
 const [scrollIndex,setScrollIndex] = useState(10)
 const[headerBtnClickChange,setHeaderBtnClickChange] = useState(false)

  // Set posts data
  const onSetPosts = async () => {
    const data = await getDocs(collection(db, "Post"))
      .then((e) => {
        return e.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      })
      .then((res) => res.filter((elem) => elem.share === true));

    setPosts(data);
  };

  useEffect(() => {
    onSetPosts();
  }, []);

  //Get all storage images in the same array
  useEffect(() => {
    const postsImageUrlsRef = ref(storage, "Images/");
    listAll(postsImageUrlsRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setPostsImageUrls((prev) => [...prev, [url, item.name]]);
        });
      });
    });
  }, []);

  //Scrolling function
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setScrollIndex(()=>scrollIndex + 8);
    }
  };
  //login status
  const onClickBtnStatusChange = ()=> {
    setHeaderBtnClickChange(!headerBtnClickChange)
}

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  },[]);

  return (
    <>
    <Header/>
      <InfiniteScroll dataLength={posts.length} hasMore={true}>
        <div className={styles.hompageMain}>
            {posts.filter(((post,index)=> index<=scrollIndex)).map((post)=>{
              return <CardComponent key={post.id} post={post} postsImageUrls={postsImageUrls}/>
            })}
        </div>
      </InfiniteScroll>
    </>
  );
}
