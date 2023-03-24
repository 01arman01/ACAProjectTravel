import react from "react";
import { createUseStyles } from "react-jss";

export const useHeaderStyles = createUseStyles({
  header: {
    width: "100vw",
    height: "50px",
    backgroundColor: "#EDF1F4",
    borderBottom: ".5px solid #CBCDCF",
    position: "fixed",
    zIndex: "999",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header__inner: {
    // width:"100vw",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nav: {
    width: "250px",
  },
  links: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  navLink: {
    fontSize: "18px",
    textDecoration: "none",
    color: "black",
    transition: "color .2s linear",
    "&:hover": {
      color: "gray",
    },
  },
  logo: {
    width: "76px",
    height: "auto",
    marginTop: "10px",
  },
  rightBlock: {
    width: "120px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  loginButton: {
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
  logoutButton: {
    padding: "0.5rem 1rem",
    background: "rgb(218,6,6)",
    color: "white",
    border: "none",
    outline: "none",
    borderRadius: "20px",
    marginRight: "5px",
    fontSize: "0.8rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background .2s linear",
    "&:hover": {
      color: "white",
      backgroundColor: "#9D0A35",
      // scale:'1.05'
    },
    "@media (max-width: 620px)": {
      display: "none",
    },
  },
  userBlock: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "15px",
    width: "30px",
    height: "30px",
    cursor: "pointer",
    transition: "background .2s linear",
    "&:hover": {
      backgroundColor: "#9FA5A9",
    },
  },
  userIcon: {
    width: "22px",
    height: "22px",
  },
});
