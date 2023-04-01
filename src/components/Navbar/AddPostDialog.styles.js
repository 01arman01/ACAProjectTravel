import { createUseStyles } from "react-jss";

export const useAddPostDialogStyles = createUseStyles({
  dialog: {
    // width:"500px",
    // height:"500px",
    // margin:"0 auto"
  },
  addClosebtns: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginRight: "10px",
  },
  cancelBtn: {
    backgroundColor: "#fff",
    border: "2px solid #6AC6C8",
    padding: "7px 10px",
    borderRadius: "7px",
    marginRight: "10px",
    cursor: "pointer",
    transition: "background .2s linear",
    "&:hover": {
      backgroundColor: "#5CEDF1",
    },
  },
  addBtn: {
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
});
