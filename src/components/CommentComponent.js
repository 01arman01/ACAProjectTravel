import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { getAuth } from 'firebase/auth';
import { app, db } from '../firebase';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';

export default function CopmentComponent({selectedValue}) {
    const [comments,setComments] =React.useState([])
    const [users,setUsers] = React.useState([])
    
    React.useEffect(()=>{
        onSnapshot(collection(db, "Comment"), (data) => {
            const data_1 =data.docs.map((doc)=>({...doc.data()})).filter((doc)=>doc.postId === selectedValue.id)
            console.log(data_1,"ssssssssssssssss")
            
            setComments(data_1)
            // setOneComment(data_1[0].comment)
        
          });
      },[])

      React.useEffect(()=>{
        onSnapshot(collection(db, "User"), (data) => {
            const data_1 =data.docs.map((doc)=>({...doc.data(),id:doc.id}))
            console.log(data_1,"ssssssssssssssss")
            setUsers(data_1)
            // setOneComment(data_1[0].comment)
        
          });
      },[])

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {comments.map((element)=>{
        // console.log(users,"users")
        const user = users.find((ele)=>ele.id===element.userId)
        // console.log(user,"Us")
        return <><ListItem alignItems="flex-start">
             <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
            <ListItemText
              primary={user.name}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Ali Connors
                  </Typography>
                  {"---"+element.comment}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          </> 
      })}  

 
    </List>
  );
}