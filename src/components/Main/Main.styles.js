import { createUseStyles } from "react-jss";
import bgImage from "../../imgs/travel.jpg";

export const useMainStyles = createUseStyles({
  intro: {
    width: "100vw",
    height: "100vh",
    // backgroundColor:"red",
    background: `url(${bgImage}) no-repeat`,
    backgroundSize: "cover",
    position: "relative",
    // opacity:".7"
  },
  container: {
    maxWidth: "1020px",
    margin: "0 auto",
  },
  introInner: {
    display: "flex",
    flexDirection: "column",
    gap:"20px",
    maxWidth: "450px",
    height: "200px",
    position: "absolute",
    top: "35%",
  },
  introTitle: {
    fontSize: "36px",
    fontWeight: "700",
    textTransform: "uppercase",
    opacity: ".9",
  },
  introText: {
    color: "black",
    opacity: "0.9",
  },
  arrowIcon: {
    height: "10px",
  },
  registerButton: {
    width:"80px",
    textDecoration: "none",
    padding: "0.5rem 1rem",
    background: "rgb(8,180,206)",
    color: "white",
    border: "none",
    outline: "none",
    borderRadius: "20px",
    fontSize: "0.8rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background .2s linear",
    "&:hover": {
      color: "white",
      backgroundColor: "#1e5aaf",
      // scale:'1.05'
    },
    "@media (max-width: 620px)": {
      display: "none",
    },
  },
  learnButton:{
    width:"120px",
    textAlign:"center",
    textDecoration: "none",
    padding: "7px 10px",
    background: "rgb(8,180,206)",
    color: "white",
    border: "none",
    outline: "none",
    borderRadius: "20px",
    fontSize: "0.8rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background .2s linear",
    "&:hover": {
      color: "white",
      backgroundColor: "#1e5aaf",
      // scale:'1.05'
    },
    "@media (max-width: 620px)": {
      display: "none",
    },
  }
});
