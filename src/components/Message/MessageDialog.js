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
const auth = getAuth(app);

export default function MessageDialog({ id, url, name, users }) {
  const userId = auth.lastNotifiedUid;
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [message, setMessage] = React.useState("");
  const [messageList, setMessageList] = React.useState([]);
  const [timeDate, setTimeDate] = React.useState(dayjs(new Date()));

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
    setMessageList([
      ...messageList.sort((p1, p2) => {
        if (p1["time"].toDate().valueOf() > p2["time"].toDate().valueOf()) {
          console.log(p1);
          return -1;
        }
        if (p1["time"].toDate().valueOf() < p2["time"].toDate().valueOf()) {
          return 1;
        }
        return 0;
      }),
    ]);

    // setMessageList(messageList.map(elem=>{
    //   if(elem.sender === id && elem.open===false){
    //     return{
    //       ...elem,
    //       open : true
    //     }
    //   }
    //   return elem
    // }))
  };

  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    const citiesRef = collection(db, "Message");
    const q = query(citiesRef, orderBy("message"));

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
  //Upload and send image to storage
  // const onUploadImage = () => {
  //   if (ImageUpload == null) return;
  //   const imageRef = ref(storage, `Images/${imageId}`);
  //   uploadBytes(imageRef, ImageUpload).then((res) => {
  //     onSendPost();
  //     setImageId(v4);
  //   });
  // };

  // },[])
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  //   React.useEffect(() => {
  //     await setDoc(collection(db, "Message")
  //    }, [open]);

  React.useEffect(() => {
    onSnapshot(collection(db, "Message"), (data) => {
    data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((elem) => elem.userId === userId);
    });
  }, [userId]);

  const onSendMessage = async () => {
    addDoc(collection(db, "Message"), {
      sender: userId,
      receiver: id,
      message,
      open: false,
      time: timeDate.toDate(),
    });
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
      >
        <MailIcon onClick={handleClickOpen("paper")} />
      </Badge>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        // aria-labelledby="scroll-dialog-title"
        // aria-describedby="scroll-dialog-description"
        style={{ justifyContent: " flex-end" }}
      >
        <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
        <DialogContent
          dividers={scroll === "paper"}
          style={{ justifyContent: " flex-end" }}
        >
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <List sx={{ mb: 2 }}>
              {messageList.map((elem) => {
                if (elem.receiver === id) {
                  const user = users.filter((elem) => elem.id === userId)[0];
                  console.log();
                  return (
                    <React.Fragment>
                      <ListItem  sx={{ padding: 0 }}>
                        <ListItemText
                          sx={{boxShadow:" 0 1px 3px gray", borderRadius:3,padding:1, margin:1, display: "inline-block"}}
                          primary={user.name}
                          secondary={elem.message}
                        />
                        <ListItemAvatar>
                          <Badge
                            color="secondary"
                            variant="dot"
                            invisible={true}
                          >
                            <Avatar alt="Profile Picture" src={user.url}  sx={{ width: 37, height: 37, marginBottom: "40px"}}/>
                          </Badge>
                        </ListItemAvatar>
                      </ListItem>
                    </React.Fragment>
                  );
                } else {
                  return (
                    <React.Fragment>
                      <ListItem sx={{ padding: 0 }}>
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
            onChange={(e) => setMessage(e.target.value)}
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
