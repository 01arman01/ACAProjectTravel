/* eslint-disable jsx-a11y/anchor-is-valid */
import { useCallback, useContext, useEffect, useState } from "react";
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
import {getSession, isLoggedIn} from "../../storage/session";
import {
  addDoc,
  collection,
  deleteDoc,
  deleteField,
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
import { usePostCardStyles } from "./PostCard.styles";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { OTHERUSER_PAGE, USER_PAGE } from "../../RoutePath/RoutePath";
import CardCover from "@mui/joy/CardCover";
import EditPostDialog from "../EditPost/EditPostDialog";
import { v4 } from "uuid";

export default function PostCard({ post, load, page, imageLoadnig, user }) {
  //Auth
  const auth = getAuth(app);
  const userId = auth.lastNotifiedUid;
  const styles = usePostCardStyles();
  //refresh
  const refresh = () => window.location.reload(true);

  const [loading, setLoading] = useState(load);
  const location = useLocation();

  //for edit
  const [openEdit, setOpenEdit] = useState(false);

  //states
  const [open, setOpen] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [selectedValue, setSelectedValue] = useState();
  const [postValue, setPostValue] = useState(post);
  const [likeValue, setLikeValue] = useState(0);
  const [like, setLike] = useState(false);
  const [openFullText, setOpenFullText] = useState(false);
  const [users, setUsers] = useState([]);

  const [plainStatus, setPlainStatus] = useState(false);

  const [comment, setComment] = useState("");
  const [lastComment, setLastComment] = useState("");
  const [openCommentPag, setOpenCommentPage] = useState(false);
  const navigate = useNavigate();

  const storageRef = ref(storage, `user_image/${user?.id}/${user?.image}`);
  const [url, loadProces] = useDownloadURL(storageRef);

  useEffect(() => {
    onSnapshot(collection(db, "User"), (data) => {
      const newData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setUsers(newData);
    });
  }, []);

  useEffect(() => {
    onSnapshot(doc(db, "Posts", postValue.id), (doc) => {
      const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
      if (!!postValue.url) {
        setPostValue({ ...postValue, ...doc.data() });
      }
    });
  }, [postValue]);

  useEffect(() => {
    onSnapshot(collection(db, "Likes"), (data) => {
      const da = data.docs
        .map((doc) => ({ ...doc.data() }))
        .filter((doc) => doc.postId === postValue.id);
      const as = da.find((elem) => elem.userId === auth.lastNotifiedUid);
      setLikeValue(da);
      setLike(!!as);
    });
  }, []);

  useEffect(() => {
    onSnapshot(collection(db, "Comments"), (data) => {
      const newData = data.docs
        .map((doc) => ({ ...doc.data() }))
        .filter((doc) => doc.postId === postValue.id);
      if (newData[0]) {
        setLastComment(newData[0].comment);
      }
    });
  }, [postValue.id]);

  const onAddComment = useCallback(async (commentText) => {
    try {
      await addDoc(collection(db, "Comments"), {
        userId: auth.lastNotifiedUid,
        postId: postValue.id,
        comment: commentText,
        commentId:v4()
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

  const onNavigatePage = () => {
    if (user.id === userId) {
      navigate(USER_PAGE, { state: user });
    } else {
      navigate(OTHERUSER_PAGE, { state: user });
    }
  };

  const onCloseEditPage = () => {
    setOpenEdit(false);
    setPlainStatus(false);
  };

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
      console.log(like, postValue.id);
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
  const onLike = useCallback(async (id) => {
    try {
      await addDoc(collection(db, "Likes"), {
        postId: id,
        userId: auth.lastNotifiedUid,
      }).then((res) => res);
    } catch (err) {
      console.log(err, "like", id, userId);
    }
  }, []);

  //delete posts function
  const onDeletePost = async (id, image_id) => {
    await deleteDoc(doc(db, "Posts", id));
    onSnapshot(collection(db, "Likes"), (data) => {
      const da = data.docs.filter((doc) => doc.data().postId === postValue.id);
      da.forEach((elem) => {
        deleteDoc(doc(db, "Likes", elem.id));
      });
    });
    onSnapshot(collection(db, "Comments"), (data) => {
      const da = data.docs.filter((doc) => doc.data().postId === postValue.id);
      da.forEach((elem) => {
        deleteDoc(doc(db, "Comments", elem.id));
      });
    });
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
    updateDoc(PostRef, data);
  };

  return (
    <Card
      variant="outlined"
      className={styles.card}
      sx={{
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
            src={url}
            sx={{ p: 0.0, border: "2px solid", borderColor: "background.body" }}
          />
        </Box>
        <Typography fontWeight="lg">
          {location.pathname === "/homepage" ? (
            <span onClick={() => onNavigatePage()} className={styles.userName}>
              {user.name}
            </span>
          ) : (
            <span>{user.name}</span>
          )}
        </Typography>
        {location.pathname === "/user" && (
          <IconButton
            variant="plain"
            color="neutral"
            size="sm"
            sx={{ ml: "auto" }}
          >
            {plainStatus && (
              <ul className={styles.lists}>
                <li
                  onClick={() => setOpenEdit(!openEdit)}
                  className={styles.list}
                  key="edit"
                >
                  Edit
                </li>
                <EditPostDialog
                  open={openEdit}
                  onCloseEditPage={onCloseEditPage}
                  post={postValue}
                  onUpdatePost={onUpdatePost}
                  postId={postValue.id}
                />
                <li
                  onClick={() => onDeletePost(postValue.id, postValue.imageId)}
                  className={styles.list}
                  key="delete"
                >
                  Delete
                </li>
              </ul>
            )}
            <MoreHoriz onClick={() => setPlainStatus(!plainStatus)} />
          </IconButton>
        )}
      </Box>
      <CardOverflow>
        <AspectRatio>
          {imageLoadnig ? (
            <CircularIndeterminate />
          ) : (
            <>
              <CardCover>
                <video autoPlay loop muted poster={postValue.url}>
                  <source src={postValue.url} type="video/mp4" />
                </video>
              </CardCover>
            </>
          )}
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
              // onAddComment={onAddComment}
            />
            {/* openCommentPag */}
          </IconButton>
          {location.pathname === "/user" && (
            <IconButton variant="plain" color="neutral" size="sm">
              <SendOutlined onClick={handleClickOpenShare} />
              <Share
                postId={postValue.id}
                onUpdatePost={onUpdatePost}
                shareOpen={openShare}
                onShareClose={handleClickCloseShare}
              />
            </IconButton>
          )}
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
        <span
          style={{ fontSize: "12px", fontWeight: "bold", marginRight: "2px" }}
        >
          {postValue.title}
        </span>
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
        {new Date(postValue.date.seconds).toString().slice(16, 21)}{" "}
      </Link>
      {lastComment ? (
        <span>{lastComment}</span>
      ) : (
        <div
          style={{
            fontSize: "12px",
            textAlign: "center",
            color: "#A5C4C5",
          }}
        >
          no comments
        </div>
      )}
      <CardOverflow
        sx={{
          p: "var(--Card-padding)",
          display: "flex",
          marginTop: lastComment ? "" : "4px",
        }}
      >
        <IconButton
            disabled={!isLoggedIn()}
            size="sm" variant="plain" color="neutral" sx={{ ml: -1 }}>
          <Face />
        </IconButton>
        <Input
         disabled={!isLoggedIn()}
          variant="plain"
          size="sm"
          placeholder="Add a comment…"
          sx={{ flexGrow: 1, mr: 1, "--Input-focusedThickness": "0px" }}
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <button  disabled={!isLoggedIn()}
        className={styles.commentButton}
         onClick={hendleComment}>
          Send
        </button>
      </CardOverflow>
    </Card>
  );
}
