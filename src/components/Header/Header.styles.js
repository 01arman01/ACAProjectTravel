import { createUseStyles } from "react-jss";

export const useHeaderStyles = createUseStyles({
  header: {
    width: "100vw",
    height: "50px",
    backgroundColor: "#EDF1F4",
    borderBottom: ".5px solid #CBCDCF",
    position: "fixed",
    zIndex: "999",
    "@media (max-width: 740px)": {
      position: "static",
    },
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header__inner: {
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nav: {
    width: "325px",
    "@media (max-width: 740px)": {
      display: "none",
    },
  },
  links: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    "@media (max-width: 740px)": {
      display: "none",
    },
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
    position: "absolute",
    zIndex: "45",
    right: "47%",
  },
  rightBlock: {
    width: "120px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginRight: "10px",
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
    },
    "@media (max-width: 740px)": {
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
    },
    "@media (max-width: 740px)": {
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
  userblockOther: {
    "@media (max-width: 740px)": {
      display: "none",
    },
  },
  userIcon: {
    width: "22px",
    height: "22px",
  },
  //--tulbar
  ToggleBtn: {
    paddingRight: "15px",
    fontSize: "1.5rem",
    cursor: "pointer",
    display: "none",
    "@media (max-width: 740px)": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  dropdownMenu: {
    zIndex: 4,
    position: "absolute",
    right: "2rem",
    top: "60px",
    width: "300px",
    display: "block",
    height: "240px",
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(15px)",
    borderRadius: "10px",
    overflow: "hidden",
    padding: "1px",
    "@media (min-width: 740px)": {
      display: "none",
    },
    // display:'none'
  },
  dropdownMenuOpen: {
    position: "absolute",
    right: "2rem",
    top: "60px",
    width: "300px",
    height: "240px",
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(15px)",
    borderRadius: "10px",
    overflow: "hidden",
    padding: "1px",
  },

  dropdownMenuLi: {
    padding: "0.7rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  dropdownMenuActionBtn: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
  },
  aLink: {
    textDecoration: "none",
    fontSize: "1rem",
    color: "black",
    "&:hover": {
      color: "rgb(8,180,206)",
    },
  },
});
