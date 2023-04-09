import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Avatar,
  Badge,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { app, db } from "../../firebase";
import dayjs from "dayjs";
import { getAuth } from "firebase/auth";
import SendIcon from "@mui/icons-material/Send";
import { v4 } from "uuid";
import {useRef} from "react";
const auth = getAuth(app);

export default function MessageDialog({ id, url, name, users }) {
  const userId = auth.lastNotifiedUid;
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [message, setMessage] = React.useState("");
  const [messageList, setMessageList] = React.useState([]);

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
    messageList
      .filter((elem) => elem.sender === id)
      .filter((el) => el.open === false)
      .forEach((elem) => {
        if (elem.sender === id && elem.open === false) {
          updateDoc(doc(db, "Message", elem.id), { open: true });
        }
      });
  };

  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    const citiesRef = collection(db, "Message");
    const q = query(citiesRef, orderBy("time","asc"));
    onSnapshot(q, (data) => {
      const newData = data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter(
          (elem) =>
            (elem.receiver === userId && elem.sender === id) ||
            (elem.receiver === id && elem.sender === userId)
        );
      setMessageList(newData);
    });
  }, [id, userId]);


  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const onSendMessage = async () => {
    addDoc(collection(db, "Message"), {
      sender: userId,
      receiver: id,
      message,
      open: false,
      time: dayjs(new Date()).toDate(),
    });
    setMessage('')
  };

  return (
    <div>
      <Badge
        color="secondary"
        badgeContent={
          messageList
            .filter((elem) => elem.sender === id)
            .filter((el) => el.open === false).length
        }
        showZero
        sx={{cursor:"pointer"}}
      >
        <MailIcon onClick={handleClickOpen("paper")} />
      </Badge>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        style={{ justifyContent: " flex-end" }}
      >
        <DialogTitle id="scroll-dialog-title">{name}</DialogTitle>
        <DialogContent
          dividers={scroll === "paper"}
          style={{ justifyContent: " flex-end" }}
        >
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <List
                sx={{ mb: 2 }} key={v4()}>
              {messageList.map((elem) => {
                if (elem.receiver === id) {
                  const user = users.filter((elem) => elem.id === userId)[0];
                  return (
                    <React.Fragment>
                      <ListItem  sx={{ padding: 0 }} key={elem.id}>
                        <ListItemText
                          sx={{boxShadow:" 0 1px 3px gray", borderRadius:3,padding:1, margin:1, display: "inline-block"}}
                          primary={user?.name}
                          secondary={elem.message}
                        />
                        <ListItemAvatar>
                          <Badge
                            color="secondary"
                            variant="dot"
                            invisible={true}
                          >
                            <Avatar alt="Profile Picture" src={user?.url}  sx={{ width: 37, height: 37, marginBottom: "40px"}}/>
                          </Badge>
                        </ListItemAvatar>
                      </ListItem>
                    </React.Fragment>
                  );
                } else {
                  return (
                    <React.Fragment>
                      <ListItem sx={{ padding: 0 }} key={elem.id}>
                        <ListItemAvatar>
                          <Badge
                            color="secondary"
                            variant="dot"
                            invisible={true}
                          >
                            <Avatar alt="Profile Picture" src={url} sx={{ width: 37, height: 37, marginBottom: "55px"}} />
                          </Badge>
                        </ListItemAvatar>
                        <ListItemText 
                          sx={{boxShadow:" 0 1px 3px gray", borderRadius:3,padding:1, margin:1, display: "inline-block"}}

                        primary={name} secondary={elem.message} />
                      </ListItem>
                    </React.Fragment>
                  );
                }
              })}
            </List>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(event)=>{
              if (event.key === 'Enter'){
                onSendMessage()
              }
            }
            }
          />

          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSendMessage}>
            <SendIcon />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
