import React from "react";
import { render } from "react-dom";
import { createUseStyles } from "react-jss";
import instagram from "./img/instagram-new.png";
import facebook from "./img/icons8-facebook-новый.svg";
import linkedin from "./img/icons8-обеденные-кругом.svg";
import twitter from "./img/icons8-твиттер.svg";

const useStyles = createUseStyles({
  footer: {
    width: "100%",
    padding: "2rem 8%",
    backgroundColor: "#EDF1F4",
    color: "black",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "column",
    "@media (max-width: 560px)": {
      width: "100vw",
      height: "auto",
    },
  },
  socialIconsContainer: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: "1rem",
    "@media (max-width: 400px)": {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
    },
  },
  socialIcon: {
    width: "50px",
    height: "50px",
    borderRadius: "50px",
    marginBottom: "1rem",
    backgroundSize: "100%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    margin: "1rem",
    // border:'1px solid  blue ',
    "&:hover": {
      // border:'1px solid  black ',
      // filter:'invert(1)'
    },
  },
  footerMenuContainer: {
    listStyle: "none",
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: "1rem",
    "@media (max-width: 470px)": {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
    },
  },
  menuItem: {
    color: "black",
    margin: "1rem 1.5rem",
    cursor: "pointer",
    opacity: 0.6,
    "&:hover": {
      opacity: 1,
    },
  },
  link: {
    fontSize: "18px",
    textDecoration: "none",
    color: "black",
    transition: "color .2s linear",
    "&:hover": {
      color: "#5975d1",
    },
  },
  fb: {
    backgroundImage: `url(${facebook})`,
  },
  insta: {
    backgroundImage: `url(${instagram})`,
  },
  twitterr: {
    backgroundImage: `url(${twitter})`,
  },
  linkedinn: {
    backgroundImage: `url(${linkedin})`,
  },
});

export default useStyles;
