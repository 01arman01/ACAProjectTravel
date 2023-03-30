import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { Navigate } from "react-router-dom";
import OtherUserNavbar from "../components/Navbar/OtherUserNavbar/OtherUserNavbar";
import { useOtherUserStyles } from "./OtherUser.styles";
import PostCard from "../components/CardComponent/PostCard";
import { collection, onSnapshot } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "../firebase";

export default function OtherUser({ route }) {
  const location = useLocation();
  const user = location.state;
  const styles = useOtherUserStyles();

  //states
  const [posts, setPosts] = useState([]);
  //Set posts data
  useEffect(() => {
    onSnapshot(collection(db, "Posts"), (data) => {
      const newData = data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((elem) => elem.userId === user.id);
      newData.forEach((elm, index) => {
        const starsRef = ref(storage, `Images/${elm.imageId}`);
        getDownloadURL(starsRef).then((url) => {
          elm["url"] = url;
        });
        //   .then((elem) => {
        //     if (index + 1 === newData.length) {
        //       setloading(true);
        //     }
        //   })
        //   .then(() => {
        //     setImageLoadnig(false);
        //   });
      });
      setPosts(newData);
    });
  }, [user.id]);
  return (
    <div className={styles.wrapper}>
      <OtherUserNavbar user={user} />
      <div className={styles.postsBlock}>
        {posts.length !== 0 &&
          posts.map((post) => {
            return (
              <PostCard
                key={post.id}
                post={post}
                user={user}
              />
            );
          })}
      </div>
    </div>
  );
}
