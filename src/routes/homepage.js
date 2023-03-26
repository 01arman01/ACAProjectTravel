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
import bgPosts from "../imgs/posts-section.jpg";
import { borderBottom } from "@mui/system";
import { useDownloadURL } from "react-firebase-hooks/storage";

const useStyles = createUseStyles({
  postsSection: {
    width: "100vw",
    height: "auto",
    background: `url(${bgPosts})`,
    backgroundSize: "cover",
    paddingTop: "20px",
  },
  postsInner: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
  },
  postsTitle: {
    fontWeight: "600",
    width: "100vw",
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    letterSpacing: "0.5em",
    borderTop: "2px solid orange",
    borderBottom: "2px solid blue",
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
      <div className={styles.postsTitle}>
        -- -- -- -- -- POSTS -- -- -- -- --
      </div>
      <div className={styles.postsSection}>
        <div className={styles.container}>
          <InfiniteScroll
            dataLength={posts.length}
            hasMore={true}
            style={{ overflowX: "hidden" }}
          >
            <div className={styles.postsInner}>
              {posts
                .filter((post, index) => index <= scrollIndex)
                .map((post) => {
                  const user = users.find((el) => el.id === post.userId);
                  return (
                    <PostCard
                      key={post.id}
                      post={post}
                      page={"homePage"}
                      user={user}
                    />
                  );
                })}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
}
