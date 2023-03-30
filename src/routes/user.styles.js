import { createUseStyles } from "react-jss";

export const useUserStyles = createUseStyles({
  userWrapper: {
    width:"100vw",
    height:"100vh",
    display: "flex",
    justifyContent: "space-between",
    backgroundColor:"#DFE5EA",
    backgroundSize:"cover",
    paddingTop: "50px",
    position:"relative",
  },
  postsSection: {
    width:"100vw",
    height:"auto",
    display:"flex",
    flexWrap:"wrap",
    padding:"0 100px",
    position:"absolute",
    backgroundColor:"#DFE5EA",
    left:"270px",
  },
  cardsBlok: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
  },
});
