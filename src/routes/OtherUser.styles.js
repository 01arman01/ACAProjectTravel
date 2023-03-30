import { createUseStyles } from "react-jss";

export const useOtherUserStyles = createUseStyles({
  postsBlock: {
    width:"100vw",
    height:"auto",
    display:"flex",
    flexWrap:"wrap",
    padding:"0 100px",
    position:"absolute",
    left:"250px",
    backgroundColor:"#DFE5EA",
  },
  wrapper: {
    width:"100vw",
    height:"100vh",
    display: "flex",
    justifyContent: "space-between",
    backgroundColor:"#DFE5EA",
    backgroundSize:"cover",
    paddingTop: "50px",
    position:"relative",
  },
});
