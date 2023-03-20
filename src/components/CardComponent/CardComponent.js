import React, { useContext, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { createUseStyles } from 'react-jss';
import SimpleDialog from '../SimpleDialog';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { app, db } from '../../firebase';
import Share from '../Share';
import { getAuth } from 'firebase/auth';
import { CardOverflow, Link } from '@mui/joy';
import { Face } from '@mui/icons-material';
import { Input } from '@mui/material';

const useStyles = createUseStyles({
    cardFrame:{
        margin:"100px"

    }
})


export default function RecipeReviewCard({value,load,del,updatePost,like}) {
    const [expanded, setExpanded] = React.useState(false);
    const [imagUrl, setImageUrl] = React.useState("https://media.sproutsocial.com/uploads/2017/01/Instagram-Post-Ideas.png");
    const styles = useStyles()
    const [loading,setLoading] = React.useState(load)
    const [open, setOpen] = React.useState(false);
    const [openShare,setOpenShare] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState();
    const [postValue,setPostValue] = React.useState(value);
    const [likeValue,setLikeValue] = React.useState(0)
    const [lik,setLik] = React.useState(false)
    let loginResponse = getAuth(app);
  useEffect(()=>{
    onSnapshot(doc(db, "Post", postValue.id), (doc) => {
        const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        if(source === "Local"){
            setPostValue({...postValue,...doc.data()})
        }
      });
  },[postValue])

  useEffect(()=>{
    onSnapshot(collection(db, "Like"), (data) => {
        const da =data.docs.map((doc)=>({...doc.data()})).filter((doc)=>doc.postId === postValue.id)
        const as = da.find(elem => elem.userId === loginResponse.lastNotifiedUid)
        console.log(as,'ddddd')
        setLikeValue(da)
        setLik(!!as)
       console.log(da,"val")
      });
  },[])

    setTimeout(() => {
        setLoading(load)
        if(postValue.url){
            setLoading(load)
        }else{
            setLoading(false)
        }
        
    });


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = (postValue) => {
        setOpen(false);
        setSelectedValue(postValue);
      };
      const handleClickOpenShar =() => {
        setOpenShare(true);
      }
      const handleClickCloseShar =() => {
        setOpenShare(false);
      }

      const hendleLike =() => {
        if(!lik){
            like(postValue.id)
        }
            
      }
    return (
        // <div className={styles.cardFrame}>
            <Card sx={{maxWidth: 500 ,width:"50%"}}>
                <CardHeader
                    avatar={
                        <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                            R
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon onClick={handleClickOpen}/>
                            <SimpleDialog
                                selectedValue={postValue}
                                id={postValue.id}
                                delete={del}
                                updatePost={updatePost}
                                open={open}
                                onClose={handleClose}
                            />
                        </IconButton>
                    }
                    title={postValue.title}
                    subheader={new Date(postValue.date.seconds).toString()}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={loading?postValue.url:imagUrl}
                    alt="Paella dish"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {postValue.text}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton   aria-label="Like minimal photography"
          size="md"
          variant="solid"
        //   color={lik?"danger":"green"}
          
          sx={{
            color:lik?"red":"danger",
          }}>
                        <FavoriteIcon 
                            onClick={hendleLike}
                                />
                        
                    </IconButton>
                    {likeValue.length}
                    <IconButton aria-label="share">
                        <ShareIcon onClick={handleClickOpenShar}/>
                        <Share  id={postValue.id} updatePost={updatePost} open={openShare} onClose={handleClickCloseShar}/>
                    </IconButton>
                     
                </CardActions>
                
            </Card>
        // </div>

    );
}