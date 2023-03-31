import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Dialog, IconButton, ImageListItemBar } from '@mui/material';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import StarBorderIcon from '@mui/icons-material/StarBorder'
import { useEffect, useState } from 'react';

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function ImageListComponent({open,handleClose,user}) {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const storageRef = ref(storage, `user_image/${user?.id}`);
    listAll(storageRef).then((elem) => {
      const promises = elem.items.map((item) => {
        const storageRef = ref(storage, item._location.path_);
        return getDownloadURL(storageRef).then((url) => {
          return { name: item.name, url: url };
        });
      });
      Promise.all(promises)
        .then((downloadUrls) => setUrls(downloadUrls))
        .catch((error) => console.log(error));
    });
  }, [user]);

  const changeImage = (name) =>{
    updateDoc(doc(db, "User", user?.id), {image:name});
  }


  return (
    <Dialog onClose={handleClose} open={open}>
     <ImageList
      sx={{
        width: 500,
        height: 450,
        transform: 'translateZ(0)',
      }}
      rowHeight={200}
      gap={1}
    >
      {urls.map((item) => {
        const cols = item.featured ? 2 : 1;
        const rows = item.featured ? 2 : 1;
        console.log(item.img)
        return (
          <ImageListItem key={item.img} cols={cols} rows={rows}>
            <img
              {...srcset(item.url, 250, 200, rows, cols)}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              sx={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                  'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
              }}
              title={item.title}
              position="top"
              actionIcon={
                <IconButton
                onClick={()=>{changeImage(item.name)}}
                  
                  sx={user.image===item.name?{ color: 'black' }:{ color: 'white' }}
                  aria-label={`star ${item.title}`}
                >
                  <StarBorderIcon />
                </IconButton>
              }
              actionPosition="left"
            />
          </ImageListItem>
        );
      })}
    </ImageList>
    </Dialog>
  );
}

