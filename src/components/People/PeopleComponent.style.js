import {createUseStyles} from 'react-jss'


export const useStyles = createUseStyles({

    toolbar:{
        overflow:"hidden",
        flexShrink: 0,
        zIndex: 1,
        width:240,
        [`& .MuiDrawer-paper`]: { width: 240 },

        "@media (max-width: 800px)": {
            width:50,
            zIndex: -1,
            [`& .MuiDrawer-paper`]: { width: 50 },

            overflow:"hidden"
        },
    },
    toolbar1:{
        "@media (max-width: 800px)": {
           width:'50px',
        },
    },
    media800:{
        "@media (max-width: 800px)": {
            display: "none",
        },
    }
})