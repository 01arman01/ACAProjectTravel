import { createUseStyles } from "react-jss";
import travelBg from "../imgs/travel-bg.avif";

export const useRegisterStyles = createUseStyles({
    wrapper: {
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    bg_img: {
      width: "100vw",
      height: "100vh",
      background:`url(${travelBg}) no-repeat`,
      backgroundSize: "cover",
      position: "absolute",
    },
    container: {
      border: "2px solid #56EEE7",
      borderRadius: "15px",
      padding: "25px 25px",
      position: "relative",
      zIndex: "1000",
    },
    infoBlock: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    inputBox: {
      borderRadius: "5px",
    },
    registerButton: {
        width: "100px",
        height: "35px",
        marginTop: "10px",
        backgroundColor: "#01bdda",
        transition: "background .3s linear",
        "&:hover": {
          backgroundColor: "#1e5aaf",
        },
    },
    registerBlock: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  });