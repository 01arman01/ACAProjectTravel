import React, { useContext, useEffect } from 'react';
import {Container, Dialog, TextField} from "@mui/material";
import testimg from '../../imgs/turist.jpg'
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, {IconButtonProps} from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { createUseStyles } from 'react-jss';
import { CardComponentContext } from '../../contexts/context';
import { useSearchParams } from 'react-router-dom';
import SimpleDialog from '../SimpleDialog';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

const useStyles = createUseStyles({
    cardFrame:{
        margin:"14px"

    }
})

const ExpandMore = styled((props) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function RecipeReviewCard({value,load,del,updatePost}) {
    const [expanded, setExpanded] = React.useState(false);
    const [imagUrl, setImageUrl] = React.useState("https://media.sproutsocial.com/uploads/2017/01/Instagram-Post-Ideas.png");
    const styles = useStyles()
    const [loading,setLoading] = React.useState(load)
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState();
    const [postValue,setPostValue] = React.useState(value);
    const [updateComponent,setUpdateComponent] = React.useState(false)

  useEffect(()=>{
    const unsub = onSnapshot(doc(db, "Post", postValue.id), (doc) => {
        const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        if(source === "Local"){
            setPostValue({...postValue,...doc.data()})
        }
      });
  },[postValue])

//   useEffect(()=>{
//     const unsubscribe = onSnapshot(collection(db, "Post"), (doc) => {
//         setUpdateComponent(true)
//         console.log(updateComponent)
//       });
//   },[updateComponent])

    setTimeout(() => {
        setLoading(load)
        if(postValue.url){
            setLoading(load)
        }else{
            setLoading(false)
        }
        
    });
    // if(load===true){
    //     clearInterval(setInter)
    // }
    // useEffect(()=>{
    //     // clearInterval(iterval)
    //     if(value.url){
    //         setImageUrl(value.url)
          
    //     }

    // },[value.url])

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
    return (
        <div className={styles.cardFrame}>
            <Card sx={{maxWidth: 290}}>
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
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon/>
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon/>
                    </IconButton>
                </CardActions>
            </Card>
        </div>

    );
}