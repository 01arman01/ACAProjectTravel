import {Avatar, Button} from "@mui/material";
import {getDownloadURL, ref} from "firebase/storage";
import { useDownloadURL } from "react-firebase-hooks/storage";
import {app, db, storage} from "../../../firebase";
import { useOtherUserNavbarStyles } from "./OtherUserNavbar.styles";
import dayjs from "dayjs";
import {collection, onSnapshot} from "firebase/firestore";
import {addDoc, doc, updateDoc} from "@firebase/firestore";
import{useState,useCallback,useEffect} from 'react'
import { getAuth } from "firebase/auth";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
const auth = getAuth(app);
export default function OtherUserNavbar({ user }) {
    // add friends

    const [users, setUsers] = useState([]);
    const [friends, setFriends] = useState([]);
    const [page, setPage] = useState("People");
    const [timeDate] = useState(dayjs(new Date()).toDate().valueOf());
    const userId = auth.lastNotifiedUid;

    const getUser = useCallback(() => {
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

    useEffect(() => {
        getUser();
    }, [getUser]);

    useEffect(() => {
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

    const styles = useOtherUserNavbarStyles();
  const avatarImageUrlRef = ref(
    storage,
    `user_image/${user?.id}/${user?.image}`
  );
  const [url, loading] = useDownloadURL(avatarImageUrlRef);
  return (
    <div className={styles.wrapper}>
      <div className={styles.avatarBlock}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Avatar
            className={styles.avatarContainer}
            alt="Remy Sharp"
            src={url}
            sx={{ width: 150, height: 150 }}
          />
        )}

      </div>
      <h1 className={styles.avatarName}>{user.name}</h1>
        <div>
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
                            ).user.id
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
        </div>
    </div>
  );
}
