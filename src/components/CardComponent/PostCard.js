import { useCallback, useEffect, useState } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Link from "@mui/joy/Link";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
import SendOutlined from "@mui/icons-material/SendOutlined";
import Face from "@mui/icons-material/Face";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";

import { isLoggedIn } from "../../storage/session";

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
import CommentDialog from "../CommentDialog";
import { deleteObject, ref } from "@firebase/storage";
import { storage } from "../../firebase";
import CircularIndeterminate from "../CircularIndeterminate";
import { usePostCardStyles } from "./PostCard.styles";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { useLocation, useNavigate } from "react-router-dom";
import { OTHERUSER_PAGE, USER_PAGE } from "../../RoutePath/RoutePath";
import CardCover from "@mui/joy/CardCover";
import { v4 } from "uuid";
import EditPostDialog from "../EditPost/EditPostDialog";
import { MoreHoriz } from "@mui/icons-material";
import LoginDialog from "../LoginDialog/LoginDialog";

export default function PostCard({ post, imageLoadnig, user }) {
  //Auth
  const auth = getAuth(app);
  const userId = auth.lastNotifiedUid;
  const styles = usePostCardStyles();

  const location = useLocation();

  //for edit
  const [openEdit, setOpenEdit] = useState(false);

  //states
  const [openShare, setOpenShare] = useState(false);
  const [likeValue, setLikeValue] = useState(0);
  const [like, setLike] = useState(false);
  const [openFullText, setOpenFullText] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);

  const [plainStatus, setPlainStatus] = useState(false);

  const [comment, setComment] = useState("");
  const [lastComment, setLastComment] = useState("");
  const [openCommentPag, setOpenCommentPage] = useState(false);
  const navigate = useNavigate();

  const storageRef = ref(storage, `user_image/${user?.id}/${user?.image}`);
  const [url] = useDownloadURL(storageRef);

  useEffect(() => {
    onSnapshot(collection(db, "Likes"), (data) => {
      const da = data.docs
        .map((doc) => ({ ...doc.data() }))
        .filter((doc) => doc.postId === post.id);
      const as = da.find((elem) => elem.userId === auth.lastNotifiedUid);
      setLikeValue(da);
      setLike(!!as);
    });
  }, [auth.lastNotifiedUid, post.id]);

  useEffect(() => {
    onSnapshot(collection(db, "Comments"), (data) => {
      const newData = data.docs
        .map((doc) => ({ ...doc.data() }))
        .filter((doc) => doc.postId === post.id);
      if (newData[0]) {
        setLastComment(newData[0].comment);
      }
    });
  }, [post.id]);

  const onAddComment = useCallback(
    async (commentText) => {
      try {
        await addDoc(collection(db, "Comments"), {
          userId: auth.lastNotifiedUid,
          postId: post.id,
          comment: commentText,
          commentId: v4(),
        });
      } catch (err) {}
    },
    [auth.lastNotifiedUid, post.id]
  );

  const onDeleteComment = (comment) => {
    onSnapshot(collection(db, "Comments"), (data) => {
      const docName = data.docs.filter(
        (doc) => doc.data().commentId === comment.commentId
      );
      docName.forEach((elem) => {
        deleteDoc(doc(db, "Comments", elem.id));
      });
    });
    setLastComment("");
  };

  const onCloseLoginDialog = () => {
    setLoginStatus(false);
  };

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

  const handleClickOpenShare = () => {
    setOpenShare(true);
  };
  const handleClickCloseShare = () => {
    setOpenShare(false);
  };

  const hendleLike = () => {
    isLoggedIn() ? onLike(post.id) : setLoginStatus(true);
  };
  const hendleComment = () => {
    isLoggedIn() ? onAddComment(comment) : setLoginStatus(true);
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
          userId: auth.lastNotifiedUid,
        }).then((res) => res);
      } catch (err) {
        console.log(err, "like", id, userId);
      }
    },
    [auth.lastNotifiedUid, userId]
  );

  //delete posts function
  const onDeletePost = async (id, image_id) => {
    await deleteDoc(doc(db, "Posts", id));
    onSnapshot(collection(db, "Likes"), (data) => {
      const da = data.docs.filter((doc) => doc.data().postId === post.id);
      da.forEach((elem) => {
        deleteDoc(doc(db, "Likes", elem.id));
      });
    });
    onSnapshot(collection(db, "Comments"), (data) => {
      const da = data.docs.filter((doc) => doc.data().postId === post.id);
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
    <>
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
              sx={{
                p: 0.0,
                border: "2px solid",
                borderColor: "background.body",
              }}
            />
          </Box>
          <Typography fontWeight="lg">
            {location.pathname === "/" ? (
              <span onClick={onNavigatePage} className={styles.userName}>
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
                  >
                    Edit
                  </li>
                  <EditPostDialog
                    open={openEdit}
                    onCloseEditPage={onCloseEditPage}
                    post={post}
                    onUpdatePost={onUpdatePost}
                    postId={post.id}
                  />
                  <li
                    onClick={() =>
                      onDeletePost(post.id, post.imageId)
                    }
                    className={styles.list}
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
                  <video autoPlay loop muted poster={post.url}>
                    <source src={post.url} type="video/mp4" />
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
                key={v4()}
                openCommentPag={openCommentPag}
                handleCloseComment={handleCloseComment}
                selectedValue={post}
                onAddComment={onAddComment}
                onDeleteComment={onDeleteComment}
              />
            </IconButton>
            {location.pathname === "/user" && (
              <IconButton variant="plain" color="neutral" size="sm">
                <SendOutlined onClick={handleClickOpenShare} />
                <Share
                  postId={post.id}
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
                  bgcolor:
                    index === 0 ? "primary.solidBg" : "background.level3",
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
          <span style={{ fontSize: "12px", fontWeight: "bold" }}>
            {post.title}
          </span>{" "}
          {openFullText ? post.text : post.text?.slice(0, 15)}
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
          {post.date.toDate().toLocaleTimeString(undefined, {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            hour12: false,
            minute: "2-digit",
            second: "2-digit",
          })}
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
          onKeyDown={(event) => (event.key === "Enter" ? hendleComment() : "")}
        >
          {/* <button
            disabled={!isLoggedIn()}
            className={styles.commentButton}
            onClick={hendleComment}
          ></button> */}
          <IconButton
            disabled={!isLoggedIn()}
            size="sm"
            variant="plain"
            color="neutral"
            sx={{ ml: -1 }}
          >
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
          <button
            disabled={!isLoggedIn()}
            className={styles.commentButton}
            onClick={hendleComment}
          >
            Send
          </button>
        </CardOverflow>
        {!isLoggedIn() && (
          <LoginDialog
            loginStatus={loginStatus}
            onCloseLoginDialog={onCloseLoginDialog}
          />
        )}
      </Card>
    </>
  );
}
