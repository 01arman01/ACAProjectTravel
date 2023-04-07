//React
import { useCallback, useEffect, useState } from "react";
//Firebase
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, getDownloadURL } from "firebase/storage";
//Components
import InfiniteScroll from "react-infinite-scroll-component";
//Styles
import { createUseStyles } from "react-jss";
import PostCard from "../components/CardComponent/PostCard";
import Main from "../components/Main/Main";

const useStyles = createUseStyles({
  postsSection: {
    width: "100vw",
    height: "auto",
    backgroundColor: "#DFE5EA",
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
    borderTop: "2px solid #5CC2C7",
    borderBottom: "2px solid #5CC2C7",
  },
});

export default function Homepage() {
  //styles
  const styles = useStyles();

  //states
  const [posts, setPosts] = useState([]);
  const [scrollIndex, setScrollIndex] = useState(2);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const citiesRef = collection(db, "Posts");
    const q = query(citiesRef, orderBy("date", "desc"));
    onSnapshot(q, (data) => {
      const newData = data.docs
        .filter((elem) => elem.data().share === true)
        .map((doc) => {
          const storageRef = ref(storage, `Images/${doc.data().imageId}`);
          return getDownloadURL(storageRef)
            .then((url) => {
              return {
                ...doc.data(),
                id: doc.id,
                url: url,
              };
            })
            .catch((err) => {
              return {
                ...doc.data(),
                id: doc.id,
                url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlHBoELHG9IPFDyVp_5_lRfL-9zTYR-YG1nEC8N9c&s",
              };
            });
        });
      Promise.all(newData)
        .then((downloadUrls) => {
          setPosts(downloadUrls);
        })
        .catch((error) => console.log(error, "asdfasdf"));
    });
  }, []);

 

  //Scrolling function
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop <=
      document.documentElement.offsetHeight
    ) {
      setScrollIndex(() => scrollIndex + 3);
    }
  }, [scrollIndex]);

  useEffect(() => {
    onSnapshot(collection(db, "User"), (data) => {
      const usersData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setUsers(usersData);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

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
