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
  postsSection: {
    width:"100vw",
    height:"auto",
    display:"flex",
    flexWrap:"wrap",
    padding:"0 100px",
    position:"absolute",
    backgroundColor:"#DFE5EA",
    left:"270px",
    '@media (max-width: 480px)': {
      width:'100vw',
  }
  },
  cardsBlok: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    '@media (max-width: 480px)': {
      width:'100vw',
  }
  },
});
    // usermain:{
    //     display: "flex",
    //     justifyContent: "space-between",

    //     // position: "absolute",
    //     // top: "50px",
    //     paddingTop: "50px",
    //     "@media (max-width: 740px)": {
    //         paddingTop:0,

    //     },
    //     '@media (max-width: 560px)': {
    //         width:'100vw',
    //         // displaay:'block'
    //         justifyContent: "space-between",
    //         flexWrap:"wrap",
    //         flexDirection:"column",
    //     }
    // },
    // postsContainer:{
    //     display: "fixed",
    //     textAlign: "center",
    //     marginLeft: '20%',
    //     flexWrap: "wrap",
    //     justifyContent: "space-around",
    //     alignItems: "flex-end",
    //     flexDirection: "column",
    //     alignContent: " space-around",
    //     width: "72%",
    //     '@media (max-width: 480px)': {
    //         width:'100vw',
    //     }
    // },
    // postCard:{
    //     display:"flex",
    //     justifyContent:'center',
    //     flexWrap:'nowrap',
    //     flexDirection:'column',
    //     alignItems:"center",
    //     '@media (max-width: 480px)': {
    //         width:'100vw',
    //     }
    // },
