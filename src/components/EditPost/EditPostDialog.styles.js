import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  btn: {
    backgroundColor: "#5CEDF1",
    border: "2px solid #6AC6C8",
    padding: "7px 15px",
    borderRadius: "7px",
    cursor: "pointer",
    transition: "background .2s linear",
    "&:hover": {
      backgroundColor: "#36ABDA",
    },
  },
  cancelBtn: {
    textTransform:"uppercase",
    width:"80px",
    height:"40px",
    backgroundColor: "#fff",
    border: "2px solid #6AC6C8",
    color:"#5CEDF1",
    padding: "7px 10px",
    borderRadius: "7px",
    marginRight: "10px",
    cursor: "pointer",
    transition: "border .2s linear",
    "&:hover": {
    //   backgroundColor: "#5CEDF1",
    //   color:"white"
    border:"2px solid #fff"
    },
  },
  cancelEditBtn: {
    display: "flex",
    justifyContent: "flex-end",
  },
});
