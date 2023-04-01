import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "@firebase/firestore";
import { app, db, storage } from "../../firebase";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { useDownloadURL } from "react-firebase-hooks/storage";
import dayjs from "dayjs";
import { Badge, Button } from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import MailIcon from "@mui/icons-material/Mail";
import MessageDialog from "../Message/MessageDialog";
import { getAuth } from "firebase/auth";
import { Unstable_Grid } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { OTHERUSER_PAGE } from "../../RoutePath/RoutePath";

const auth = getAuth(app);

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});

export default function PeopleComponent() {
  const userId = auth.lastNotifiedUid;
  const [users, setUsers] = React.useState([]);
  const [timeDate, setTimeDate] = React.useState(
    dayjs(new Date()).toDate().valueOf()
  );
  const [messageList, setMessageList] = React.useState([]);
  const [user, setUser] = React.useState([]);
  const [friends, setFriends] = React.useState([]);

  const navigate = useNavigate()
  // const [online,setOnline] = React.useState(true)
  // .format('MM/DD/YYYY hh:mm')

  React.useEffect(() => {
    onSnapshot(collection(db, "User"), (data) => {
      const newData = data.docs.map((doc) => {
        const storageRef = ref(
          storage,
          `user_image/${doc?.id}/${doc.data()?.image}`
        );
        return getDownloadURL(storageRef)
          .then((url) => {
            return {
              ...doc.data(),
              id: doc.id,
              url: url,
              online: !(timeDate / 1000 - doc.data().time?.seconds < 600),
            };
          })
          .catch((err) => {
            return {
              ...doc.data(),
              id: doc.id,
              url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlHBoELHG9IPFDyVp_5_lRfL-9zTYR-YG1nEC8N9c&s",
              online: !(timeDate / 1000 - doc.data().time?.seconds < 600),
            };
          });
      });
      Promise.all(newData)
        .then((downloadUrls) => {
          setUsers(downloadUrls);
        })
        .catch((error) => console.log(error, "asdfasdf"));
    });
  }, []);

  React.useEffect(() => {
    onSnapshot(collection(db, "Friends"), (data) => {
      const fri = data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((elem) => elem.userId === userId || elem.friendId === userId);
      setFriends(fri);
    });
  }, [userId]);

  const sendFriendRequest = async (id) => {
    await addDoc(collection(db, "Friends"), {
      userId: userId,
      friendId: id,
      request: false,
    }).then((res) => {});
  };

  const acceptFriendRequest = (id) => {
    console.log(id);
    updateDoc(doc(db, "Friends", id), {
      request: true,
    })
      .then((res) => {
        console.log(res, "dddd");
      })
      .catch((err) => {
        console.log(err, "eeee");
      });
  };

  const onNavigatePage = () =>{

  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Paper square sx={{ pb: "50px" }}>
        <Typography
          variant="h5"
          gutterBottom
          component="div"
          sx={{ p: 2, pb: 0 }}
        >
          Inbox
        </Typography>
        <List sx={{ mb: 2 }}>
          {users.map(({ id, name, gender, age, url, online }) => {
            console.log(friends, "friend");
            if (id !== userId) {
              return (
                <React.Fragment key={id}>
                  <ListItem button onClick={() => navigate(OTHERUSER_PAGE, { state: user })}>
                    <ListItemAvatar>
                      <Badge color="secondary" variant="dot" invisible={online}>
                        <Avatar alt="Profile Picture" src={url} />
                      </Badge>
                    </ListItemAvatar>

                    <ListItemText
                      primary={name}
                      secondary={gender + " " + age}
                    />
                    {friends.find(
                      (elem) => elem.friendId === id && elem.request === false
                    ) ? (
                      <Button
                        variant="contained"
                        startIcon={<PersonAddAlt1Icon />}
                        onClick={() => sendFriendRequest(id)}
                      >
                        send
                      </Button>
                    ) : (
                      ""
                    )}
                    {friends.find(
                      (elem) => elem.userId === id && elem.request === false
                    ) ? (
                      <Button
                        variant="contained"
                        startIcon={<PersonAddAlt1Icon />}
                        onClick={() =>
                          acceptFriendRequest(
                            friends.find(
                              (elem) =>
                                elem.userId === id && elem.request === false
                            ).id
                          )
                        }
                      >
                        accept
                      </Button>
                    ) : (
                      ""
                    )}

                    {friends.find(
                      (elem) =>
                        (elem.friendId === id || elem.userId === id) &&
                        elem.request === true
                    ) ? (
                      <Button
                        variant="contained"
                        disabled
                        startIcon={<PersonAddAlt1Icon />}
                        onClick={() => sendFriendRequest(id)}
                      >
                        friend
                      </Button>
                    ) : (
                      ""
                    )}
                    {friends.find(
                      (elem) => elem.friendId === id || elem.userId === id
                    ) ? (
                      ""
                    ) : (
                      <Button
                        variant="contained"
                        startIcon={<PersonAddAlt1Icon />}
                        onClick={() => sendFriendRequest(id)}
                      >
                        add Friend
                      </Button>
                    )}

                    {/* <Badge color="secondary" badgeContent={1} showZero>

                        <MailIcon />
                      </Badge> */}
                    <MessageDialog
                      id={id}
                      url={url}
                      name={name}
                      users={users}
                    />
                  </ListItem>
                </React.Fragment>
              );
            }
          })}
        </List>
      </Paper>
    </React.Fragment>
  );
}
