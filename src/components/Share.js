import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { Checkbox, DialogActions, DialogContent, DialogContentText, fabClasses, TextField } from '@mui/material';
import { Container } from '@mui/system';
import { getStorage, updateMetadata } from 'firebase/storage';
import { ref } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { app } from '../firebase';
// import { storage } from '../firebase';


export default function Share(props) {

 const [open,setOpen] = React.useState(props.open)

  let loginResponse = getAuth(app);
  const storage = getStorage();


  const handleClose = () => {
    props.onClose(props.open);
  };

  const updatePost =() => {
    props.updatePost(props.id,{
      share:true,
    })
    handleClose()
    
  }

  return (
    <>
    <Dialog onClose={handleClose} open={props.open}>
      <DialogTitle>edit post</DialogTitle>
      <DialogActions>
          <Button onClick={updatePost}>Share</Button>
          <Button onClick={handleClose} autoFocus>close</Button>
        </DialogActions>
    </Dialog>
  </>
  );
}
