//React
import { useCallback, useEffect, useState } from "react";
//Firebase
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { app, db, storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
//Components
import Header from "../components/Header/Header";
import InfiniteScroll from "react-infinite-scroll-component";
import LogoutDialog from "../components/LogoutDialog";
//Styles
import { createUseStyles } from "react-jss";
import PostCard from "../components/CardComponent/PostCard";
import Main from "../components/Main/Main";

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
  const [loading, setloading] = useState(false);
  const [scrollIndex, setScrollIndex] = useState(10);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  // Set posts data
  // const onSetPosts = async () => {
  //   const data = await getDocs(collection(db, "Posts"))
  //     .then((e) => {
  //       return e.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  //     })
  //     .then((res) => res.filter((elem) => elem.share === true));

  //   setPosts(data);
  // };

  useEffect(() => {
    onSnapshot(collection(db, "Posts"), (data) => {
      const newData = data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((elem) => elem.share === true);
      newData.forEach((elm, index) => {
        const starsRef = ref(storage, `Images/${elm.imageId}`);
        getDownloadURL(starsRef)
          .then((url) => {
            elm["url"] = url;
          })
          .then((elem) => {
            if (index + 1 === newData.length) {
              setloading(true);
            }
          });
      });
      setPosts(newData);
    });
  }, []);

  //Get all storage images in the same array
  // useEffect(() => {
  //   const postsImageUrlsRef = ref(storage, "Images/");
  //   listAll(postsImageUrlsRef).then((res) => {
  //     res.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         setPostsImageUrls((prev) => [...prev, [url, item.name]]);
  //       });
  //     });
  //   });
  // }, []);

  //Scrolling function
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setScrollIndex(() => scrollIndex + 8);
    }
  };

  useEffect(() => {
    onSnapshot(collection(db, "User"), (data) => {
      const usersData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setUsers(usersData);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Main />
      <InfiniteScroll
        dataLength={posts.length}
        hasMore={true}
        style={{ overflowX: "hidden" }}
      >
        <div className={styles.hompageMain}>
          {posts
            .filter((post, index) => index <= scrollIndex)
            .map((post) => {
              const user = users.find((el) => el.id === post.userId);
              return <PostCard key={post.id} post={post} page={"homePage"} user={user}/>;
            })}
        </div>
      </InfiniteScroll>
    </>
  );
}
