//React
import { useCallback, useEffect, useState } from "react";
//Mui
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
//Dialog
import SimpleDialog from "../SimpleDialog";
import Share from "../Share";
//Firebase
import {
  collection,
  deleteDoc,
  addDoc,
  doc,
  onSnapshot,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { app, db, storage } from "../../firebase";
import { getAuth } from "firebase/auth";
//Styles
import { createUseStyles } from "react-jss";
import { styled } from "@mui/system";
import { deleteObject, ref } from "@firebase/storage";
// import { ref } from "@firebase/database";

const useStyles = createUseStyles({
  cardFrame: {
    maxWidth: "290px",
    height: "375px",
    margin: "20px",
  },
  card: {
    minWidth: "300px",
    height: "375px",
  },
});

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({ post, postsImageUrls }) {
  //states
  const [postImgUrl, setPostImgUrl] = useState("");
  const [postValue, setPostValue] = useState(post);
  const [open, setOpen] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [selectedValue, setSelectedValue] = useState();
  const [likeValue, setLikeValue] = useState(0);
  const [like, setLike] = useState(false);
  //styles
  const styles = useStyles();

  //auth
  const auth = getAuth(app);
  const userId = auth.lastNotifiedUid;

  //get Post image URL
  const getPostUrl = () => {
    postsImageUrls.forEach((el) => {
      if (el[1] == post.image) {
        setPostImgUrl(el[0]);
      }
    });
  };

  useEffect(() => {
    getPostUrl();
  }, [postsImageUrls, getPostUrl]);

  //posts like function
  const onLike = useCallback(
    async (id) => {
      try {
        await addDoc(collection(db, "Like"), {
          postId: id,
          userId: userId,
        }).then((res) => res);
      } catch (err) {}
    },
    [userId]
  );

  //
  useEffect(() => {
    onSnapshot(doc(db, "Post", postValue.id), (doc) => {
      const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
      if (source === "Local") {
        setPostValue({ ...postValue, ...doc.data() });
      }
    });
  }, []);

  //Like effect
  useEffect(() => {
    onSnapshot(collection(db, "Like"), (data) => {
      const newData = data.docs.filter(
        (doc) => doc.data().postId === postValue.id
      );
      const da = data.docs
        .map((doc) => ({ ...doc.data() }))
        .filter((doc) => doc.postId === postValue.id);
      const as = da.find((elem) => elem.userId === userId);
      setLikeValue(da);
      setLike(!!as);
    });
  }, [userId, postValue.id]);

  //handle functions
  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (postValue) => {
    setOpen(false);
    setSelectedValue(postValue);
  };
  const onShareOpen = () => {
    setOpenShare(true);
  };
  const onShareClose = () => {
    setOpenShare(false);
  };

  const hendleLike = () => {
    if (!like) {
      onLike(postValue.id);
    }
  };

  //delete posts function
  const onDeletePost = async (id, imgName) => {
    await deleteDoc(doc(db, "Post", id));
    const desertRef = ref(storage, `Images/${imgName}`);
    deleteObject(desertRef)
      .then(() => {
        console.log("delete");
      })
      .catch((error) => {
        console.log("delete" + error);
      });
  };

  //Update post
  const onUpdatePost = async (id, data) => {
    console.log(postValue.id);
    const PostRef = doc(db, "Post", id);
    await updateDoc(PostRef, data);
  };

  return (
    <div className={styles.cardFrame}>
      <Card className={styles.card}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <>
              <IconButton aria-label="settings" onClick={handleClickOpen}>
                <MoreVertIcon />
              </IconButton>
              <SimpleDialog
                selectedValue={postValue}
                postId={postValue.id}
                onDeletePost={onDeletePost}
                onUpdatePost={onUpdatePost}
                open={open}
                onClose={handleClose}
                postImgUrl={postImgUrl}
              />
            </>
          }
          title={post.title}
          subheader={new Date(post.date.seconds).toString().slice(16, 21)}
        />
        <CardMedia
          component="img"
          height="194"
          src={postImgUrl}
          alt="Paella dish"
          className={styles.img}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {post.text}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="Like minimal photography"
            size="md"
            variant="solid"
            sx={{
              color: like ? "red" : "danger",
            }}
            onClick={hendleLike}
          >
            <FavoriteIcon /> {likeValue.length}
          </IconButton>
          <IconButton aria-label="share" onClick={onShareOpen}>
            <ShareIcon />
          </IconButton>
          <Share
            postId={postValue.id}
            onUpdatePost={onUpdatePost}
            shareOpen={openShare}
            onShareClose={onShareClose}
          />
        </CardActions>
      </Card>
    </div>
  );
}
