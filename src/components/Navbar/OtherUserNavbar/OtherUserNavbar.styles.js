import { createUseStyles } from "react-jss";

export const useOtherUserNavbarStyles = createUseStyles({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    listStyle: "none",
    width: "250px",
    height: "100vh",
    backgroundColor: "#EDF1F4",
    backdropFilter: "blur(15px)",
    position: "fixed",
    paddingTop: "20px",
  },
  avatarName: {
    marginRight: "10px",
    textAlign: "center",
  },
});
