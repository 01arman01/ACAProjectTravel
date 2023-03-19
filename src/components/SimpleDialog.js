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
import { Checkbox, DialogActions, DialogContent, DialogContentText, TextField } from '@mui/material';
import { Container } from '@mui/system';
import { getStorage, updateMetadata } from 'firebase/storage';
import { ref } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { app } from '../firebase';
// import { storage } from '../firebase';


export default function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;
  const [openUpdatePage,setOpenUpdatePage] = React.useState(false)
  const [title,setTitle] =  React.useState(props.selectedValue.title)
  const [text,setText] =  React.useState(props.selectedValue.text)
  const [share,setShare] = React.useState(props.selectedValue.share)
  const [imageUrl,setImageUrl] = React.useState(props.selectedValue.url)


  let loginResponse = getAuth(app);
  const storage = getStorage();


  const handleClose = () => {
    onClose(selectedValue);
  };
  const hendleCloseUpdatePage = ()=>{
    setOpenUpdatePage(false)
    handleClose()
  }
  const hendleDelete = () => {
    props.delete(props.id,props.selectedValue.image_id);
    handleClose()
  };
  const openUpdate =()=> {
    setOpenUpdatePage(true)
    handleClose()
  }
  const updatePost =() => {
    props.updatePost(props.id,{
      title,
      text,
      share,
    })
    updateImage()
    hendleCloseUpdatePage()
    
  }

const updateImage=async()=>{
  console.log( `Post_image/${props.selectedValue.image_id}`,"ddddddddd")
  const imageRef =await ref(storage, `Post_image/${props.selectedValue.image_id}`);
  // Update metadata properties
  console.log(imageRef,"PPPPPPPPPPPPPPP")
  updateMetadata(imageRef, imageUrl )
    .then((metadata) => {
      hendleCloseUpdatePage()
      console.log(metadata)
      // Updated metadata for 'images/forest.jpg' is returned in the Promise
    }).catch((error) => {
      // Uh-oh, an error occurred!
    });

}







  return (
    <>
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>edit post</DialogTitle>
      <DialogActions>
          <Button onClick={openUpdate}>Update</Button>
          <Button onClick={hendleDelete}>delete</Button>
          <Button onClick={handleClose} autoFocus>
            close
          </Button>
        </DialogActions>
    </Dialog>
    <div>
    <Dialog
      open={openUpdatePage}
      onClose={hendleCloseUpdatePage}
      // PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        Subscribe
      </DialogTitle>
      <DialogContent>
      
          <img src={imageUrl} style={{width:"100%"}} aria-hidden alt="Picture of me taking a photo of an image" />
      </DialogContent>
      <DialogActions>
      <Container maxWidth="xs" sx={{ mt: 2 }}>
      <TextField
        label="Title"
        variant="outlined"
        type="text"
        autoComplete="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mt: 1 }}
        fullWidth
      />
      <TextField
        label="Text"
        variant="outlined"
        type="text"
        autoComplete="Text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{ mt: 3 }}
        fullWidth
      />
      <Button variant="contained" component="label">
        Upload Image
        <input
          hidden
          accept="image/*"
          onChange={(e) => {setImageUrl(e.target.files[0])}}
          // onClick={uploadImage}
          multiple
          type="file"
        />
      </Button>
     
      <Checkbox
        label="Text"
        checked={share}
        onChange={() => setShare(!share)}
        inputProps={{ "aria-label": "controlled" }}
      />
       <Button
        variant="contained"
        onClick={updatePost}
        type="submit"
        sx={{ mt: 3 }}
        // fullWidth
      >
        add Post
      </Button>
      <Button
        autoFocus onClick={hendleCloseUpdatePage}
        sx={{ mt: 3 }}
        // fullWidth
      >
        Cancel
      </Button>
    </Container>
  </DialogActions>
    </Dialog>
  </div>
  </>
  );
}
