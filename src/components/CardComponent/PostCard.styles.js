import { createUseStyles } from "react-jss";

export const usePostCardStyles = createUseStyles({
  commentButton: {
    width: "50px",
    height: "25px",
    backgroundColor: "#B1CDCA",
    cursor: "pointer",
    border: "1px solid #B1CDCA",
    borderRadius: "8px",
    transition: "background .1s linear",
    "&:hover": {
      backgroundColor: "#797E7D",
    },
  },
  card: {
    maxWidth: 290,
    margin: "10px",
    boxShadow: "0 5px 15px gray",
    backgroundColor: "#F4F7F9",
    position: "relative",
  },
  lists: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    width: "60px",
    height: "66px",
    position: "absolute",
    top: "2px",
    right: "32px",
    zIndex: 1000,
    backgroundColor: "#DFE5EA",
    borderRadius: "7px",
    borderTopRightRadius: "0",
    paddingTop: "7px",
  },
  list: {
    padding: "3px 0",
    borderRadius: "5px",
    transition: "background .1s linear",
    "&:hover": {
      backgroundColor: "#AFB9BD",
    },
  },
  userName:{
    cursor:"pointer"
  }
});
