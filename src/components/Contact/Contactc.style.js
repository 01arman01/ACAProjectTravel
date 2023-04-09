import { createUseStyles } from "react-jss";
import "@fontsource/montserrat";

export const useContactStyles = createUseStyles({
  contact: {
    width: "100vw",
    height: "100vh",
  },
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
  },
  contactInner: {
    display: "flex",
    "@media (max-width: 955px)": {
      flexDirection:"column",
      alignItems:"center",
      gap:"120px",
    },
  },
  leftBlock: {
    position: "relative",
  },
  rightBlock: {
    paddingTop: "100px",
  },
  contactImg: {
    width: "470px",
    height: "410px",
  },
  info: {
    width: "340px",
    height: "250px",
    backgroundColor: "#01bdda",
    position: "absolute",
    top: "360px",
    left: "-15px",
    padding: "10px 30px",
  },
  infoText: {
    marginTop: "20px",
    fontSize: "1rem",
    lineHeight: "2",
    color: "white",
  },
  contactTitle: {
    fontSize: "4em",
    lineHeight: "1.1",
    fontWeight: "600",
    textTransform: "uppercase",
    color: "#01bdda",
    marginBottom: "20px",
  },
  contactText: {
    fontSize: "1rem",
    width: "365px",
    marginBottom: "50px",
  },
  phone: {
    display: "flex",
    alignItems: "center",
  },
  phoneLogo: {
    width: "70px",
    height: "70px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#01bdda",
    borderRadius: "50%",
    textAlign: "center",
  },
  phoneContent: {
    marginLeft: "20px",
  },
  contentTitle: {
    fontWeight: "400",
    fontSize: "1.8rem",
    fontFamily: "Montserrat",
  },
  phoneNumbers: {
    fontSize: "1.5rem",
    fontWeight: "300",
    wordSpacing: "1",
  },
});
