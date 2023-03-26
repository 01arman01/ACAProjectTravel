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
    maxWidth: 400,
    margin: "10px",
    // border: "3px solid #498FD6",
    boxShadow: "0 5px 15px gray",
    backgroundColor: "#F4F7F9",
  },
});
