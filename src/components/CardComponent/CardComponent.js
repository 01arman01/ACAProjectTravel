import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  cardFrame: {
    margin: "20px",
  },
});

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({ post, postsImageUrls }) {
  const [expanded, setExpanded] = useState(false);
  const [postImgUrl, setPostImgUrl] = useState("");
  const styles = useStyles();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getPostUrl = () => {
    postsImageUrls.forEach((el) => {
      if (el[1] == post.image) {
        setPostImgUrl(el[0]);
      }
    });
  };

  useEffect(() => {
    getPostUrl();
  }, [postsImageUrls]);

  return (
    <div className={styles.cardFrame}>
      <Card sx={{ maxWidth: 300 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={post.title}
          subheader={new Date(post.date.seconds).toString()}
        />
        <CardMedia
          component="img"
          height="194"
          image={postImgUrl}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {post.text}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}
