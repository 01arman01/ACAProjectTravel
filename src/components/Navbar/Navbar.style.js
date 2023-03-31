import React from "react";
import { render } from "react-dom";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  listUl: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    listStyle: "none",
    // border: '0.5px solid ' +
    //     'rgba(193,183,183,0.72)',
    width: "21vw",
    height: "100vh",
    background: "#EDF1F4",
    backdropFilter: "blur(15px)",
    position: "fixed",
    overflow: "scroll",
    paddingBottom: "27px",
    borderRadius: '5px',
    "@media (max-width: 750px)": {
      // position:'relative',
      position:'static',
      width:'160px',
      height: "auto",
    },
    "@media (max-width: 560px)": {
      // position:'relative',

      width:'100vw',
      height: "auto",
    },

  },
  listLi: {
    width: "100%",
    fontWeight: "bold",
    border: "0.5px solid " + "rgba(193,183,183,0.72)",
  },
  liHeader: {
    paddingLeft: "10px",
    cursor: "pointer",
    width: "100%",
    color: "black",
    // border: '0.5px solid rgb(8,180,206)',
    "&:hover": {
      color: "rgb(8,180,206)",
    },
  },
  DropdownClass: {
    backgroundColor: "#ffffff",
    borderRight: "1px solid rgba(193,183,183,0.91)",
  },
  //     change Password Component
  passChangeContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "space-around",
    justifyContent: "right",
    paddingRight: "10%",
    paddingBottom: "10px",
  },

  passChangeButtonStyle: {
    width: "100%",
    textAlign: "right",
  },
  //    User info styles
  avatarContainer: {
    margin: "10px auto",
    padding: "0 0 0 10px",
    textAlign: "center",
  },
  avatarName: {
    marginRight: "10px",
    textAlign: "center",
  },
  avatarBlock: {
    position: "relative",
  },
  plusButton: {
    position: "absolute",
    top: "75%",
    left: "60%",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    color: "blue",
    cursor: "pointer",
    transition: "background .2s linear",
    "&:hover": {
      backgroundColor: "gray",
    },
  },
});

export default useStyles;
