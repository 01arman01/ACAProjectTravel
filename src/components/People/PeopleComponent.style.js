import {createUseStyles} from 'react-jss'


export const useStyles = createUseStyles({

    toolbar: {
        overflow: "hidden",
        flexShrink: 0,
        zIndex: 1,
        width: 240,
        [`& .MuiDrawer-paper`]: {width: 240},

        "@media (max-width: 800px)": {
            width: 50,
            zIndex: -1,
            [`& .MuiDrawer-paper`]: {width: 50},

            overflow: "hidden"
        },
    },
    toolbar1: {
        "@media (max-width: 800px)": {
            width: '50px',
        },
    },
    media800: {
        "@media (max-width: 800px)": {
            display: "none",
        },
    },
    frendMessage: {
        marginRight:' 5px',
        marginLeft:'auto',
        display: "flex",
        alignItems: 'center',
        gap: '5px',
        "@media (max-width: 500px)": {
            marginRight:'auto',
        }
    },
    AvaName: {
        // marginRight:'75%',
        display: "flex",
        alignItems: 'center',
        gap: '5px'
    },
    usersList: {
        minWidth:'200px',
        width:'100%',
        // background:'red',
        display:"flex",
        justifyContent:"space-between",
        "@media (max-width: 500px)": {
            display: "flex",
            alignItems:"start",
            justifyContent:"start",
            // gridTemplateColumns: '1fr',
            // gridTemplateAreas: ["a  b", "c c"]
           flexDirection:'column'
        },
    }
})