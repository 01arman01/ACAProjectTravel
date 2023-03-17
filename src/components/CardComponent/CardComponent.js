import React, { useContext, useEffect } from 'react';
import {Container, TextField} from "@mui/material";
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

const useStyles = createUseStyles({
    cardFrame:{
        margin:"20px"

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

export default function RecipeReviewCard({value,load}) {
    const [expanded, setExpanded] = React.useState(false);
    const [imagUrl, setImageUrl] = React.useState("https://media.sproutsocial.com/uploads/2017/01/Instagram-Post-Ideas.png");
    const styles = useStyles()
    const [loading,setLoading] = React.useState(load)
    
    console.log(load,'jjjjj')
    const setInter = setTimeout(() => {
        setLoading(load)
        
        // console.log(value.url)
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

    return (
        <div className={styles.cardFrame}>
            <Card sx={{maxWidth: 300}}>
                <CardHeader
                    avatar={
                        <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                            R
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon/>
                        </IconButton>
                    }
                    title={value.title}
                    subheader={new Date(value.date.seconds).toString()}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={loading?value.url:imagUrl}
                    alt="Paella dish"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {value.text}
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