import {createUseStyles} from "react-jss";

export const useUserStyles = createUseStyles({
    userWrapper: {
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#DFE5EA",
        backgroundSize: "cover",
        paddingTop: "50px",
        position: "relative",
        "@media (max-width: 740px)": {
            paddingTop: 0,

        },
        '@media (max-width: 560px)': {
            width: '100vw',
            // displaay:'block'
            justifyContent: "space-between",
            flexWrap: "wrap",
            flexDirection: "column",
        }
    },
    overflo: {
        overflow: "hidden",
        // height:'100vh',
    },
    postsSection: {
        width: "100vw",
        height: "auto",
        display: "flex",
        flexWrap: "wrap",
        padding: "0 100px",
        position: "absolute",
        backgroundColor: "#DFE5EA",
        left: "270px",
        '@media (max-width: 618px)': {
            width: '100vw',
        }

    },
    cardsBlok: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        '@media (max-width: 618px)': {
            width: '100vw',
        }
    },
    usermain: {
        display: "grid",
        gridTemplateColumns: '300px 1fr',
        gap:'0',
        justifyContent:'start',
        paddingTop: "50px",
        paddingLeft:0,
        overflow: 'hidden',
        "@media (max-width: 740px)": {
            paddingTop: 0,

        },
        '@media (max-width: 618px)': {
            width: '100vw',
            gridTemplateColumns: ' 1fr', flexWrap: "wrap",
            justifyItems: 'center',
        }
    },
    postFooterContainer:{
        overflowY: 'scroll',
        // width: "100%",
        height: "92vh",
        marginLeft:'-30px',
        "@media (max-width: 750px)": {
            marginLeft:'-50px',
        }, "@media (max-width: 618px)": {
            overflowY:"auto",
            height:"auto",
        }

    },
    postsContainer: {
        display: "grid",
        gridTemplateColumns: '1fr 1fr 1fr',
        width: "100%",
        // height: '0vh',
        // overflow:"auto",
        '@media (max-width: 1200px)': {
            // width:'100vw',
            gridTemplateColumns: '1fr 1fr',

        },
        '@media (max-width: 930px)': {
            // width:'100vw',
            gridTemplateColumns: '1fr',
            justifyItems: 'center',
        },
        '@media (max-width: 740px)': {
            // width:'100vw',
            gridTemplateColumns: '1fr',
            justifyItems: 'center',


        },
        '@media (max-width: 618px)': {
            width: '100vw',
            gridTemplateColumns: '1fr',

            height:'auto',
        }
    },
    postCard: {
        width: '30px',
        display: "flex",
        justifyContent: 'center',
        flexWrap: 'nowrap',
        flexDirection: 'column',
        alignItems: "center",
        '@media (max-width: 480px)': {
            width: '100vw',
        }
    },
});
