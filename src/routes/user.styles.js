import { createUseStyles } from "react-jss";

export const useUserStyles = createUseStyles({
    usermain:{
        display: "flex",
        justifyContent: "space-between",

        // position: "absolute",
        // top: "50px",
        paddingTop: "50px",
        "@media (max-width: 740px)": {
            paddingTop:0,

        },
        '@media (max-width: 560px)': {
            width:'100vw',
            // displaay:'block'
            justifyContent: "space-between",
            flexWrap:"wrap",
            flexDirection:"column",
        }
    },
    postsContainer:{
        display: "fixed",
        textAlign: "center",
        marginLeft: '20%',
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "flex-end",
        flexDirection: "column",
        alignContent: " space-around",
        width: "72%",
        '@media (max-width: 480px)': {
            width:'100vw',
        }
    },
    postCard:{
        display:"flex",
        justifyContent:'center',
        flexWrap:'nowrap',
        flexDirection:'column',
        alignItems:"center",
        '@media (max-width: 480px)': {
            width:'100vw',
        }
    },


})