import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Paper from "@mui/material/Paper";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "@firebase/firestore";
import { app, db, storage } from "../../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import dayjs from "dayjs";
import { Badge, Button, IconButton } from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { getAuth } from "firebase/auth";
import PeopleIcon from "@mui/icons-material/People";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import MessageDialog from "../Message/MessageDialog";
import { useEffect } from "react";
import { isLoggedIn } from "../../storage/session";
import { useNavigate } from "react-router-dom";
import { OTHERUSER_PAGE } from "../../RoutePath/RoutePath";
import  {useStyles} from './PeopleComponent.style'


const auth = getAuth(app);
// const drawerWidth = 240;

export default function PeopleComponent() {
  const userId = auth.lastNotifiedUid;
  const [users, setUsers] = React.useState([]);
  const [timeDate] = React.useState(dayjs(new Date()).toDate().valueOf());
  const [friends, setFriends] = React.useState([]);
  const [page, setPage] = React.useState("People");
  const styles = useStyles()

  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
  }, [navigate]);

  const getUser = React.useCallback(() => {
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
  }, [timeDate]);

  React.useEffect(() => {
    getUser();
  }, [getUser]);

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

  const peoplePage = () => {
    setPage("People");
    getUser();
  };
  const filterFrinds = () => {
    setUsers([
      ...users.filter(
        (elem) =>
          !!friends.find(
            (ele) =>
              ele.request === true &&
              (ele.userId === elem.id || ele.friendId === elem.id)
          )
      ),
    ]);
    setPage("Friends");
  };
  const onSearch = (value) => {
    if (value === "") {
      getUser();
    }
    const filterCheckItem = users.filter(
      (elem) => elem.name.slice(0, value.length) === value
    );
    setUsers(
      filterCheckItem.map((elem, index) => {
        return {
          ...elem,
        };
      })
    );
  };

  return (
    isLoggedIn() && (
      <Box sx={{ display: "flex" }}
           // className={styles.toolbar}
      >


        <Drawer
          variant="permanent"
            className={styles.toolbar}
        >
          <Toolbar
          />
          <Box>
            <List>
              <ListItem key={"people"} disablePadding>
                <ListItemButton onClick={peoplePage}>
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary={"People"} className={styles.media800} />
                </ListItemButton>
              </ListItem>
              <ListItem key={"friends"} disablePadding>
                <ListItemButton onClick={filterFrinds}>
                  <ListItemIcon>
                    <Diversity3Icon />
                  </ListItemIcon>
                  <ListItemText primary={"Friends"} className={styles.media800} />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
            <List>
              {["All mail", "Trash", "Spam"].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text}  className={styles.media800}/>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <React.Fragment
          >
            <CssBaseline />
            <Paper square sx={{ pb: "50px" }}>
              <Typography
                variant="h5"
                gutterBottom
                component="div"
                sx={{ p: 2, pb: 0 }}
              >
                {page}
              </Typography>
              <List sx={{ mb: 2 }}>
                <Paper
                  component="form"
                  sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: "auto",
                  }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search People"
                    inputProps={{ "aria-label": "search google maps" }}
                    onChange={(e) => onSearch(e.target.value)}
                  />
                  <IconButton
                    type="button"
                    sx={{ p: "10px" }}
                    aria-label="search"
                  >
                    <SearchIcon />
                  </IconButton>
                </Paper>
                {users
                  .filter((user) => user.id !== userId)
                  .map((user) => {
                    return (
                      <React.Fragment key={user.id}>
                        <ListItem
                           className={styles.usersList}
                          sx={{
                            boxShadow:
                              "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);",
                            borderRadius: 1,
                          }}
                        >
                          <div className={styles.AvaName}>
                          <ListItemAvatar>
                            <Badge
                              color="secondary"
                              variant="dot"
                              invisible={user.online}
                            >
                              <Avatar alt="Profile Picture" src={user.url} />
                            </Badge>
                          </ListItemAvatar>

                          <ListItemText
                            primary={user.name}
                            secondary={user.gender + " " + user.age}
                            onClick={() =>
                              navigate(OTHERUSER_PAGE, { state: user })
                            }
                            sx={{ cursor: "pointer" }}
                          />
                          </div>
                          <div className={styles.frendMessage}>
                          {friends.find(
                            (elem) =>
                              elem.friendId === user.id &&
                              elem.request === false
                          ) ? (
                            <Button
                              variant="contained"
                              startIcon={<PersonAddAlt1Icon />}
                              onClick={() => sendFriendRequest(user.id)}
                            >
                              sended
                            </Button>
                          ) : (
                            ""
                          )}
                          {friends.find(
                            (elem) =>
                              elem.userId === user.id && elem.request === false
                          ) ? (
                            <Button
                              variant="contained"
                              startIcon={<PersonAddAlt1Icon />}
                              onClick={() =>
                                acceptFriendRequest(
                                  friends.find(
                                    (elem) =>
                                      elem.userId === user.id &&
                                      elem.request === false
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
                              (elem.friendId === user.id ||
                                elem.userId === user.id) &&
                              elem.request === true
                          ) ? (
                            <Button
                              variant="contained"
                              disabled
                              startIcon={<PersonAddAlt1Icon />}
                              onClick={() => sendFriendRequest(user.id)}
                            >
                              friend
                            </Button>
                          ) : (
                            ""
                          )}
                          {friends.find(
                            (elem) =>
                              elem.friendId === user.id ||
                              elem.userId === user.id
                          ) ? (
                            ""
                          ) : (
                            <Button
                              variant="contained"
                              startIcon={<PersonAddAlt1Icon />}
                              onClick={() => sendFriendRequest(user.id)}
                            >
                              add Friend
                            </Button>
                          )}
                          <MessageDialog
                            id={user.id}
                            url={user.url}
                            name={user.name}
                            users={users}
                          />
                          </div>
                        </ListItem>
                      </React.Fragment>
                    );
                  })}
              </List>
            </Paper>
          </React.Fragment>
        </Box>
      </Box>
    )
  );
}
