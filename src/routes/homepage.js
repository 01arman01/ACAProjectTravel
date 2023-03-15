import CardComponent from "../components/CardComponent/CardComponent";
import { createUseStyles } from "react-jss";
import { useCallback, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Podcasts } from "@mui/icons-material";
import { async } from "@firebase/util";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

const useStyles = createUseStyles({
  hompageMain: {
    textAlign: "center",
    display: "flex",
    flexWrap: "wrap",
    width: "100vw",
  },
});

export default function Homepage(props) {
  const [posts, setPosts] = useState([]);
  const [postsImageUrls, setPostsImageUrls] = useState([]);

  const postsImageUrlsRef = ref(storage, "Images/");

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
    listAll(postsImageUrlsRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setPostsImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  const styles = useStyles();
  return (
    <div className={styles.hompageMain}>
      {posts
        .filter((elem) => elem.share === true)
        .map((elem, index) => {
          return (
            <CardComponent
              key={elem.date.id}
              value={elem}
              postsImageUrls={postsImageUrls}
              index={index}
            />
          );
        })}
    </div>
  );
}
