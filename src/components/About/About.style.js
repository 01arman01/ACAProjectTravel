import { createUseStyles } from "react-jss";
import aboutBg from "../../imgs/about_bg.jpg";

export const useAboutStyles = createUseStyles({
  intro: {
    width: "100vw",
    height: "100vh",
    background: `url(${aboutBg}) no-repeat`,
    backgroundSize: "cover",
    position: "relative",
  },
  container: {
    maxWidth: "1020px",
    margin: "0 auto",
  },
  introInner: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
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
    color: "#201F21",
    fontWeight: "700",
    opacity: "0.9",
  },
  registerButton: {
    width: "80px",
    textDecoration: "none",
    padding: "0.5rem 1rem",
    background: "#A528C3",
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
      backgroundColor: "#B36FC3",
    },
    "@media (max-width: 620px)": {
      display: "none",
    },
  },
  learnButton: {
    width: "120px",
    textAlign: "center",
    textDecoration: "none",
    padding: "7px 10px",
    background: "#A528C3",
    color: "white",
    border: "none",
    outline: "none",
    borderRadius: "20px",
    fontSize: "0.8rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background .3s linear",
    "&:hover": {
      color: "white",
      backgroundColor: "#B36FC3",
    },
    "@media (max-width: 620px)": {
      display: "none",
    },
  },
});
