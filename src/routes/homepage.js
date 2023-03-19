import CardComponent from "../components/CardComponent/CardComponent";
import { createUseStyles } from "react-jss";
import { useCallback, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { app, db, storage } from "../firebase";
import Header from "../components/Header/Header";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

const useStyles = createUseStyles({
  hompageMain: {
    textAlign: "center",
    display: "flex",
    flexWrap: "wrap",
    width: "100vw",
  },
});

export default function Homepage(props) {
  const styles = useStyles();

  const [posts, setPosts] = useState([]);
  const [postsImageUrls, setPostsImageUrls] = useState([]);

  const postAsync = async () => {
    const data = await getDocs(collection(db, "Post"))
      .then((e) => {
        return e.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      })
      .then((res) => res);
    setPosts(data);
  };

  useEffect(() => {
    postAsync();
  }, []);

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

  return (
    <>
      <Header />
      <div className={styles.hompageMain}>
        {posts
          .filter((post) => post.share === true)
          .map((post) => {
            return (
              <>
                <CardComponent
                  key={post.id}
                  post={post}
                  postsImageUrls={postsImageUrls}
                />
              </>
            );
          })}
      </div>
    </>
  );
}
