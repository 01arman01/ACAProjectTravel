/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useContext, useEffect } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Link from "@mui/joy/Link";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
import SendOutlined from "@mui/icons-material/SendOutlined";
import Face from "@mui/icons-material/Face";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
// import Card from '@mui/material/Card';
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
// import Avatar from '@mui/material/Avatar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { createUseStyles } from "react-jss";
import SimpleDialog from "../SimpleDialog";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { app, db } from "../../firebase";
import Share from "../Share";
import { getAuth } from "firebase/auth";
import { Button } from "@mui/joy";
import CommentDialog from "../CommentDialog";
import { deleteObject, ref } from "@firebase/storage";
import { storage } from "../../firebase";
import CircularIndeterminate from "../CircularIndeterminate";

export default function PostCard({ post, load,page,imageLoadnig}) {
  const [expanded, setExpanded] = React.useState(false);
  const [imagUrl, setImageUrl] = React.useState(
    "https://media.sproutsocial.com/uploads/2017/01/Instagram-Post-Ideas.png"
  );
  // const styles = useStyles()
  const [loading, setLoading] = React.useState(load);

  //states
  const [open, setOpen] = React.useState(false);
  const [openShare, setOpenShare] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState();
  const [postValue, setPostValue] = React.useState(post);
  const [likeValue, setLikeValue] = React.useState(0);
  const [like, setLike] = React.useState(false);
  const [openFullText, setOpenFullText] = React.useState(false);

  const [comment, setComment] = React.useState("");
  const [lastComment, setLastComment] = React.useState([]);
  const [openCommentPag, setOpenCommentPage] = React.useState(false);
  //Auth
  const auth = getAuth(app);
  const userId = auth.lastNotifiedUid;

  useEffect(() => {
    onSnapshot(doc(db, "Posts", postValue.id), (doc) => {
      const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
      if (source === "Local") {
        setPostValue({ ...postValue, ...doc.data() });
      }
    });
  }, [postValue]);

  useEffect(() => {
    onSnapshot(collection(db, "Likes"), (data) => {
      const da = data.docs
        .map((doc) => ({ ...doc.data() }))
        .filter((doc) => doc.postId === postValue.id);
      const as = da.find((elem) => elem.userId === userId);
      setLikeValue(da);
      setLike(!!as);
    });
  }, []);

  useEffect(() => {
    onSnapshot(collection(db, "Comments"), (data) => {
      const newData = data.docs
        .map((doc) => ({ ...doc.data() }))
        .filter((doc) => doc.postId === postValue.id);
      setLastComment(newData[0].comment);
    });
  }, []);

  const onAddComment = useCallback(async (commentText) => {
    try {
      await addDoc(collection(db, "Comments"), {
        userId: userId,
        postId: postValue.id,
        comment: commentText,
      });
    } catch (err) {}
  }, []);

  setTimeout(() => {
    setLoading(load);
    if (postValue.url) {
      setLoading(load);
    } else {
      setLoading(false);
    }
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (postValue) => {
    setOpen(false);
    setSelectedValue(postValue);
  };
  const handleClickOpenShare = () => {
    setOpenShare(true);
  };
  const handleClickCloseShare = () => {
    setOpenShare(false);
  };

  const hendleLike = () => {
    if (!like) {
      onLike(postValue.id);
    }
  };
  const hendleComment = () => {
    onAddComment(comment);
    setComment("");
  };
  const handleClickOpenComment = () => {
    setOpenCommentPage(true);
  };
  const handleCloseComment = () => {
    setOpenCommentPage(false);
  };

  //posts like function
  const onLike = useCallback(
    async (id) => {
      try {
        await addDoc(collection(db, "Likes"), {
          postId: id,
          userId: userId,
        }).then((res) => res);
      } catch (err) {}
    },
    [userId]
  );

  //delete posts function
  const onDeletePost = async (id, image_id) => {
    await deleteDoc(doc(db, "Posts", id));
    const desertRef = ref(storage, `Images/${image_id}`);
    deleteObject(desertRef)
      .then(() => {
        console.log("delete");
      })
      .catch((error) => {
        console.log("err" + error);
      });
  };

  //Update post
  const onUpdatePost = async (id, data) => {
    const PostRef = doc(db, "Posts", id);
    await updateDoc(PostRef, data);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        maxWidth: 400,
        margin: "10px",
        // width: "70%",
        "--Card-radius": (theme) => theme.vars.radius.xs,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", pb: 1.5, gap: 1 }}>
        <Box
          sx={{
            position: "relative",
            "&:before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              m: "-2px",
              borderRadius: "50%",
              background:
                "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
            },
          }}
        >
          <Avatar
            size="sm"
            src="/static/logo.png"
            sx={{ p: 0.5, border: "2px solid", borderColor: "background.body" }}
          />
        </Box>
        <Typography fontWeight="lg">{postValue.title}</Typography>
        {page === "user" &&  <IconButton
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ ml: "auto" }}
        >
          <MoreHoriz onClick={handleClickOpen} />
          <SimpleDialog
            selectedValue={postValue}
            postId={postValue.id}
            onDeletePost={onDeletePost}
            onUpdatePost={onUpdatePost}
            open={open}
            onClose={handleClose}
          />
        </IconButton>}
        
      </Box>
      <CardOverflow>
        <AspectRatio>
        {imageLoadnig ?<CircularIndeterminate />: <img src={postValue.url} alt="" loading="lazy" />}
         
          {/* <img src={postValue.url} alt="" loading="lazy" /> */}
        </AspectRatio>
      </CardOverflow>
      <Box sx={{ display: "flex", alignItems: "center", mx: -1, my: 1 }}>
        <Box sx={{ width: 0, display: "flex", gap: 0.5 }}>
          <IconButton
            variant="plain"
            color="neutral"
            size="sm"
            sx={{
              color: like ? "red" : "danger",
            }}
          >
            <FavoriteBorder onClick={hendleLike} />
          </IconButton>
          <IconButton variant="plain" color="neutral" size="sm">
            <ModeCommentOutlined onClick={handleClickOpenComment} />
            <CommentDialog
              openCommentPag={openCommentPag}
              handleCloseComment={handleCloseComment}
              selectedValue={postValue}
            />
            {/* openCommentPag */}
          </IconButton>
          {page === "user" && <IconButton variant="plain" color="neutral" size="sm">
            <SendOutlined onClick={handleClickOpenShare} />
            <Share
              postId={postValue.id}
              onUpdatePost={onUpdatePost}
              shareOpen={openShare}
              onShareClose={handleClickCloseShare}
            />
          </IconButton> }
          
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 0.5, mx: "auto" }}
        >
          {[...Array(5)].map((_, index) => (
            <Box
              key={index}
              sx={{
                borderRadius: "50%",
                width: `max(${6 - index}px, 3px)`,
                height: `max(${6 - index}px, 3px)`,
                bgcolor: index === 0 ? "primary.solidBg" : "background.level3",
              }}
            />
          ))}
        </Box>
        <Box sx={{ width: 0, display: "flex", flexDirection: "row-reverse" }}>
          <IconButton variant="plain" color="neutral" size="sm">
            <BookmarkBorderRoundedIcon />
          </IconButton>
        </Box>
      </Box>
      <Link
        component="button"
        underline="none"
        fontSize="sm"
        fontWeight="lg"
        textColor="text.primary"
      >
        {likeValue.length} Likes
      </Link>
      <Typography fontSize="sm">
        <Link
          component="button"
          color="neutral"
          fontWeight="lg"
          textColor="text.primary"
        >
          {postValue.title}
        </Link>{" "}
        {openFullText ? postValue.text : postValue.text.slice(0, 15)} 
      </Typography>
      <Link
        component="button"
        underline="none"
        fontSize="sm"
        startDecorator="…"
        sx={{ color: "text.tertiary" }}
        onClick={() => {
          setOpenFullText(!openFullText);
        }}
      >
        more
      </Link>
      <Link
        component="button"
        underline="none"
        fontSize="10px"
        sx={{ color: "text.tertiary", my: 0.5 }}
      >
        {new Date(postValue.date.seconds).toString()}{" "}
      </Link>
      {lastComment}
      <CardOverflow sx={{ p: "var(--Card-padding)", display: "flex" }}>
        <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1 }}>
          <Face />
        </IconButton>
        <Input
          variant="plain"
          size="sm"
          placeholder="Add a comment…"
          sx={{ flexGrow: 1, mr: 1, "--Input-focusedThickness": "0px" }}
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <Button role="button" onClick={hendleComment}>
          Post
        </Button>
      </CardOverflow>
    </Card>
  );
}